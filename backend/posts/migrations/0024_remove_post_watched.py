# Generated by Django 5.0.4 on 2024-05-05 07:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0023_alter_post_watched'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='watched',
        ),
    ]
