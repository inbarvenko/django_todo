from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from .renderers import TodoJSONRenderer
from rest_framework.generics import RetrieveUpdateAPIView
from .serializer import TodoSerializer
from .models import Todo
from rest_framework.renderers import JSONRenderer

class TodoAPIView(RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    renderer_classes = [JSONRenderer]
    serializer_class = TodoSerializer

    def get(self, request):
        queryset = Todo.objects.all()

        serializer_for_queryset = TodoSerializer(
            instance=queryset,  
            many=True  
        )
        return Response(serializer_for_queryset.data)
    
    def post(self, request):
        print(request.data)
        todo = request.data.get('todo', {})

        serializer = self.serializer_class(data=todo)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    