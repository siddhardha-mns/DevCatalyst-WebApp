from django.contrib import admin
from .models import Event, Registration

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date']
    list_filter = ['date']
    search_fields = ['title', 'description']

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'event']
    list_filter = ['event']
    search_fields = ['name', 'email']