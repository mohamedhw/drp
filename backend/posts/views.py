from django.db.models.fields import related_lookups
from rest_framework import status
from django.utils import timezone
from datetime import timedelta, datetime
from django.db.models import Count, Case, When, Value, IntegerField, FloatField, F, ExpressionWrapper
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404, redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions, authentication
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from .models import Post, Hashtag, Visit
from .serializers import PostSerializers, HashtagSerializers
from django.db.models import Q
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect



class LatestPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
            
        # Start with all items
        qs = super().get_queryset().order_by("-created_at")
        return qs


class HotPics(generics.ListAPIView):
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)
    def get_queryset(self):

        # Get current time
        now = timezone.now()

        # Calculate the age of the post in hours
        age_expression = ExpressionWrapper(
            (now - F("created_at")) / timedelta(hours=1),
            output_field=FloatField(),
        )
        # Define weights for different parameters
        likes_weight = 0.7
        views_weight = 0.2
        recent_activity_weight = 0.1

        # Calculate hotness score
        qs = Post.objects.annotate(
            age_in_hours=age_expression,
            like_count=Count("like"),
            watched_count=Count("watched"),
            hotness_score=(
                (Count("like") * likes_weight) +
                (Count("watched") * views_weight) +
                (recent_activity_weight / F("age_in_hours"))
            )
        ).order_by("-hotness_score")

        return qs

class ForYouPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self, *args, **kwargs):
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
            qs = qs.order_by(-ordering, "-created_at")

            return qs



# most liked pics
class TopPics(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        now = datetime.now()
        top_range_qs = self.request.GET.get("topRange", "1M")
        time_ranges = {
            "1d": timedelta(days=1),
            "3d": timedelta(days=3),
            "1w": timedelta(weeks=1),
            "1M": timedelta(days=30),
            "6M": timedelta(days=180),
            "1y": timedelta(days=365),
            "all": None
        }
        time_range = time_ranges.get(top_range_qs)
        if time_range is not None:
            time_range_start = now - time_range
            qs = Post.objects.filter(created_at__gte=time_range_start)
        else:
            qs = Post.objects.all()

        qs = qs.annotate(like_count=Count("like")).order_by("-like_count")
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
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        qs = Post.objects.all()
        query = self.request.GET.get("q")
        if query:
            query_list = query.split(" ")
            tags = Hashtag.objects.filter(Q(tag__in=query_list) | Q(tag__icontains=query))
            qs = qs.filter(tags__in=tags).distinct()
        qs = qs.order_by("-created_at")
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
        taged_qs = item.tags.all()  # get the item tags
        related_pics = Post.objects.filter(tags__in=taged_qs).annotate(
            num_matching_tags=Count("tags", filter=Q(tags__in=taged_qs))
            ).exclude(pk=item.pk)

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
        related_pics = related_pics.order_by(-ordering)[:6]
        related_items_count = related_pics.count()  # number of related pics
        if related_items_count < 6:
            additional_items_needed = 6 - related_items_count

            related_pics_pks = related_pics.values_list("pk", flat=True)

            additional_items = Post.objects.exclude(
                Q(pk=item.pk) | Q(pk__in=related_pics_pks)
            ).distinct()[:additional_items_needed]

            related_pics = list(related_pics) + list(additional_items)

        return related_pics

    def add_view(self, item):
        try:
            post = Post.objects.get(pk=item.pk)
            ip_address = self.request.META.get("REMOTE_ADDR")
            visitors = Visit.objects.values_list("ip_address", flat=True)
            
            if ip_address not in visitors:
                visitor = Visit.objects.create(ip_address=ip_address)
            else:
                visitor = Visit.objects.get(ip_address=ip_address)
                
            if visitor not in post.watched.all():
                post.watched.add(visitor)
                post.save()
            
            return Response({"success": "View added successfully."})
        except Exception as e:
            return Response({"error": str(e)})

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
                    return Response({"success": "post created successfully"})
        else:
            post_serializer = PostSerializers(data=data)
            if post_serializer.is_valid():
                post = post_serializer.save()
                return Response({"success": "post created successfully"})

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
