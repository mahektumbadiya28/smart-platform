from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from .models import StudyNote, Expense, Quiz
from .serializers import StudyNoteSerializer
from .expense_serializers import ExpenseSerializer
from .quiz_serializers import QuizSerializer
from .ai_summary import generate_summary
from .pdf_utils import extract_text_from_pdf
from .quiz_generator import generate_quiz
from .models import Profile
from .profile_serializers import (ProfileSerializer)
from django.db.models import Sum
from openai import OpenAI
import os
from .models import (StudyRecommendation)
from .recommendation_serializer import (RecommendationSerializer)
client = OpenAI(
    api_key=os.getenv(
        "OPENAI_API_KEY"
    )
)
from .models import StudySchedule

from .schedule_serializer import (
    StudyScheduleSerializer
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_note(request):

    title = request.data.get("title")
    content = request.data.get("content")
    ai_summary = generate_summary(content)

    note = StudyNote.objects.create(
        user=request.user,
        title=title,
        content=content,
        summary=ai_summary
    )

    return Response({
        "message": "Note Added Successfully",
        "summary": ai_summary
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):

    notes = StudyNote.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = StudyNoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_pdf(request):

    title = request.data.get("title")
    pdf_file = request.FILES.get("pdf")
    extracted_text = extract_text_from_pdf(pdf_file)
    ai_summary = generate_summary(extracted_text)

    note = StudyNote.objects.create(
        user=request.user,
        title=title,
        content=extracted_text,
        summary=ai_summary,
        pdf_file=pdf_file
    )

    return Response({
        "message": "PDF Uploaded Successfully",
        "summary": ai_summary
    })


# ─── Quiz Views ────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_note_quiz(request):

    note_id = request.data.get("note_id")

    try:
        note = StudyNote.objects.get(
            id=note_id,
            user=request.user
        )
    except StudyNote.DoesNotExist:
        return Response({"error": "Note not found"}, status=404)

    generated_quiz = generate_quiz(note.content)

    if not generated_quiz:
        return Response({"error": "Not enough content to generate quiz. Add more text to your note."}, status=400)

    saved_quiz = []

    for item in generated_quiz:
        quiz = Quiz.objects.create(
            note=note,
            question=item['question'],
            option1=item['options'][0],
            option2=item['options'][1],
            option3=item['options'][2],
            option4=item['options'][3],
            answer=item['answer']
        )
        saved_quiz.append(quiz)

    serializer = QuizSerializer(saved_quiz, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_for_note(request, note_id):

    quizzes = Quiz.objects.filter(note__id=note_id, note__user=request.user)
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data)


# ─── Expense Views ─────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_expense(request):

    serializer = ExpenseSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"message": "Expense Added Successfully"})

    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_expenses(request):

    expenses = Expense.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def expense_analytics(request):

    expenses = Expense.objects.filter(
        user=request.user
    )

    total_expense = sum(
        expense.amount
        for expense in expenses
    )

    category_data = (
        expenses
        .values('category')
        .annotate(
            total=Sum('amount')
        )
    )

    monthly_data = (
        expenses
        .values('created_at__month')
        .annotate(
            total=Sum('amount')
        )
        .order_by('created_at__month')
    )

    return Response({

        "total_expense": total_expense,

        "category_data": list(category_data),

        "monthly_data": list(monthly_data)
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    serializer = ProfileSerializer(profile)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):

    profile, created = Profile.objects.get_or_create(
        user=request.user
    )

    serializer = ProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Profile Updated"
        })

    return Response(serializer.errors)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_chat(request):

    user_message = request.data.get(
        "message"
    )

    try:

        completion = client.chat.completions.create(

            model="gpt-4.1-mini",

            messages=[

                {
                    "role": "system",

                    "content": """
                    You are a smart AI assistant
                    for students and productivity.
                    """
                },

                {
                    "role": "user",

                    "content": user_message
                }
            ]
        )

        ai_response = (
            completion
            .choices[0]
            .message
            .content
        )

        return Response({
            "response": ai_response
        })

    except Exception as e:

        return Response({
            "error": str(e)
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_recommendation(request):

    user = request.user

    analytics_data = {

        "notes": 24,
        "quizzes": 10,
        "weak_subject": "Data Structures",
        "study_hours": 2,
    }

    prompt = f"""
    Generate smart study recommendations
    for this student:

    {analytics_data}

    Give:
    - weak topic improvement
    - study plan
    - revision strategy
    - productivity advice
    """

    completion = client.chat.completions.create(

        model="gpt-4.1-mini",

        messages=[
            {
                "role": "system",

                "content": """
                You are an AI learning mentor.
                """
            },

            {
                "role": "user",

                "content": prompt
            }
        ]
    )

    ai_response = (
        completion
        .choices[0]
        .message
        .content
    )

    recommendation = (
        StudyRecommendation.objects.create(

            user=user,

            recommendation=ai_response
        )
    )

    serializer = RecommendationSerializer(
        recommendation
    )

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_recommendations(request):

    recommendations = (
        StudyRecommendation.objects.filter(
            user=request.user
        ).order_by('-created_at')
    )

    serializer = RecommendationSerializer(
        recommendations,
        many=True
    )

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_schedules(request):

    schedules = (
        StudySchedule.objects.filter(
            user=request.user
        ).order_by('study_date')
    )

    serializer = StudyScheduleSerializer(
        schedules,
        many=True
    )

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_schedule(request):

    user = request.user

    prompt = """
    Generate a 5-day study schedule
    for a computer engineering student.

    Include:
    - study subject
    - revision
    - quizzes
    - break timing
    - productivity tips

    Format clearly.
    """

    completion = client.chat.completions.create(

        model="gpt-4.1-mini",

        messages=[

            {
                "role": "system",

                "content": """
                You are an AI study planner.
                """
            },

            {
                "role": "user",

                "content": prompt
            }
        ]
    )

    ai_schedule = (
        completion
        .choices[0]
        .message
        .content
    )

    schedule = StudySchedule.objects.create(

        user=user,

        title="AI Generated Study Plan",

        description=ai_schedule,

        study_date="2026-05-30",

        start_time="08:00",

        end_time="10:00"
    )

    serializer = StudyScheduleSerializer(
        schedule
    )

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def complete_schedule(request, id):

    schedule = StudySchedule.objects.get(
        id=id,
        user=request.user
    )

    schedule.completed = True

    schedule.save()

    return Response({
        "message": "Completed"
    })