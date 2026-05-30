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
    get_profile,
    update_profile,
    ai_chat,
    generate_recommendation,
    get_recommendations,
    get_schedules,
    generate_schedule,
    complete_schedule,
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
    path('profile/', get_profile),
    path('profile/update/', update_profile),
    path('ai-chat/', ai_chat),
    path('recommendations/generate/',generate_recommendation),
    path('recommendations/',get_recommendations),
    path('schedules/',get_schedules),

path('schedules/generate/',generate_schedule),
path('schedules/complete/<int:id>/',complete_schedule),
]