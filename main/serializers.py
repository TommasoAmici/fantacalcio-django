from django.contrib.auth.models import User
from rest_framework import serializers
from main.models import League, Team, Player, Role, Season, Roster, Performance, Bonus
import datetime


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

    # leagues User created
    founded = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=League.objects.all(),
        allow_null=True,
        view_name="league-detail",
        lookup_field="slug",
        lookup_url_kwarg="slug",
    )

    class Meta:
        model = User
        fields = ("url", "username", "email", "leagues", "founded")


class LeagueSerializer(serializers.ModelSerializer):
    """
    Serializer for League model in main.models
    """
    founder = serializers.ReadOnlyField(source="founder.username")

    def create(self, validated_data):
        try:
            teams_data = validated_data.pop("teams")
        except:
            teams_data = None
        league = League.objects.create(**validated_data)

        if teams_data:
            for team in teams_data:
                team, created = User.objects.get_or_create(username=team.username)
                league.teams.add(team)
            league.save()

        return league

    def update(self, instance, validated_data):
        teams_data = validated_data.pop("teams")
        instance.founder = validated_data.get("founder", instance.founder)
        instance.created = validated_data.get("created", instance.created)
        instance.name = validated_data.get("name", instance.name)
        instance.slug = validated_data.get("slug", instance.slug)

        for team in teams_data:
            team, created = User.objects.get_or_create(username=team.username)
            instance.teams.add(team)

        instance.save()
        return instance

    class Meta:
        model = League
        fields = ("url", "name", "created", "id", "founder", "teams", "slug")
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
                season, created = Season.objects.get(player=player, date__year=calc_current_season())
                team.players.add(season)
            team.save()

        return team

    class Meta:
        model = Team
        fields = ('user', 'name', 'league', 'date_joined', 'admin', 'history', 'players')


class RoleSerializer(serializers.ModelSerializer):
    """
    Serializer for Role model in main.models
    """
    class Meta:
        model = Role
        fields = ('role', 'mantra')


class SeasonSerializer(serializers.ModelSerializer):
    """
    Serializer for Season model in main.models
    """
    player = serializers.ReadOnlyField(source="player.name", read_only=True)
    date = serializers.DateField(format="%Y", read_only=True)
    
    class Meta:
        model = Season
        fields = ('player', 'roles', 'team_irl', 'price', 'date', 'performances')


class PlayerSerializer(serializers.ModelSerializer):
    """
    Serializer for Player model in main.models
    """
    class Meta:
        model = Player
        fields = ('name', 'seasons')


class RosterSerializer(serializers.ModelSerializer):
    """
    Serializer for Roster model in main.models
    """
    class Meta:
        model = Roster
        fields = ('player', 'price_paid', 'date_added', 'active', 'date_sold')