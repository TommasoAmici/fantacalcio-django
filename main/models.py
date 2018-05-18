from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid


# Create your models here.


class League(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    founder = models.ForeignKey(
        "auth.User", related_name="founded", on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="name", unique=True)
    teams = models.ManyToManyField(
        User, related_name="leagues", through="Team", blank=True
    )

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return self.name


class Bonus(models.Model):
    """
    Goal, assist, etc.
    """
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Performance(models.Model):
    """
    Stores information about a player's performance
    """
    vote = models.IntegerField(
        default=6,
        validators=[MaxValueValidator(10), MinValueValidator(0)]
    )
    bonuses = models.ManyToManyField(Bonus, blank=True)
    fantavote = models.IntegerField(default=6)
    against_team_irl = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    matchday = models.IntegerField()


class Role(models.Model):
    """
    Stores roles of a player
    """ 
    role = models.CharField(max_length=3)
    mantra = models.BooleanField(default=False)

    def __str__(self):
        return self.role


class Season(models.Model):
    """
    Stores information about a player's season
    """
    roles = models.ManyToManyField(Role, blank=True)
    team_irl = models.CharField(max_length=100)
    price = models.IntegerField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    performances = models.ManyToManyField(Performance, blank=True)


class Player(models.Model):
    """
    Stores information about a player
    """
    name = models.CharField(max_length=100)
    seasons = models.ManyToManyField(Season, blank=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    """
    Stores additional information about User's team.
    A User can have multiple teams in multiple leagues
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)
    admin = models.BooleanField(default=False)
    history = models.TextField(blank=True, null=True)
    players = models.ManyToManyField(Player, through="Roster", blank=True)

    class Meta:
        ordering = ("date_joined",)
        auto_created = True


class Roster(models.Model):
    """
    Stores information about a specific instance of Player in a Team
    """
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    price_paid = models.IntegerField(blank=True)
    date_added = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    date_sold = models.DateField(blank=True, null=True)
