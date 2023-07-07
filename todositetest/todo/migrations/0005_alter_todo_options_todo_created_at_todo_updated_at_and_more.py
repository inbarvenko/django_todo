# Generated by Django 4.2.2 on 2023-07-05 05:06

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todo', '0004_alter_todo_author'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ('-created_at',)},
        ),
        migrations.AddField(
            model_name='todo',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2023, 7, 5, 5, 6, 52, 953316, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='todo',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='todo',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='todos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='todo',
            name='completed',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(max_length=250, verbose_name='Todo title'),
        ),
    ]