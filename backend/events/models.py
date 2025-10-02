from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    image = models.URLField(max_length=500, blank=True, null=True, help_text="Event image URL")
    location = models.CharField(max_length=200, blank=True, null=True)
    max_participants = models.IntegerField(default=100)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title

    @property
    def registration_count(self):
        return self.registrations.count()

    @property
    def is_full(self):
        return self.registration_count >= self.max_participants

class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    registration_date = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=True)

    class Meta:
        unique_together = ('event', 'email')
        ordering = ['-registration_date']

    def __str__(self):
        return f"{self.name} - {self.event.title}"

class Gallery(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(max_length=500, help_text="Gallery image URL")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="gallery_images", null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Gallery"

    def __str__(self):
        return self.title
