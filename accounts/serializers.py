from django.contrib.auth.models import User
from rest_framework import serializers
from accounts.models import League


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # leagues User is in
    leagues = serializers.HyperlinkedRelatedField(
        many=True, queryset=League.objects.all(), allow_null=True, view_name='league-detail'
    )

    # leagues User created
    founded = serializers.HyperlinkedRelatedField(
        many=True, queryset=League.objects.all(), allow_null=True, view_name='league-detail'
    )

    class Meta:
        model = User
        fields = ("url", "username", "email", "leagues", "founded")


class LeagueSerializer(serializers.HyperlinkedModelSerializer):
    founder = serializers.ReadOnlyField(source="founder.username")

    class Meta:
        model = League
        fields = ("url", "name", "created", "id", "founder", "members")
