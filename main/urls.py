from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_nested import routers


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"leagues", views.LeagueViewSet)
router.register(r"users", views.UserViewSet)
router.register(r"teams", views.TeamViewSet)
router.register(r"roles", views.RoleViewSet)
router.register(r"players", views.PlayerViewSet, base_name='players')

# Nested routers for players
# /players/{id}/seasons/{id}/performances/{id}/
players_router = routers.NestedSimpleRouter(router, r"players", lookup="players")
players_router.register(r"seasons", views.SeasonViewSet, base_name="seasons")

seasons_router = routers.NestedSimpleRouter(
    players_router, r"seasons", lookup="seasons"
)
seasons_router.register(
    r"performances", views.PerformanceViewSet, base_name="performances"
)

urlpatterns = [
    # urls to handle authentication of users
    # https://michaelwashburnjr.com/django-user-authentication/
    path("", include("rest_auth.urls")),
    path("register/", include("rest_auth.registration.urls")),
    path("refresh-token/", refresh_jwt_token),
]

urlpatterns += router.urls
urlpatterns += players_router.urls
urlpatterns += seasons_router.urls
