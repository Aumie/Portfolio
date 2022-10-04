from rest_framework import serializers


from core.models import (
    Post, Tag, Image, User
)
from users.serializers import UserSerializer


class ImageSerializer(serializers.ModelSerializer):
    """Serializer for images."""
    # on_post = serializers.ReadOnlyField(source='on_post.title')
    on_post = serializers.SerializerMethodField('get_on_post')

    def get_on_post(self, image) -> dict:
        return {'id': image.on_post.id, 'title': image.on_post.title}

    class Meta:
        model = Image
        fields = ['id', 'image', 'path', 'on_post']
        read_only_fields = ['id']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tags."""
    created_by = serializers.ReadOnlyField(source='created_by.name')

    class Meta:
        model = Tag
        fields = ['id', 'name', 'created_by']
        read_only_fields = ['id', 'created_by']


class PostSerializer(serializers.ModelSerializer):
    """Serializer for posts."""
    tags = TagSerializer(many=True, required=False)
    author = UserSerializer(read_only=True)
    updated_at = serializers.DateTimeField(
        # format="%d-%m-%Y, %H:%M:%S",
        read_only=True)
    # lookup_fields = ['slug']

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'cover_image', 'desc', 'tags', 'updated_at', 'created_at',
            'author',
            'published'
        ]
        read_only_fields = ['id', 'author']


class PostDetailSerializer(PostSerializer):
    """Serializer for post detail view."""
    # lookup_fields = ['slug']

    created_at = serializers.DateTimeField(
        # format="%d %B, %Y %H:%M:%S",
        read_only=True)
    images = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='path')

    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + \
            ['content', 'images']

    def _get_or_create_tags(self, tags, post):
        """Handle getting or creating tags as needed."""
        auth_user = self.context['request'].user
        for tag in tags:
            tag_obj, created = Tag.objects.get_or_create(
                created_by=auth_user,
                **tag
            )
            post.tags.add(tag_obj)

    def create(self, validated_data):
        """Create a post."""
        tags = validated_data.pop('tags', [])
        post = Post.objects.create(**validated_data)
        self._get_or_create_tags(tags, post)

        return post

    def update(self, instance, validated_data):
        """Update post."""
        tags = validated_data.pop('tags', None)

        if tags is not None:
            instance.tags.clear()
            self._get_or_create_tags(tags, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
