from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Event, Registration, Gallery

class EventSerializer(serializers.ModelSerializer):
    registration_count = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'image', 'location', 
                 'max_participants', 'is_active', 'registration_count', 'is_full',
                 'created_by_name', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class RegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    
    class Meta:
        model = Registration
        fields = ['id', 'event', 'event_title', 'name', 'email', 'phone', 
                 'registration_date', 'is_confirmed']
        read_only_fields = ['registration_date']
    
    def validate(self, data):
        event = data['event']
        email = data['email']
        
        # Check if event is full
        if event.is_full:
            raise serializers.ValidationError("This event is full. Registration closed.")
        
        # Check if user already registered
        if Registration.objects.filter(event=event, email=email).exists():
            raise serializers.ValidationError("You are already registered for this event.")
        
        return data

class GallerySerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Gallery
        fields = ['id', 'title', 'description', 'image', 'event', 'event_title',
                 'created_by_name', 'created_at', 'is_featured']
        read_only_fields = ['created_at']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            # Hardcoded admin credentials
            if username == 'admin' and password == 'devcatalyst2025':
                # Create or get admin user
                user, created = User.objects.get_or_create(
                    username='admin',
                    defaults={
                        'email': 'admin@devcatalyst.com',
                        'is_staff': True,
                        'is_superuser': True,
                        'first_name': 'DevCatalyst',
                        'last_name': 'Admin'
                    }
                )
                if created:
                    user.set_password('devcatalyst2025')
                    user.save()
                
                data['user'] = user
                return data
            else:
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError('Both username and password are required')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']
        read_only_fields = ['id']
