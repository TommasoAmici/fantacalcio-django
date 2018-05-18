from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import refresh_jwt_token


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"leagues", views.LeagueViewSet)
router.register(r"users", views.UserViewSet)

urlpatterns = [
    # urls to handle authentication of users
    # https://michaelwashburnjr.com/django-user-authentication/
    path("", include("rest_auth.urls")),
    path("register/", include("rest_auth.registration.urls")),
    path("refresh-token/", refresh_jwt_token),
]

urlpatterns += router.urls
