# Create your views here.
from django.shortcuts import render, get_object_or_404, redirect
from django.conf import settings
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.auth import logout, login
from . forms import UserCreateForm


# Handle Telegram login
# https://github.com/dmytrostriletskyi/django-telegram-login

from django_telegram_login.widgets.constants import (
    SMALL,
    MEDIUM,
    LARGE,
    DISABLE_USER_PHOTO,
)
from django_telegram_login.widgets.generator import (
    create_callback_login_widget,
    create_redirect_login_widget,
)
from django_telegram_login.authentication import verify_telegram_authentication
from django_telegram_login.errors import (
    NotTelegramDataError,
    TelegramDataIsOutdatedError,
)

bot_name = settings.TELEGRAM_BOT_NAME
bot_token = settings.TELEGRAM_BOT_TOKEN
redirect_url = settings.TELEGRAM_LOGIN_REDIRECT_URL

from django_telegram_login.authentication import verify_telegram_authentication
from django_telegram_login.errors import (
    NotTelegramDataError,
    TelegramDataIsOutdatedError,
)


# handle login
def login_view(request):
    if request.method == 'POST':
        submitted = str(request.POST)
        print(submitted)
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('main:home')

    else:
        form = AuthenticationForm()
    # pass telegram widget to template
    telegram_login_widget = create_callback_login_widget(bot_name, size=MEDIUM)
    data = {
        'form': form,
        'telegram_login_widget': telegram_login_widget
    }

    return render(request, 'accounts/login.html', data)


# handle sign up
def signup_view(request):
    submitted = ""
    new_user = None

    if request.method == 'POST':
        submitted = str(request.POST)
        form = UserCreateForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user)
            return redirect('main:home')

    else:
        form = UserCreateForm()

    data = {
        'form': form,
        'submitted': submitted,
        'new_user': new_user,
    }

    return render(request, 'accounts/signup.html', data)


def logout_view(request):
    logout(request)
    return render(request, 'main/index.html', {})


def password_reset(request):
    return render(request, 'main/index.html', {})

