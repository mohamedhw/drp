from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from .models import Post, Hashtag
from .serializers import PostSerializers, HashtagSerializers
from django.db.models import Q


class Home(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class=PostSerializers
    # permission_classes = (permissions.AllowAny, )

    def get_queryset(self, *args, **kwargs):
        # Start with all items
        qs = Post.objects.all()
        # Retrieve the 'category' and 'label' query parameters from the request
        query = self.request.GET.get('q')
        # category = self.request.GET.get('category')
        # label = self.request.GET.get('label')
        # Apply filters if 'category' and 'label' are provided
        # if category and label:
        #     qs = qs.filter(category=category, label=label)
        # elif category:
        #     qs = qs.filter(category=category)
        # elif label:
        #     qs = qs.filter(label=label)

        if query:
            lookups = (
                Q(title__icontains=query) |
                Q(body__icontains=query)
                # Q(author__icontains=query)
            )
            qs = qs.filter(lookups)
        return qs

class Detail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = 'pk'
    
    def get_related_tags(self, item):
        qs = Post.objects.get(pk=item.pk).tags.all()
        return qs

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object() # Retrieve the Main Item
        related_tags = self.get_related_tags(instance) # Retrieve Related Items
        serializer = self.get_serializer(instance) # Serialize the Main Item
        data = serializer.data
        data['related_tags'] = HashtagSerializers(related_tags, many=True).data # Extend the Response Data
        return Response(data)


class SavedPicsView(generics.ListAPIView):
    model = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = 'pk'

    def get_queryset(self):
        user = self.request.user
        return user.save_pic.all()


class SavedPicsView(generics.ListAPIView):
    serializer_class = PostSerializers
    lookup_field = 'tag_slug'

    def get_queryset(self, *args, **kwargs):
        tag_slug = self.kwargs['tag_slug']
        tag = get_object_or_404(Hashtag, tag_slug=tag_slug)
        queryset = Post.objects.filter(tags=tag)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset(*args, **kwargs)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

