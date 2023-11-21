from dataclasses import fields
from rest_framework import serializers
from .models import Post, Hashtag
# from users.serializer import UserProfileSerializer


class PostSerializers(serializers.ModelSerializer):

    # date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    user_has_saved = serializers.SerializerMethodField()
    user_has_liked = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField(default=0)

    class Meta:
        model = Post
        fields = ["id", "title", "body", "image","thumb",  "date", "author", "author_name", "author_image", "user_has_saved", "user_has_liked", "like_count"]

    def get_user_has_saved(self, obj):
        user = self.context['request'].user
        return obj.saved.filter(id=user.id).exists()

    def get_user_has_liked(self, obj):
        user = self.context['request'].user
        return obj.like.filter(id=user.id).exists()

    def get_like_count(self, obj):
        like_count = obj.like.all().count()
        return like_count

class HashtagSerializers(serializers.ModelSerializer):
    post_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Hashtag
        fields = ['tag', 'tag_slug', 'post_count']

