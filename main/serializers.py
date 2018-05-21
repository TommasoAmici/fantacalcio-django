from rest_framework import serializers
from main.models import (League, Team, Player, Role, Season, Roster, Performance, Bonus)
from django.contrib.auth import get_user_model
import datetime


User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for User model
    """
    # leagues User is in
    leagues = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=League.objects.all(),
        allow_null=True,
        view_name="league-detail",
    )
    teams = serializers.HyperlinkedRelatedField(
        many=True, queryset=Team.objects.all(), allow_null=True, view_name="team-detail"
    )

    class Meta:
        model = User
        fields = ("url", "username", "email", "avatar", "leagues", "teams")


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for Team model in main.models
    """
    user = UserSerializer(required=True)

    class Meta:
        model = Team
        fields = ("user", "url", "name", "date_joined", "admin", "history")


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
    performances = PerformanceSerializer(many=True, read_only=True, required=False)
    roles = RoleSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = Season
        fields = ("player", "roles", "team_irl", "price", "date", "performances")


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


class TeamDetailSerializer(serializers.HyperlinkedModelSerializer):
    """
    Detailed serializer for Team model in main.models
    """
    players = RosterSerializer(source="roster_set", many=True)

    class Meta:
        model = Team
        fields = ("url", "name", "date_joined", "admin", "history", "players", "logo")


class LeagueSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for League model in main.models
    """
    creator = serializers.ReadOnlyField(source="creator.username")

    class Meta:
        model = League
        fields = ("url", "name", "creator", "created")


class LeagueDetailSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for detailed League model in main.models
    """
    creator = serializers.ReadOnlyField(source="creator.username")
    teams = TeamDetailSerializer(source="team_set", many=True)

    class Meta:
        model = League
        fields = ("url", "name", "creator", "created", "access_code", "teams")


class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for detailed User model
    """
    # leagues User is in
    leagues = LeagueSerializer(many=True, read_only=True, required=False)
    teams = TeamDetailSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = User
        fields = ("url", "username", "email", "avatar", "leagues", "teams")


def calc_current_season():
    """
    Considering a season starting in August-ish and finishing in May-ish
    """
    d = datetime.date.today()
    if d.month >= 7:
        return d.year + 1

    else:
        return d.year
