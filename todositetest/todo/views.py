from .serializers import TodoReadSerializer, TodoWriteSerializer
from .models import Todo
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

class TodoViewSet(viewsets.ModelViewSet):
    """
    CRUD posts
    """

    # token = RefreshToken.get_user("admin")
    # serialize = serializers.CurrentUserDefault()
    queryset = Todo.objects.filter(author=1)
    permission_classes = (IsAuthenticated,)

    # def get_queryset(self):
    #     filte = self.request.query_params.get('filter')
    #     page = self.request.query_params.get('page')
    #     print(filte, page)

    #     if (filte == 'all' or not filte):
    #         queryset = Todo.objects.filter(author=1)
    #     else:
    #         fil = (filte == 'completed')
    #         queryset = Todo.objects.filter(author=1, completed=fil)

    #     return queryset


    # In order to use different serializers for different 
    # actions, you can override the 
    # get_serializer_class(self) method
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return TodoWriteSerializer

        return TodoReadSerializer

    