from .serializers import TodoReadSerializer, TodoWriteSerializer
from .models import Todo
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator

class TodoViewSet(viewsets.ModelViewSet):
    """
    CRUD posts
    """

    permission_classes = (IsAuthenticated,)

    def list(self, request):
        filte = request.GET.get('filter')
        pageNum = request.GET.get('page')
        userId = request.GET.get('userId')
        

        serialize = self.get_serializer_class()

        print(filte, pageNum, userId, serialize)

        if Todo.objects.all():
            if (filte == 'all' or not filte):
                queryset = Todo.objects.filter(author=userId)

            else:
                fil = (filte == 'completed')
                queryset = Todo.objects.filter(author=userId, completed=fil)

            pagination = Paginator(queryset, 10)
            p1 = pagination.page(pageNum) # получение pageNum страницы
            print(pagination.num_pages, p1.object_list)

            activeTasks = Todo.objects.filter(author=userId, completed=False).count()

            serializer = serialize(p1.object_list, many=True)
            # if serializer.is_valid():
            return Response(data={
                    "todos": serializer.data,
                    "activeTasks": activeTasks,
                    "pages": pagination.num_pages
                }, status=status.HTTP_200_OK)
            # else: 
            #     return Response(data=serializer.errors, 
            #                     status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    def create(self, request):
        user = request.user
        
        serialiaze = self.get_serializer_class()
        serializer = serialiaze(data=request.data, context={'author': user})

        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request):
        id = request.data.id
        print(id)
        item = Todo.objects.get(id=id)
        print(item)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    # In order to use different serializers for different 
    # actions, you can override the 
    # get_serializer_class(self) method
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            print("TodoWriteSerializer")
            return TodoWriteSerializer
        print("TodoReadSerializer")
        return TodoReadSerializer

    