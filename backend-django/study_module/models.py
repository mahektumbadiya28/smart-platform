from django.db import models
from authentication.models import User


class StudyNote(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=200)

    content = models.TextField()

    summary = models.TextField(
        blank=True,
        null=True
    )

    pdf_file = models.FileField(
        upload_to='pdfs/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Quiz(models.Model):

    note = models.ForeignKey(
        StudyNote,
        on_delete=models.CASCADE
    )

    question = models.TextField()

    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)

    answer = models.CharField(max_length=200)

    def __str__(self):
        return self.question


class Expense(models.Model):

    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Travel', 'Travel'),
        ('Shopping', 'Shopping'),
        ('Education', 'Education'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=200)

    amount = models.FloatField()

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title

class Profile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    full_name = models.CharField(
        max_length=200
    )

    bio = models.TextField(
        blank=True
    )

    college = models.CharField(
        max_length=200,
        blank=True
    )

    skills = models.TextField(
        blank=True
    )

    profile_image = models.URLField(
        blank=True
    )

    def __str__(self):
        return self.user.username

class StudyRecommendation(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    recommendation = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.user.username

class StudySchedule(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    study_date = models.DateField()

    start_time = models.TimeField()

    end_time = models.TimeField()

    completed = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title

class StudySession(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    start_time = models.DateTimeField()

    end_time = models.DateTimeField()

    duration = models.DurationField()

    completed = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"Session - {self.start_time}"   

