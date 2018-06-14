# Create your views here.
from django.conf import settings
from rest_framework import permissions, serializers, viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import League, Role, Player, Season, Performance, Team, Membership
from .serializers import (
    LeagueSerializer,
    UserSerializer,
    RoleSerializer,
    PlayerSerializer,
    SeasonSerializer,
    PerformanceSerializer,
    TeamSerializer,
    UserDetailSerializer,
)
from .custom_permissions import IsOwnerOrReadOnly


User = get_user_model()


class LeagueViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def update(self, request, *args, **kwargs):
        league = self.get_object()
        league.name = request.data["name"]
        league.save()
        return Response(LeagueSerializer(league).data)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return League.objects.all()

        else:
            return League.objects.filter(
                Q(users__username=self.request.user.username)
                | Q(creator=self.request.user)
            ).distinct()


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
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
        return Response(data)


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)
    queryset = Team.objects.all()

    def create(self, request):
        print(request.data)
        user = User.objects.get(pk=request.data["pk"])
        league = League.objects.get(access_code=request.data["access_code"])
        membership = Membership.objects.get(user=user, league=league)
        # remove headers from base64
        try:
            logo = request.data["logo"].split("base64,")[1]
        except:
            logo = None
        try:
            history = request.data["history"]
        except:
            history = None
        team = Team.objects.create(
            name=request.data["name"],
            history=history,
            logo=logo,
        )
        membership.teams.add(team)
        return Response(TeamSerializer(team).data)


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
