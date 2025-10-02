# Generated migration for admin functionality

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='image',
            field=models.URLField(blank=True, help_text='Event image URL', max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='max_participants',
            field=models.IntegerField(default=100),
        ),
        migrations.AddField(
            model_name='event',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='registration',
            name='is_confirmed',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='registration',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='registration',
            name='registration_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('image', models.URLField(help_text='Gallery image URL', max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_featured', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='gallery_images', to='events.event')),
            ],
            options={
                'verbose_name_plural': 'Gallery',
                'ordering': ['-created_at'],
            },
        ),
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['-date']},
        ),
        migrations.AlterModelOptions(
            name='registration',
            options={'ordering': ['-registration_date']},
        ),
        migrations.AlterUniqueTogether(
            name='registration',
            unique_together={('event', 'email')},
        ),
    ]