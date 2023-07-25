from rest_framework import serializers
from .models import Todo

class TodoReadSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Todo
        fields = "__all__"


class TodoWriteSerializer(serializers.ModelSerializer):
    # author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    

    def create(self, validated_data):
        title = validated_data.get('title')  # optional, read validated data
        validated_data['author'] = self.context['author'] # optional , saving extra data
        todo = Todo.objects.create(**validated_data)  # saving post object
        print(todo)
        return todo

    class Meta:
        model = Todo
        fields = "__all__"