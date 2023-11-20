from dataclasses import fields
from rest_framework import serializers
from .models import Post, Hashtag
# from users.serializer import UserProfileSerializer


class PostSerializers(serializers.ModelSerializer):
    # date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    
    class Meta:
        model = Post
        fields = ["id", "title", "body", "image","thumb",  "date", "author", "author_name", "author_image"]

    # def get_author_profile(self, obj):
    #     user = obj.author
    #     profile = Profile.objects.get(user=user)
    #     serializer = UserProfileSerializer(profile)
    #     return serializer.data
class HashtagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = "__all__"
