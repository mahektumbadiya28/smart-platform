from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import status

from .models import StudyNote
from .serializers import StudyNoteSerializer
from .ai_summary import generate_summary

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_note(request):

#     serializer = StudyNoteSerializer(data=request.data)

#     if serializer.is_valid():

#         serializer.save(user=request.user)

#         return Response({
#             "message": "Note Added Successfully"
#         })

#     return Response(serializer.errors)

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