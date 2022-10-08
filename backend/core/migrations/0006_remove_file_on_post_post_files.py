# Generated by Django 4.0.8 on 2022-10-08 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_file_on_post'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='on_post',
        ),
        migrations.AddField(
            model_name='post',
            name='files',
            field=models.ManyToManyField(blank=True, to='core.file'),
        ),
    ]