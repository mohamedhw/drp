from django.db import models
from django.contrib.auth.models import User
from PIL import Image


def upload_to(instance, filename):
    return 'profile_images/image/{filename}'.format(filename=filename)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(null=True, upload_to=upload_to, default='default.jpg')
    cover = models.ImageField(null=True, upload_to='profile_images/cover', default='default.jpg')

    def user_u(self):
        return self.user.username

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 200 or img.width > 200:
            output_size = (200, 200)

            img.thumbnail(output_size)
            img.save(self.image.path)

        # Check the size of the image
        max_size_kb = 200  # Maximum allowed size in kilobytes
        max_size_bytes = max_size_kb * 1024  # Convert KB to Bytes
        img_byte_array = img.tobytes()
        img_size_bytes = len(img_byte_array)

        # If the size of the image exceeds the maximum allowed size, compress it
        if img_size_bytes > max_size_bytes:
            # Calculate the compression ratio
            compression_ratio = max_size_bytes / img_size_bytes
            # Reduce the image quality to meet the maximum size requirement
            img.save(self.image.path, quality=int(100 * compression_ratio))
