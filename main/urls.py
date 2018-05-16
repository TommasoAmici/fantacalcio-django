from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('new_league/', views.new_league, name='new_league'),
    path('', views.home, name='home'),
]
