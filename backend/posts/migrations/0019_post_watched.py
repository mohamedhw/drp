# Generated by Django 3.2.20 on 2024-03-17 17:37

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0018_auto_20240316_1509'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='watched',
            field=models.ManyToManyField(blank=True, related_name='watched', to=settings.AUTH_USER_MODEL),
        ),
    ]
