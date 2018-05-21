# Create your views here.
from django.conf import settings
from rest_framework import permissions, serializers, viewsets
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import detail_route
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
        league = self.get_object()
        teams = Team.objects.filter(league=league)
        teams_json = TeamDetailSerializer(
            teams, many=True, context={"request": request}
        )
        return Response(teams_json.data)


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


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


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
        year = self.request.query_params.get('year', None)
        players_pk = self.kwargs['players_pk']
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
