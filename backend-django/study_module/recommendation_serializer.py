from rest_framework import serializers

from .models import (
    StudyRecommendation
)

class RecommendationSerializer(

    serializers.ModelSerializer
):

    class Meta:

        model = StudyRecommendation

        fields = '__all__'