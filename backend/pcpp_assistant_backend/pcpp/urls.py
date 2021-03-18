from django.urls import path
from .views import HardwareView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('hardware/', HardwareView.as_view(), name='hardware_info'),
]
