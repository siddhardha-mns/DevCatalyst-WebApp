from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.http import JsonResponse
from events.views import EventViewSet, RegistrationViewSet, GalleryViewSet, admin_login, admin_logout, admin_dashboard

# Simple test endpoint
def api_test(request):
    return JsonResponse({
        'status': 'Backend is running!',
        'endpoints': {
            'events': '/api/events/',
            'register': '/api/register/',
            'gallery': '/api/gallery/',
            'admin_login': '/api/admin/login/',
            'admin_dashboard': '/api/admin/dashboard/'
        }
    })

router = routers.DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'register', RegistrationViewSet)
router.register(r'gallery', GalleryViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/test/", api_test, name='api_test'),
    path("api/admin/login/", admin_login, name='admin_login'),
    path("api/admin/logout/", admin_logout, name='admin_logout'),
    path("api/admin/dashboard/", admin_dashboard, name='admin_dashboard'),
]
