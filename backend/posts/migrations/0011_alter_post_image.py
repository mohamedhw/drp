# Generated by Django 4.2.5 on 2023-11-16 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_alter_post_image_alter_post_thumb'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, default='default.png', upload_to='pics/'),
        ),
    ]
