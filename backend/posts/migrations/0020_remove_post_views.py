# Generated by Django 3.2.20 on 2024-03-17 17:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0019_post_watched'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='views',
        ),
    ]
