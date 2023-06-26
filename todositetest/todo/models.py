from django.db import models

class Todo(models.Model):
  title = models.CharField("Title", max_length=100, default='Nothing')
  completed = models.BooleanField("Completed",default=False)

  def __str__(self):
    return self.title