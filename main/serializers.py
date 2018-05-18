from django.contrib.auth.models import User
from rest_framework import serializers
from main.models import League, Membership


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # leagues User is in
    leagues = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=League.objects.all(),
        allow_null=True,
        view_name="league-detail",
    )

    # leagues User created
    founded = serializers.HyperlinkedRelatedField(
        many=True,
        queryset=League.objects.all(),
        allow_null=True,
        view_name="league-detail",
    )

    class Meta:
        model = User
        fields = ("url", "username", "email", "leagues", "founded")


class LeagueSerializer(serializers.ModelSerializer):
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

        for team in teams_data:
            team, created = User.objects.get_or_create(username=team.username)
            instance.teams.add(team)

        instance.save()
        return instance

    class Meta:
        model = League
        fields = ("url", "name", "created", "id", "founder", "teams")
