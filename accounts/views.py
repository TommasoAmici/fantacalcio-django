# Create your views here.
from django.contrib.auth.models import User
from rest_framework import permissions, serializers, viewsets
from .models import League
from .serializers import LeagueSerializer, UserSerializer
from .custom_permissions import IsOwnerOrReadOnly


class LeagueViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
