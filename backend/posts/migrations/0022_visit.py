# Generated by Django 5.0.4 on 2024-05-05 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0021_remove_post_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='Visit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.CharField(max_length=45)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
