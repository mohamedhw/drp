from dataclasses import fields
from rest_framework import serializers
from .models import Post, Hashtag



class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "body", "thumb", "date", "author"]


class HashtagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = "__all__"