from rest_framework import serializers
from django.shortcuts import get_object_or_404
from main.models import (League, Team, Player, Role,
                         Season, Roster, Performance, Bonus)
from django.contrib.auth import get_user_model
import datetime


User = get_user_model()


class LeagueSerializer(serializers.ModelSerializer):
    """
    Serializer for League model in main.models
    """
    creator = serializers.ReadOnlyField(source="creator.username")

    class Meta:
        model = League
        fields = ("id", "name", "creator", "created")


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """
    # leagues User is in
    leagues = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=League.objects.all(),
        allow_null=True,
    )
    leagues_created = LeagueSerializer(many=True)
    teams = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Team.objects.all(), allow_null=True
    )

    class Meta:
        model = User
        fields = ("id", "username", "email", "avatar",
                  "leagues", "teams", "leagues_created")


class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model in main.models
    """
    user = UserSerializer(required=True)

    class Meta:
        model = Team
        fields = ("user", "id", "name", "date_joined", "admin", "history")


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


class RosterSerializer(serializers.ModelSerializer):
    """
    Serializer for Roster model in main.models
    """
    player = PlayerCurrentSeasonSerializer(required=True)

    class Meta:
        model = Roster
        fields = ("player", "price_paid", "date_added", "active", "date_sold")


class TeamDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for Team model in main.models
    """
    players = RosterSerializer(source="roster_set", many=True)
    access_code = serializers.ReadOnlyField(source="league.access_code")

    class Meta:
        model = Team
        fields = ("id", "name", "date_joined", "admin",
                  "history", "players", "logo", "access_code")

    def create(self, validated_data):
        print(validated_data)
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        access_code = validated_data.pop("access_code")
        league = League.objects.get(access_code=access_code)
        return Team.objects.create(user=user, league=league, **validated_data)


class LeagueDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for detailed League model in main.models
    """
    creator = serializers.ReadOnlyField(source="creator.username")
    teams = TeamDetailSerializer(source="team_set", many=True)

    class Meta:
        model = League
        fields = ("id", "name", "creator", "created", "access_code", "teams")

    def create(self, validated_data):
        """
        POST to create league, requires 'teams' (can be blank)
        e.g. {'name': 'name of the league', 'teams': []}
        """
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        return League.objects.create(name=validated_data["name"], creator=user)


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for detailed User model
    """
    # leagues User is in
    leagues = LeagueSerializer(many=True, read_only=True, required=False)
    teams = TeamDetailSerializer(many=True, read_only=True, required=False)

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
