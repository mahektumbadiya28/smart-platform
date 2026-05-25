# Smart Platform 🚀

An AI-powered productivity and analytics platform built using:

- Django REST Framework
- React
- JWT Authentication
- AI Summary Generator
- MongoDB (future integration)
- Data Analytics

---

# 📁 Project Structure

```text
smart-platform/
│
├── backend-django/
│   ├── authentication/
│   ├── study_module/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
├── README.md
└── .gitignore
```

---

# ⚙️ Backend Setup

## Create Virtual Environment

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## Install Packages

```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install djangorestframework-simplejwt
pip install sumy
```

---

# 🚀 Create Django Project

```bash
django-admin startproject core .
```

---

# 📦 Create Apps

```bash
python manage.py startapp authentication
python manage.py startapp study_module
```

---

# 🔐 JWT Authentication Setup

## settings.py

```python
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    'authentication',
    'study_module',
]
```

---

## Enable CORS

```python
CORS_ALLOW_ALL_ORIGINS = True
```

---

## JWT Config

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

---

# 👤 Custom User Model

## authentication/models.py

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
```

---

## settings.py

```python
AUTH_USER_MODEL = 'authentication.User'
```

---

# 🔑 Authentication APIs

## Register Serializer

```python
from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user
```

---

# 📘 Study Note Model

## study_module/models.py

```python
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

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title
```

---

# 🤖 AI Summary Generator

## study_module/ai_summary.py

```python
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer


def generate_summary(text):

    parser = PlaintextParser.from_string(
        text,
        Tokenizer("english")
    )

    summarizer = LsaSummarizer()

    summary = summarizer(
        parser.document,
        2
    )

    final_summary = ""

    for sentence in summary:
        final_summary += str(sentence) + " "

    return final_summary
```

---

# 📡 Study Module APIs

## study_module/views.py

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import StudyNote
from .ai_summary import generate_summary


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
```

---

# ⚛️ Frontend Setup

## Install Packages

```bash
npm install
npm install react-router-dom axios react-icons
```

---

# 🔐 Protected Route

## src/components/ProtectedRoute.jsx

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
```

---

# 🌐 API Setup

## src/services/api.js

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default API;
```

---

# 📘 Study Helper Frontend

## Features

- Add notes
- Generate AI summaries
- Fetch notes
- JWT protected APIs
- Responsive UI

---

# ▶️ Run Backend

```bash
cd backend-django
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

# ▶️ Run Frontend

```bash
cd frontend-react
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🚀 Current Features

✅ JWT Authentication
✅ Protected Routes
✅ Professional Dashboard
✅ Smart Study Helper
✅ AI Summary Generator
✅ React + Django Integration

---

# 🔥 Future Features

- PDF Upload
- Quiz Generator
- Expense Analytics
- Charts Dashboard
- ML Predictions
- MongoDB Integration
- Deployment

---

# 🧠 Tech Stack

## Frontend
- React
- React Router
- Axios
- React Icons

## Backend
- Django
- Django REST Framework
- JWT Authentication

## AI & NLP
- Sumy
- NLP Summarization

## Database
- SQLite (current)
- MongoDB (future)

---

# 📌 Git Commands

## Save Progress

```bash
git add .
git commit -m "Updated project"
git push
```

---

# 🎯 Final Goal

Build a complete AI-powered productivity platform with:

- Study tools
- Analytics
- Smart scheduling
- AI features
- Full-stack architecture

