from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def home(request):
    return render(request, 'main/home.html')


# Create your views here.
def new_league(request):
    return render(request, 'main/new_league.html', {})