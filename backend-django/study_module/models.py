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
