# Generated by Django 4.2.5 on 2023-11-19 01:07

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0012_alter_post_thumb'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='saved',
            field=models.ManyToManyField(blank=True, related_name='wish', to=settings.AUTH_USER_MODEL),
        ),
    ]
