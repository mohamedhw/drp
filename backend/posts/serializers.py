from dataclasses import fields
from rest_framework import serializers
from .models import Post, Hashtag



class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"