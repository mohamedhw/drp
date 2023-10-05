from django.shortcuts import render
from rest_framework import generics
from .models import Post, Hashtag
from .serializers import PostSerializers


class Home(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class=PostSerializers
    # permission_classes = (permissions.AllowAny, )


class Detail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = 'pk'
