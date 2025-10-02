from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Event, Registration, Gallery
from .serializers import (
    EventSerializer, RegistrationSerializer, GallerySerializer,
    LoginSerializer, UserSerializer
)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(is_active=True)
    serializer_class = EventSerializer
    
    def get_permissions(self):
        # Allow anyone to view events, only authenticated users to create/update/delete
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['get'])
    def registrations(self, request, pk=None):
        """Get all registrations for a specific event"""
        event = self.get_object()
        registrations = Registration.objects.filter(event=event)
        serializer = RegistrationSerializer(registrations, many=True)
        return Response(serializer.data)

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    
    def get_permissions(self):
        # Allow anyone to register, only authenticated users to view all/update/delete
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    
    def get_permissions(self):
        # Allow anyone to view gallery, only authenticated users to create/update/delete
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured gallery images"""
        featured_images = Gallery.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_images, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    """Admin login with hardcoded credentials"""
    print(f"Login attempt received: {request.data}")  # Debug log
    
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        print(f"Login successful for user: {user.username}")  # Debug log
        
        return Response({
            'success': True,
            'message': 'Login successful',
            'token': token.key,
            'user': UserSerializer(user).data
        })
    else:
        print(f"Login failed: {serializer.errors}")  # Debug log
        return Response({
            'success': False,
            'message': 'Invalid credentials',
            'errors': serializer.errors
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def admin_logout(request):
    """Admin logout"""
    try:
        # Delete the user's token
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({
            'success': True,
            'message': 'Logout successful'
        })
    except Token.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Token not found'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    """Get admin dashboard data"""
    total_events = Event.objects.count()
    active_events = Event.objects.filter(is_active=True).count()
    total_registrations = Registration.objects.count()
    total_gallery_images = Gallery.objects.count()
    
    return Response({
        'success': True,
        'data': {
            'total_events': total_events,
            'active_events': active_events,
            'total_registrations': total_registrations,
            'total_gallery_images': total_gallery_images,
            'recent_events': EventSerializer(
                Event.objects.all()[:5], many=True
            ).data,
            'recent_registrations': RegistrationSerializer(
                Registration.objects.all()[:10], many=True
            ).data
        }
    })
