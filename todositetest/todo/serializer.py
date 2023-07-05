from rest_framework import serializers
from .models import Todo, User

class TodoSerializer(serializers.ModelSerializer):

    # author = serializers.CharField(source='user.objects.token', max_length=200, default='DEFAULT VALUE')
    author = serializers.SlugRelatedField(slug_field='id', queryset=User.objects)

    class Meta:
        model = Todo
        fields = ['title', 'completed', 'author']

    def create(self, validated_data):
        return Todo.objects.create_todo(**validated_data)