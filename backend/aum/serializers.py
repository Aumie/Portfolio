from rest_framework import serializers


from core.models import (
    AumFile, AumImage
)


class AumFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AumFile
        fields = ['id', 'title','desc','file', 'file_for']
        read_only_fields = ['id']


class AumImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AumImage
        fields = ['id', 'title','desc','image', 'image_for']
        read_only_fields = ['id']
