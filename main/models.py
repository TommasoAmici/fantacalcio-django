from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from autoslug import AutoSlugField
import uuid


# Create your models here.


class User(AbstractUser):
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)


class League(models.Model):
    """
    Users can create and join leagues to play several competitions.
    """
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="leagues_created",
        on_delete=models.CASCADE,
        null=True,
    )
    access_code = models.UUIDField(default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="league_logos/", null=True, blank=True)
    slug = AutoSlugField(populate_from="name", unique=True)
    teams = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="leagues", through="Team", blank=True
    )
    competitions = models.ManyToManyField("Competition", blank=True)

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return self.name


class Team(models.Model):
    """
    Stores additional information about User's team.
    A User can have multiple teams in multiple leagues
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="teams", on_delete=models.CASCADE
    )
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    slug = AutoSlugField(populate_from="name", unique=True)
    date_joined = models.DateField(auto_now_add=True)
    admin = models.BooleanField(default=False)
    history = models.TextField(blank=True, null=True)
    players = models.ManyToManyField(
        "Player", related_name="players_of", through="Roster", blank=True
    )
    logo = models.ImageField(upload_to="team_logos/", null=True, blank=True)

    class Meta:
        ordering = ("date_joined",)


class Competition(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(
        upload_to="competition_logos/", null=True, blank=True)
    teams = models.ManyToManyField(Team, blank=True)
    num_matches = models.PositiveSmallIntegerField()
    first_matchday = models.PositiveSmallIntegerField()
    last_matchday = models.PositiveSmallIntegerField()
    bonus_values = models.ManyToManyField(
        "Bonus", through="BonusValue", blank=True)
    setup = models.CharField(max_length=100, default="regular_season")


# TO DO: design competitions


class Performance(models.Model):
    """
    Stores information about a player's performance
    """
    vote = models.PositiveSmallIntegerField(default=6)
    bonuses = models.ManyToManyField("Bonus", blank=True)
    fantavote = models.SmallIntegerField(default=6)
    against_team_irl = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    matchday = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ("-matchday",)


class Bonus(models.Model):
    """
    Goal, assist, etc.
    The value of each bonus can be customized in each league.
    """
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class BonusValue(models.Model):
    """
    Allows each competition to customize bonuses
    """
    bonus = models.ForeignKey(Bonus, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    value = models.SmallIntegerField(blank=True)


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
    player = models.ForeignKey(
        "Player", related_name="seasons", on_delete=models.CASCADE, null=True
    )
    roles = models.ManyToManyField(Role, related_name="roles_of", blank=True)
    team_irl = models.CharField(max_length=100)
    price = models.SmallIntegerField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    performances = models.ManyToManyField(
        Performance, related_name="performances_of", blank=True
    )

    class Meta:
        ordering = ("-date",)


class Player(models.Model):
    """
    Stores information about a player
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def current_season(self):
        return Season.objects.filter(player=self).order_by("date")[0]


class Roster(models.Model):
    """
    Stores additional information about instances of Player in a Team
    """
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    price_paid = models.PositiveSmallIntegerField(blank=True)
    date_added = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    date_sold = models.DateField(blank=True, null=True)
