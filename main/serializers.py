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
        lookup_field="slug",
        lookup_url_kwarg="slug",
    )

    class Meta:
        model = User
        fields = ("id", "url", "username", "email", "avatar", "leagues")


class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model in main.models
    """

    def create(self, validated_data):
        try:
            players_data = validated_data.pop("players")
        except:
            players_data = None
        team = Team.objects.create(**validated_data)

        if players_data:
            for player in players_data:
                season, created = Season.objects.get(
                    player=player, date__year=calc_current_season()
                )
                team.players.add(season)
            team.save()

        return team

    class Meta:
        model = Team
        fields = (
            "user", "name", "league", "date_joined", "admin", "history", "players"
        )


class LeagueSerializer(serializers.ModelSerializer):
    """
    Serializer for League model in main.models
    """
    creator = serializers.ReadOnlyField(source="creator.username")
    teams = TeamSerializer(many=True, required=False)

    def create(self, validated_data):
        try:
            teams_data = validated_data.pop("teams")
        except:
            teams_data = None
        league = League.objects.create(**validated_data)

        if teams_data:
            for team in teams_data:
                Team.objects.create(
                    user=User.objects.get(id=team.user),
                    league=instance,
                    name=team.name,
                    admin=team.admin,
                    history=team.history,
                    players=team.players,
                    logo=team.logo
                )
            league.save()

        return league

    def update(self, instance, validated_data):
        teams_data = validated_data.pop("teams")
        instance.creator = validated_data.get("creator", instance.creator)
        instance.created = validated_data.get("created", instance.created)
        instance.name = validated_data.get("name", instance.name)
        instance.slug = validated_data.get("slug", instance.slug)

        for team in teams_data:
            print(team)
            Team.objects.create(
                user=User.objects.get(team.user),
                league=instance,
                name=team.name,
                admin=team.admin,
                history=team.history,
                players=team.players,
                logo=team.logo
            )

        instance.save()
        return instance

    class Meta:
        model = League
        fields = ("url", "name", "creator", "created", "access_code", "teams", "slug")
        lookup_field = "slug"
        extra_kwargs = {"url": {"lookup_field": "slug"}}


def calc_current_season():
    """
    Considering a season starting in August-ish and finishing in May-ish
    """
    d = datetime.date.today()
    if d.month >= 7:
        return d.year + 1

    else:
        return d.year


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

    class Meta:
        model = Player
        fields = ("id", "name", "seasons")


class RosterSerializer(serializers.ModelSerializer):
    """
    Serializer for Roster model in main.models
    """

    class Meta:
        model = Roster
        fields = ("player", "price_paid", "date_added", "active", "date_sold")
