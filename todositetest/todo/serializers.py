from rest_framework import serializers
from .models import Todo

class TodoReadSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Todo
        fields = "__all__"


class TodoWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Todo
        fields = "__all__"