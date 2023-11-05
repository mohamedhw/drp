from dataclasses import fields
from rest_framework import serializers
from .models import Post, Hashtag



class PostSerializers(serializers.ModelSerializer):
    # date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    
    class Meta:
        model = Post
        fields = ["id", "title", "body", "thumb", "date", "author", "author_name", "author_image"]


class HashtagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = "__all__"