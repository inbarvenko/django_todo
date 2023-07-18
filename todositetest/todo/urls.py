from django.urls import path, include
from .views import TodoViewSet
from rest_framework.routers import DefaultRouter

app_name = 'todos'

router = DefaultRouter()
router.register(r"", TodoViewSet,  basename='Todo')

urlpatterns = [
    path("", include(router.urls)),
]