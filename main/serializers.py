from rest_framework import serializers
from django.shortcuts import get_object_or_404
from main.models import (
    League, Membership, Team, Player, Role, Season, Roster, RosterPlayer, Performance, Bonus
)
from django.db.models import Q
from django.contrib.auth import get_user_model
import datetime


User = get_user_model()


class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model in main.models
    """

    class Meta:
        model = Team
        fields = ("id", "name", "date_joined",
                  "admin", "history", "slug", "logo")


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """
    teams = TeamSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = User
        fields = ("id", "username", "avatar", "teams")


class LeagueSerializer(serializers.ModelSerializer):
    """
    Serializer for League model in main.models
    """
    creator = UserSerializer(required=False)
    users = UserSerializer(many=True, required=False)

    class Meta:
        model = League
        fields = ("access_code", "name", "creator", "created", "users")

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        league = League.objects.create(
            name=validated_data["name"], creator=user)
        Membership.objects.create(user=user, league=league)
        return (league)


class RoleSerializer(serializers.ModelSerializer):
    """
    Serializer for Role model in main.models
    """

    class Meta:
        model = Role
        fields = ("role", "mantra")


class BonusSerializer(serializers.ModelSerializer):
    """
    Serializer for Bonus model in main.models
    """

    class Meta:
        model = Bonus
        fields = ("name",)


class PerformanceSerializer(serializers.ModelSerializer):
    """
    Serializer for Performance model in main.models
    """
    bonuses = BonusSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Performance
        fields = (
            "id", "vote", "bonuses", "fantavote", "against_team_irl", "date", "matchday"
        )


class SeasonSerializer(serializers.ModelSerializer):
    """
    Serializer for Season model in main.models
    """
    performances = PerformanceSerializer(
        many=True, read_only=True, required=False)
    roles = RoleSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Season
        fields = ("player", "roles", "team_irl",
                  "price", "date", "performances")


class PlayerSerializer(serializers.ModelSerializer):
    """
    Serializer for Player model in main.models
    """
    seasons = SeasonSerializer(many=True, required=False)

    class Meta:
        model = Player
        fields = ("id", "name", "seasons")


class PlayerCurrentSeasonSerializer(serializers.ModelSerializer):
    """
    Serializer for Player model in main.models
    """
    current_season = SeasonSerializer()

    class Meta:
        model = Player
        fields = ("id", "name", "current_season")


class RosterPlayerSerializer(serializers.ModelSerializer):
    """
    Serializer for Roster model in main.models
    """
    player = PlayerCurrentSeasonSerializer(required=True)

    class Meta:
        model = RosterPlayer
        fields = ("player", "price_paid", "date_added", "active", "date_sold")


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for detailed User model
    """
    # leagues User is in
    leagues = LeagueSerializer(
        source="league_set", many=True, read_only=True, required=False)
    teams = TeamSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = User
        fields = ("id", "username", "email", "avatar", "leagues", "teams")


def calc_current_season():
    """
    Considering a season starting in August-ish and finishing in May-ish
    """
    d = datetime.date.today()
    if d.month >= 7:
        return d.year + 1

    else:
        return d.year
