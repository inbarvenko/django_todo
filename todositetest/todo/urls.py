from django.urls import path
from .views import TodoAPIView

app_name = 'todo'
urlpatterns = [
    path('todos/', TodoAPIView.as_view()),
    path('todos', TodoAPIView.as_view()),
]