from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import (
    LoginAPIView, RegistrationAPIView, UserRetrieveUpdateAPIView
)

app_name = 'user'
urlpatterns = [
    path('user/', UserRetrieveUpdateAPIView.as_view()),
    path('users/', RegistrationAPIView.as_view()),
    # path('users/<int:pk>/', RegistrationAPIView.as_view()),
    path('users/login/', LoginAPIView.as_view()),
]