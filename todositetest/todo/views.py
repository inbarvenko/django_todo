from .serializers import TodoReadSerializer, TodoWriteSerializer
from .models import Todo
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

class TodoViewSet(viewsets.ModelViewSet):
    """
    CRUD posts
    """

    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        filte = self.request.query_params.get('filter')
        page = self.request.query_params.get('page')
        userId = self.request.query_params.get('userId')
        print(filte, page, userId)

        if Todo.objects.all():
            if (filte == 'all' or not filte):
                queryset = Todo.objects.filter(author=userId)
            else:
                fil = (filte == 'completed')
                queryset = Todo.objects.filter(author=userId, completed=fil)
            return queryset
        else:
            return {}


    # In order to use different serializers for different 
    # actions, you can override the 
    # get_serializer_class(self) method
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return TodoWriteSerializer
        return TodoReadSerializer

    