from django.db import models

from django.contrib.auth import get_user_model

from user.models import User


User = get_user_model()

class TodoManager(models.Manager):
  def create_todo(self, title, author, completed=False):
        if title is None:
            raise TypeError('Todo must have a title.')
        if author is None:
            raise TypeError('Todo must have an author.')

        todo = self.model(title=title, completed=completed, author=author)
        todo.save()

        return todo

class Todo(models.Model):
  title = models.CharField("Title", max_length=100, default='Nothing')
  completed = models.BooleanField("Completed",default=False)
  # author = models.CharField("Title", max_length=100, default='Nothing')
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  # author = models.ForeignKey(to=User, on_delete=models.CASCADE)
  
  objects = TodoManager()

  def __str__(self):
    return self.title