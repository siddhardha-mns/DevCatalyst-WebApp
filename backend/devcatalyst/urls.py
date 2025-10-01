from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from events.views import EventViewSet, RegistrationViewSet

router = routers.DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'register', RegistrationViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
