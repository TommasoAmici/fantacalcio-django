from django.urls import path
from django.conf.urls import url, include
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    # Wire up our API using automatic URL routing.
    # Additionally, we include login URLs for the browsable API.
    # path("api-auth/", include("rest_framework.urls")),
    path("users/", views.UserList.as_view()),
    path("users/<int:pk>", views.UserDetail.as_view()),
    path("leagues/", views.LeagueList.as_view()),
    path("leagues/<uuid:pk>", views.LeagueDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
