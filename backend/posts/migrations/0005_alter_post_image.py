# Generated by Django 5.0.4 on 2024-05-12 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_alter_post_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(upload_to='image_gallery/original_images'),
        ),
    ]
