from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
import uuid

# Create your models here.
class League(models.Model):
    name = models.CharField(max_length=60)
    participants = models.ManyToManyField(User, related_name='participant')
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def slug(self):
        return slugify(self.name)
