# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions, serializers
from .models import League
from .serializers import LeagueSerializer, UserSerializer
from .permissions import IsOwnerOrReadOnly


class LeagueList(generics.ListCreateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LeagueUserList(generics.ListAPIView):
    serializer_class = LeagueSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        """
        This view should return a list of all the leagues
        for the currently authenticated user.
        """
        user = self.request.user
        return League.objects.filter(users=user)


class LeagueUserFromURLList(generics.ListAPIView):
    serializer_class = LeagueSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        """
        This view should return a list of all the leagues
        the user as determined by the username portion of the URL.
        """
        username = self.kwargs["username"]
        return League.objects.filter(users__username=username)


class LeagueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsOwnerOrReadOnly,)
