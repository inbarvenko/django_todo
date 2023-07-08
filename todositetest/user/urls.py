# from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from .views import (
    LoginAPIView, RegistrationAPIView, UserLogoutAPIView, UserAPIView
)
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView, TokenVerifyView

app_name = 'user'
urlpatterns = [
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]