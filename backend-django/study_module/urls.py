from django.urls import path
from .views import add_note, get_notes

urlpatterns = [
    path('add/', add_note),

    path('all/', get_notes),
]