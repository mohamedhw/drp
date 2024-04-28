from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, Case, When, Value, IntegerField
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404, redirect
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
from django.views.decorators.csrf import csrf_protect



class Latest(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        # Start with all items
        qs = super().get_queryset().order_by("-date")
        return qs


class Home(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self, *args, **kwargs):

        query = self.request.GET.get("q")

        # check if there is a search request
        if query:
            qs = super().get_queryset().order_by("-date")
            tags = Hashtag.objects.filter(tag__icontains=query)
            qs = qs.filter(tags__in=tags).distinct()
            return qs

        # check if there is a user to show recomended posts
        else:
            user = self.request.user
            if user.id:

                # get the posts where the user in the like field
                liked_qs = Post.objects.filter(like=user)  # user liked posts
                # get the posts where the user in the saved field
                saved_qs = Post.objects.filter(saved=user)  # user saved posts
                # Combine the liked_qs and the saved_qs
                combined_qs = liked_qs.union(saved_qs)
                # get the tags of both
                taged_qs = combined_qs.values_list("tags", flat=True)
                # get the posts with related tags
                # related_pics = Post.objects.filter(tags__in=taged_qs)
                related_pics = Post.objects.filter(tags__in=taged_qs).annotate(
                    num_matching_tags=Count("tags", filter=Q(tags__in=taged_qs))
                )
                qs = related_pics.exclude(Q(id__in=liked_qs) | Q(id__in=saved_qs))

                # Define the sorting order using Case/When
                ordering = Case(
                    *[
                        When(num_matching_tags=i, then=Value(i))
                        for i in range(len(taged_qs) + 1)
                    ],
                    default=Value(len(taged_qs)),
                    output_field=IntegerField(),
                )

                # Exclude liked_qs and saved_qs, then order by the number of matching tags and date
                qs = qs.order_by(-ordering, "-date")

                return qs
            # If there is there is no user then show latest posts
            else:

                # Define the date range
                now = timezone.now()
                one_days_ago = now - timedelta(days=1)
                ten_days_ago = now - timedelta(days=10)
                thirty_days_ago = now - timedelta(days=30)

                qs = Post.objects.filter(date__gte=ten_days_ago).order_by("?")
                qs = qs.annotate(like_count=Count("like"))
                qs_day = qs.order_by("-like_count")
                related_items_count = qs_day.count()  # number of related pics

                additional_items_needed = 24 - related_items_count
                if related_items_count < 24:
                    # Define the date range
                    now = timezone.now()
                    ten_days_ago = now - timedelta(days=3)
                    qs = Post.objects.filter(date__gte=ten_days_ago).order_by("?")
                    related_items_count = qs.count()  # number of related pics

                    # Extract primary keys from related_pics
                    related_pics_pks = qs_day.values_list("pk", flat=True)

                    additional_items = Post.objects.exclude(
                        Q(pk__in=related_pics_pks)
                    ).order_by("?")[:additional_items_needed]

                    qs = list(qs) + list(additional_items)

                return qs



# most liked pics
class TopPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        now = timezone.now()
        top_range_qs = self.request.GET.get("topRange")
        ranges = ["1d", "3d", "1w", "1M", "6M", "1y", "all"]

        time_range = now - timedelta(days=30)
        qs = Post.objects.filter(date__gte=time_range)
        if top_range_qs in ranges:
            if top_range_qs[1] == "d":
                top_range_num = int(top_range_qs[0])
                if top_range_num == 1:
                    time_range = now - timedelta(days=1)
                    qs = Post.objects.filter(date__gte=time_range)
                elif top_range_num == 3:
                    time_range = now - timedelta(days=3)
                    qs = Post.objects.filter(date__gte=time_range)
            elif top_range_qs[1] == "w":
                time_range = now - timedelta(days=7)
                qs = Post.objects.filter(date__gte=time_range)
            elif top_range_qs[1] == "M":
                top_range_num = int(top_range_qs[0])
                if top_range_num == 1:
                    time_range = now - timedelta(days=30)
                    qs = Post.objects.filter(date__gte=time_range)
                elif top_range_num == 6:
                    time_range = now - timedelta(days=180)
                    qs = Post.objects.filter(date__gte=time_range)
            elif top_range_qs[1] == "y":
                time_range = now - timedelta(days=365)
                qs = Post.objects.filter(date__gte=time_range)
            elif top_range_qs == "all":
                qs = Post.objects.all()
            else:
                qs = Post.objects.all()
        else:
            time_range = now - timedelta(days=30)
            qs = Post.objects.filter(date__gte=time_range)

        qs = qs.annotate(like_count=Count("like"))
        qs = qs.order_by("-like_count")
        return qs


# Random pics
class RandomPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        qs = Post.objects.all()
        qs = qs.order_by("?")
        return qs


@api_view(["POST", "GET"])
def like_pic(request, pk):
    try:
        post = Post.objects.get(pk=pk)
        if request.user in post.like.all():
            post.like.remove(request.user)
            return Response({"success": "like remoed"})
        else:
            post.like.add(request.user)
            return Response({"success": "like added"})
    except:
        return Response({"error": "error"})


@api_view(["POST", "GET"])
def save_pic(request, pk):
    try:
        post = Post.objects.get(pk=pk)
        if request.user in post.saved.all():
            post.saved.remove(request.user)
            return Response({"success": "pic remove from your saved pics list"})
        else:
            post.saved.add(request.user)
            return Response({"success": "pic added to your saved pics list"})
    except:
        return Response({"error": "error"})


class SavedPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers

    def get_queryset(self, *args, **kwargs):
        user = self.request.user

        # Start with all items
        qs = Post.objects.filter(saved=user)

        return qs


class Search(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers

    def get_queryset(self):
        qs = Post.objects.all()
        query = self.request.GET.get("search")
        if query:
            tags = Hashtag.objects.filter(tag__icontains=query)
            qs = qs.filter(tags__in=tags).distinct()
        qs = qs.order_by("-date")
        return qs


class Detail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = "pk"
    permission_classes = (permissions.AllowAny,)

    def get_related_tags(self, item):

        qs = Post.objects.get(pk=item.pk).tags.all()

        return qs

    def get_related_pics(self, item):

        item_tags = item.tags.all()  # get the item tags

        related_pics = Post.objects.filter(tags__in=item_tags).exclude(pk=item.pk)[:6]

        related_items_count = related_pics.count()  # number of related pics

        if related_items_count < 6:
            additional_items_needed = 6 - related_items_count

            # Extract primary keys from related_pics
            related_pics_pks = related_pics.values_list("pk", flat=True)

            additional_items = Post.objects.exclude(
                Q(pk=item.pk) | Q(pk__in=related_pics_pks)
            )[:additional_items_needed]
            related_pics = list(related_pics) + list(additional_items)

        return related_pics

    def add_view(self, item):
        try:
            post = Post.objects.get(pk=item.pk)
            if not self.request.user in post.watched.all():
                post.watched.add(self.request.user)
        except:
            return Response({"error": "error"})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()  # Retrieve the Main Item
        self.add_view(instance)

        related_pics = self.get_related_pics(instance)  # Retrieve Related pics
        related_tags = self.get_related_tags(instance)  # Retrieve Related tags
        serializer = self.get_serializer(instance)  # Serialize the Main Item
        data = serializer.data
        size_in_mb = instance.image.size / (1024 * 1024)
        image_size = round(size_in_mb, 1)
        data["image_size"] = image_size
        data["related_tags"] = HashtagSerializers(
            related_tags, many=True
        ).data  # Extend the Response Data
        data["related_pics"] = self.get_serializer(related_pics, many=True).data
        return Response(data)


class TagFilterView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = "tag_slug"
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        tag_slug = self.kwargs.get("tag_slug")
        tag = get_object_or_404(Hashtag, tag_slug=tag_slug)
        queryset = Post.objects.filter(tags=tag)
        return queryset


class AllTags(generics.ListAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializers
    pagination_class = None
    permission_classes = (permissions.AllowAny,)

    def list(self, request, *args, **kwargs):
        # Retrieve all hashtags with post count
        tags_with_count = Hashtag.objects.annotate(post_count=Count("tags")).values(
            "tag", "tag_slug", "post_count"
        )

        # Serialize the data
        serializer = self.serializer_class(tags_with_count, many=True)

        # Return the serialized data as a response
        return Response(serializer.data)


@method_decorator(csrf_protect, name="dispatch")
class PostCreate(generics.CreateAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializers

    def post(self, request):
        data = request.data
        tag_data = data.get("tag")
        if tag_data:
            tags_data = data.pop("tag", [])
            if tags_data == ["undefined"]:
                post_serializer = PostSerializers(data=data)

                if post_serializer.is_valid():
                    post = post_serializer.save()
                    return redirect("/")
            else:
                tags_data = tags_data[0].split(",")
                post_serializer = PostSerializers(data=data)

                if post_serializer.is_valid():
                    # Create and associate tags with the post
                    post = post_serializer.save()

                    for tag_data in tags_data:
                        if "#" in tag_data:
                            tag_data = tag_data.lstrip("#")
                        tag_data = tag_data.strip()
                        tag, created = Hashtag.objects.get_or_create(tag=tag_data)

                        if not created:
                            post.tags.add(tag)
                            # pass
                        post.tags.add(tag)
                    return redirect("/")
        else:

            post_serializer = PostSerializers(data=data)

            if post_serializer.is_valid():
                post = post_serializer.save()
                return redirect("/")

        return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagsSuggestion(generics.ListAPIView):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializers

    def get_queryset(self, *args, **kwargs):
        query = self.request.GET.get("q")
        qs = Hashtag.objects.search(query=query)

        return qs


@method_decorator([ensure_csrf_cookie, csrf_protect], name="dispatch")
class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    lookup_field = "pk"
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        tags = instance.tags.all()
        # check fot to know if the oic have tags or not and if the tag is used in other pics or not
        if request.user == instance.author:
            if tags:
                for tag in tags:
                    tag_filter = Hashtag.objects.get(tag_slug=tag.tag_slug)
                    post = Post.objects.filter(tags=tag_filter).count()
                    if post <= 1:
                        tag_filter.delete()
                        instance.delete()
                    else:
                        instance.delete()
            else:
                instance.delete()
            return Response({"success": "post deleted successfully"})
        else:
            return Response({"error": "failed"})


# @method_decorator(ensure_csrf_cookie, name='dispatch')
class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    lookup_field = "pk"

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if request.user == instance.author:
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "post updated successfully"})
            else:
                return Response({"error": serializer.errors})
        else:
            return Response({"error": "failed"})


class UserPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)
    lookup_field = "user"

    def get_queryset(self, *args, **kwargs):
        user = get_object_or_404(User, username=self.kwargs.get("username"))
        qs = Post.objects.filter(author=user)
        return qs
