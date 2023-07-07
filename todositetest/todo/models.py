from django.db import models

from django.conf import settings

from django.utils.translation import gettext_lazy as _

class Todo(models.Model):
    title = models.CharField(_("Todo title"), max_length=250)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="todos",
        null=True,
        on_delete=models.CASCADE,
    )
    completed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.title} by {self.author.username}"