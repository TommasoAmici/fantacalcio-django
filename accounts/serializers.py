from django.contrib.auth.models import User
from rest_framework import serializers
from accounts.models import League, Membership


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


class LeagueSerializer(serializers.ModelSerializer):
    founder = serializers.ReadOnlyField(source="founder.username")
    
    def create(self, validated_data):
        try:
            members_data = validated_data.pop('members')
        except:
            members_data = None
        league = League.objects.create(**validated_data)

        if members_data:
            for member in members_data:
                member, created = User.objects.get_or_create(username=member.username)
                league.members.add(member)
            league.save()
        
        return league

    def update(self, instance, validated_data):
        members_data = validated_data.pop('members')
        instance.founder = validated_data.get('founder', instance.founder)
        instance.created = validated_data.get('created', instance.created)
        instance.name = validated_data.get('name', instance.name)

        for member in members_data:
            member, created = User.objects.get_or_create(username=member.username)
            instance.members.add(member)

        instance.save()
        return instance           

    class Meta:
        model = League
        fields = ("url", "name", "created", "id", "founder", "members")
