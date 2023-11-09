from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions, authentication
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from .models import Post, Hashtag
from .serializers import PostSerializers, HashtagSerializers
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User


class Home(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class=PostSerializers
    permission_classes = (permissions.AllowAny, )

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
        qs = qs.order_by('-date')
        return qs


class Search(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class=PostSerializers

    def get_queryset(self, *args, **kwargs):
        qs = Post.objects.all()
        query = self.request.GET.get('search')
        if query:
            lookups = (
                Q(title__icontains=query) |
                Q(body__icontains=query)
            )
            qs = qs.filter(lookups)
        return qs



class Detail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = 'pk'
    permission_classes = (permissions.AllowAny, )
    
    def get_related_tags(self, item):
        
        qs = Post.objects.get(pk=item.pk).tags.all()
        
        return qs

    def get_related_pics(self, item):

        item_tags = item.tags.all() # get the item tags
        all_tags = Hashtag.objects.all() # get all tags

        related_pics = Post.objects.filter(tags__in=item_tags).exclude(pk=item.pk)[:6]

        related_items_count = related_pics.count() # number of related pics

        if related_items_count < 6:
            additional_items_needed = 6 - related_items_count
            
            additional_items = Post.objects.exclude(
                Q(title__icontains=item.title) | Q(pk=item.pk)
            )[:additional_items_needed]
            related_pics = list(related_pics) + list(additional_items)
            
            # related_items_count = related_pics.count()


        return related_pics

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object() # Retrieve the Main Item
        thumb_width = instance.thumb.width
        thumb_height = instance.thumb.height

        related_pics = self.get_related_pics(instance) # Retrieve Related pics
        related_tags = self.get_related_tags(instance) # Retrieve Related tags
        serializer = self.get_serializer(instance) # Serialize the Main Item
        data = serializer.data
        data['thumb_dimensions'] = f"{thumb_width} X {thumb_height}"
        data['related_tags'] = HashtagSerializers(related_tags, many=True).data # Extend the Response Data
        data['related_pics'] = self.get_serializer(related_pics, many=True).data
        return Response(data)


# class SavedPicsView(generics.ListAPIView):
#     model = Post.objects.all()
#     serializer_class = PostSerializers
#     lookup_field = 'pk'

#     def get_queryset(self):
#         user = self.request.user
#         return user.save_pic.all()


class TagFilterView(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class = PostSerializers
    pagination_class = PageNumberPagination
    # lookup_field = 'tag_slug'
    # permission_classes = (permissions.AllowAny, )

    def get_queryset(self, *args, **kwargs):
        tag_slug = self.kwargs['tag_slug']
        tag = get_object_or_404(Hashtag, tag_slug=tag_slug)
        queryset = Post.objects.filter(tags=tag)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset(*args, **kwargs)

        paginator = PageNumberPagination()
        paginator.page_size = 12  # You can adjust the page size here
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = self.serializer_class(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


@method_decorator(csrf_protect, name='dispatch')
class PostCreate(generics.CreateAPIView):
    # queryset = Post.objects.all()
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializers

    def post(self, request):
        data = request.data
        try:
            if data.tag:
                tags_ = Hashtag.objects.all()
                tags_data = data.pop('tag', [])
                if '#' in tags_data:
                    tags_data=tags_data[0].split('#')
                tags_data=tags_data[0].split()

                post_serializer = PostSerializers(data=data)

                if post_serializer.is_valid():
                    # Create and associate tags with the post
                    post = post_serializer.save()

                    for tag_data in tags_data:
                        if '#' in tag_data:
                            tag_data = tag_data.lstrip('#')
                        tag, created = Hashtag.objects.get_or_create(tag=tag_data)

                        if not created:
                            post.tags.add(tag)
                            # pass
                        post.tags.add(tag)
                    return redirect('/')
            
        except AttributeError:
            post_serializer = PostSerializers(data=data)
            if post_serializer.is_valid():
                # Create and associate tags with the post
                post = post_serializer.save()
                return redirect('/')

        return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @method_decorator(ensure_csrf_cookie, name='dispatch')
class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.author:
            instance.delete()
            return Response({"message": "post deleted success"})
        else:
            return Response({"message": "failed"})


# @method_decorator(ensure_csrf_cookie, name='dispatch')
class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if request.user == instance.author:
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "post updated success"})
            else:
                return Response({"message": "failed", "details": serializer.errors})
        else:
            return Response({"message": "failed"})


class UserPics(generics.ListAPIView):
    queryset=Post.objects.all()
    serializer_class=PostSerializers
    permission_classes = (permissions.AllowAny, )
    lookup_field = 'user'
    
    def get_queryset(self, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        qs = Post.objects.filter(author=user)
        return qs

