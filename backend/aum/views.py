from rest_framework.parsers import MultiPartParser
from rest_framework import viewsets, mixins, status, response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.core.exceptions import PermissionDenied
from .serializers import AumFileSerializer, AumImageSerializer
from core.models import AumImage, AumFile
# Create your views here.


class AumMixinsViewSet(mixins.DestroyModelMixin,
                       mixins.ListModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        if self.request.user.is_superuser:
            serializer.save()
            return response.Response(status=status.HTTP_201_CREATED)

        raise PermissionDenied

    def destroy(self, request, *args, **kwargs):
        if self.request.user.is_superuser:
            return super().destroy(request, *args, **kwargs)
        raise PermissionDenied


class AumFileViewSet(AumMixinsViewSet):
    serializer_class = AumFileSerializer
    queryset = AumFile.objects.all()


class AumImageViewSet(AumMixinsViewSet):
    serializer_class = AumImageSerializer
    queryset = AumImage.objects.all()
