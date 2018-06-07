# Create your views here.
from django.conf import settings
from rest_framework import permissions, serializers, viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import League, Role, Player, Season, Performance, Team
from .serializers import (
    LeagueSerializer,
    UserSerializer,
    RoleSerializer,
    PlayerSerializer,
    SeasonSerializer,
    PerformanceSerializer,
    TeamSerializer,
    UserDetailSerializer,
    LeagueDetailSerializer,
    TeamDetailSerializer,
)
from .custom_permissions import IsOwnerOrReadOnly
import operator
from functools import reduce


User = get_user_model()


class LeagueViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = League.objects.all()
    serializer_class = LeagueDetailSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    @detail_route()
    def teams(self, request, pk=None):
        print("ue")
        league = self.get_object()
        teams = Team.objects.filter(league=league)
        teams_json = TeamDetailSerializer(
            teams, many=True, context={"request": request}
        )
        return Response(teams_json.data)

    def update(self, request, *args, **kwargs):
        league = self.get_object()
        league.name = request.data["name"]
        league.save()
        return Response(LeagueDetailSerializer(league).data)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return League.objects.all()

        else:
            return League.objects.filter(
                Q(teams__username=self.request.user.username)
                | Q(creator=self.request.user)
            ).distinct()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return UserDetailSerializer

        else:
            return UserSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

        else:
            return User.objects.filter(id=self.request.user.id)

    def list(self, request):
        if self.request.user.is_superuser:
            queryset = User.objects.all()
        else:
            queryset = User.objects.filter(id=self.request.user.id)
        serializer = UserSerializer(queryset, many=True)
        data = serializer.data
        for d in data:
            # merge leagues created and leagues a user is in
            leagues_created = d.pop("leagues_created")
            leagues = d.pop("leagues")
            d["leagues"] = reduce(operator.concat, [leagues_created, leagues])
        return Response(data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        data = serializer.data
        # merge leagues created and leagues a user is in
        leagues_created = data.pop("leagues_created")
        leagues = data.pop("leagues")
        data["leagues"] = reduce(operator.concat, [leagues_created, leagues])
        return Response(data)


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamDetailSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Team.objects.all()

        else:
            return Team.objects.filter(user=self.request.user)


class RoleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = (permissions.IsAuthenticated,)


class PlayerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = (permissions.IsAuthenticated,)


class SeasonViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    serializer_class = SeasonSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Season.objects.all()
        year = self.request.query_params.get("year", None)
        players_pk = self.kwargs["players_pk"]
        if year is not None:
            queryset = queryset.filter(date__year=year)
        if players_pk:
            queryset = queryset.filter(player=players_pk)
        return queryset


class PerformanceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer
    permission_classes = (permissions.IsAuthenticated,)
