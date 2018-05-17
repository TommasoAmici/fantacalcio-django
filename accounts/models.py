from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
import uuid


# Create your models here.

class League(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    founder = models.ForeignKey("auth.User", related_name="founded", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name="leagues", through="Membership", blank=True)

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return self.name


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ("date_joined",)
        auto_created = True
