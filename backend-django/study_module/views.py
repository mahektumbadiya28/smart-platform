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

    total_expense = sum(
        expense.amount
        for expense in Expense.objects.filter(user=request.user)
    )

    category_data = (
        Expense.objects
        .filter(user=request.user)
        .values('category')
        .annotate(total=Count('category'))
    )

    return Response({
        "total_expense": total_expense,
        "category_data": list(category_data)
    })