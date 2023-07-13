from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user.urls')),
    path("todos/", include('todo.urls', namespace="todos")),
]
