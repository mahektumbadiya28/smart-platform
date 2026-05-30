from rest_framework import serializers

from .models import StudySchedule

class StudyScheduleSerializer(

    serializers.ModelSerializer
):

    class Meta:

        model = StudySchedule

        fields = '__all__'