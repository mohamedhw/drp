import os
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.urls import reverse
from django.db.models import Q
from django.utils.text import slugify
from users.models import Profile
from PIL import Image
from os.path import join


class PostManager(models.Manager):

    def search(self, query=None):
        if query is None or query=="":
            return self.get_queryset().none()
        lookups = Q(title__icontains=query) | Q(body__icontains=query) | Q(tags__tag__icontains=query)
        return self.get_queryset().filter(lookups)


class Hashtag(models.Model):
    tag   = models.CharField(max_length=20, blank=True, null=True)
    tag_slug    = models.SlugField(null=False, unique=True)

    def get_absolute_url_tag(self):
        return reverse("articles:tags", kwargs={"tag_slug": self.tag_slug})

    def save(self, *args, **kwargs):
        if not self.tag_slug:
            self.tag_slug = slugify(self.tag)
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.tag_slug


class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    image = models.ImageField(default='default.png', blank=True, upload_to='pics/')
    date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    saved_pic = models.ManyToManyField(User, blank=True, related_name="save_pic")
    tags = models.ManyToManyField(Hashtag, blank=True, related_name="tags")
    thumb = models.ImageField(blank=True, null=True, upload_to='thumb')
    saved = models.ManyToManyField(User, blank=True, related_name="wish")
    like = models.ManyToManyField(User, blank=True, related_name="like")
    objects = PostManager()

    def __str__(self):
        return self.title


    def save(self, *args, **kwargs):
        # Check if the image needs resizing
        if not self.thumb:
            img = Image.open(self.image)     
            if img.height > 200 or img.width > 300:
                output_size = (600, 600)
                img.thumbnail(output_size)
                left = (img.width - 300) // 2
                top = (img.height - 200) // 2
                right = (img.width + 300) // 2
                bottom = (img.height + 200) // 2

                img = img.crop((left, top, right, bottom))

                thumb_filename = f"thumb_{self.image.name.split('/')[-1]}"
                thumb_path = join("thumb/", thumb_filename)
                img.save(os.path.join(settings.MEDIA_ROOT, thumb_path))
                # Save the thumbnail
                self.thumb.name = thumb_path
                super().save(*args, **kwargs) 
        

    def author_name(self):
        return self.author.username

    def author_image(self):
        profile = Profile.objects.get(user=self.author)
        return profile.image.url

