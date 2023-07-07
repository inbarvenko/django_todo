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


    # In order to use different serializers for different 
    # actions, you can override the 
    # get_serializer_class(self) method
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return TodoWriteSerializer

        return TodoReadSerializer

    