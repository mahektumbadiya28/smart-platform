from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Smart Platform Backend Running 🚀"
    })