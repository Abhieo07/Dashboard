from django.urls import path,include
from rest_framework import routers
from .views import DashboardView,DashboardViewSet

router = routers.DefaultRouter()
router.register(r'dashboard', DashboardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chart',DashboardView.as_view())
]