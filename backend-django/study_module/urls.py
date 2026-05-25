from django.urls import path

from .views import (
    add_note,
    get_notes,
    upload_pdf,
    generate_note_quiz,
    get_quiz_for_note,
    add_expense,
    get_expenses,
    expense_analytics,
)

urlpatterns = [
    # Study Note routes
    path('add/', add_note),
    path('all/', get_notes),
    path('upload-pdf/', upload_pdf),

    # Quiz routes
    path('generate-quiz/', generate_note_quiz),
    path('quiz/<int:note_id>/', get_quiz_for_note),

    # Expense routes
    path('expense/add/', add_expense),
    path('expense/all/', get_expenses),
    path('expense/analytics/', expense_analytics),
]