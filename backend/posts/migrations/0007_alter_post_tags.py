# Generated by Django 4.2.5 on 2023-11-16 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_post_image_alter_post_thumb'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='tags', to='posts.hashtag'),
        ),
    ]
