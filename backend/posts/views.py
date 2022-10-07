
# from drf_spectacular.utils import (
#     extend_schema_view,
#     extend_schema,
#     OpenApiParameter,
#     OpenApiTypes,
# )
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response

from core.models import Image, Post, Tag
from posts.serializers import (
    PostSerializer, PostDetailSerializer,
    TagSerializer, ImageSerializer)
from rest_framework import viewsets, mixins, status
# from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
# from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
# Create your views here.
from django.shortcuts import get_object_or_404


class SetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100


# @extend_schema_view(
#     list=extend_schema(
#         parameters=[
#             OpenApiParameter(
#                 'tags',
#                 OpenApiTypes.STR,
#                 description='Comma seperated list of tag\'s name to filter',
#             )
#         ]
#     )
# )

tags_param = openapi.Parameter(
    'tags', openapi.IN_QUERY,
    description="Comma seperated list of tag\'s name to filter",
    type=openapi.TYPE_STRING)
slug_param = openapi.Parameter(
    'slug', openapi.IN_QUERY,
    description="Use slug instead of id",
    type=openapi.TYPE_STRING)
post_response = openapi.Response('response description', PostSerializer)


class PostViewSet(viewsets.ModelViewSet):
    """ View for manage post APIs,
        utf-8 error on SlugRelatedField for images full path,
        will use relative path instead.
    """
    serializer_class = PostDetailSerializer
    queryset = Post.objects.all()
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    # lookup_fields = 'slug'
    pagination_class = SetPagination

    def _params_to_arrays(self, qs):
        """Convert a list of strings"""
        # 1,2,3
        return [str(str_id) for str_id in qs.split(',')]

    def get_object(self, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, slug=item)

    def get_queryset(self):
        """Retrieve Post for authenticated user."""
        # query_params.get return string if not any return None
        tags = self.request.query_params.get('tags')
        published = self.request.query_params.get('published')
        post = self.request.query_params.get('post')
        latest = self.request.query_params.get('latest')
        queryset = self.queryset
        queryset = queryset.filter(published=True)

        if published and self.request.user.is_authenticated:
            queryset = Post.objects.all().filter(published=published, author=self.request.user)
        if post:
            queryset = queryset.filter(slug=post)
        if tags:
            tag_name = self._params_to_arrays(tags)
            queryset = queryset.filter(tags__name__in=tag_name)

        # if latest == 'latest':
        #     return queryset.order_by('-updated_at').distinct()
        # elif latest == 'oldest':
        #     return queryset.order_by('updated_at').distinct()

        return queryset.order_by('-updated_at').distinct()

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == 'list':
            return PostSerializer
        elif self.action == 'upload_image':
            return ImageSerializer

        return self.serializer_class

    @swagger_auto_schema(
        manual_parameters=[tags_param],
        responses={200: post_response})
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        """Create a new Post."""
        serializer.save(author=self.request.user)

    def update(self, request, *args, **kwargs):
        if self.get_object().author == request.user:
            return super().update(request, *args, **kwargs)

        raise PermissionDenied

    @swagger_auto_schema(
        operation_description="GET /blogs/post/{slug}}/",
        manual_parameters=[slug_param],
        responses={200: post_response},
        required=['slug']

    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    # def retrieve(self, request, slug, *args, **kwargs):
    #     instance = get_object_or_404(self.queryset, slug=slug)
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)

    # detail true = at specific id of the post
    # @action(methods=['POST'], detail=True, url_path='upload-image')
    # @parser_classes([MultiPartParser])
    # def upload_image(self, request, pk=None):
    #     """Upload an image to post"""
    #     # get post obj by id from the request
    #     post = self.get_object()
    #     serializer = self.get_serializer(post, data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MixinsViewSet(mixins.DestroyModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]


class TagViewSet(MixinsViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all().order_by('name')

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def create(self, request, *args, **kwargs):
        if 'name' not in self.request.data:
            return Response({'error': 'name must be provided.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if self.queryset.filter(name=self.request.data['name']).exists():
            return Response({'error': 'Tag must be unique.'},
                            status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class ImageViewSet(MixinsViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    parser_classes = (MultiPartParser, FormParser)
