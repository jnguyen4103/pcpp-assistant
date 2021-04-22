from django.urls import path
from .views import HardwareView, SeedData, Pricing, SaveComputer, GetComputers, getProductView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('find/', getProductView.as_view(), name='hardware_info'),
    path('hardware/', HardwareView.as_view(), name='hardware_info'),
    path('seed/', SeedData.as_view(), name='hardware_info'),
    path('pricing/', Pricing.as_view(), name='hardware_info'),
    path('savepc/', SaveComputer.as_view(), name='hardware_info'),
    path('getpc/', GetComputers.as_view(), name='hardware_info')
]

