# Generated by Django 4.2.5 on 2023-11-16 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_alter_post_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='thumb',
            field=models.ImageField(blank=True, upload_to='media/thumb'),
        ),
    ]
