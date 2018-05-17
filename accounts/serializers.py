from django.contrib.auth.models import User, Group
from rest_framework import serializers
from accounts.models import League


class UserSerializer(serializers.HyperlinkedModelSerializer):
    # leagues User is in
    leagues = serializers.PrimaryKeyRelatedField(
        many=True, queryset=League.objects.all(), allow_null=True
    )

    # leagues User created
    founded = serializers.PrimaryKeyRelatedField(
        many=True, queryset=League.objects.all(), allow_null=True
    )

    class Meta:
        model = User
        fields = ("username", "email", "leagues", "founded")


class LeagueSerializer(serializers.ModelSerializer):
    founder = serializers.ReadOnlyField(source="founder.username")

    class Meta:
        model = League
        fields = ("name", "created", "id", "founder", "members")
