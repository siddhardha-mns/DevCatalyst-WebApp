from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()

    def __str__(self):
        return self.title

class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return f"{self.name} - {self.event.title}"
