"""fantacalcio URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title='Fantacalcio API')

urlpatterns = [
    path('', include('accounts.urls')),
    path('admin/', admin.site.urls),
    path('schema/', schema_view)
]
