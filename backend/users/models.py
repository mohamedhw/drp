from django.db import models
from django.contrib.auth.models import User


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(null=True, upload_to=upload_to, default='default.jpg')
    cover = models.ImageField(null=True, upload_to='profile/cover', default='default.jpg')

    def user_u(self):
        return self.user.username

    def __str__(self):
        return self.user.username
