from django.shortcuts import render
from django.conf  import settings
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .models import Lesson
import json
import os
from django.contrib.auth.decorators import login_required

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)


@login_required
def book_lesson(req):
    if  not req.method == "POST":
        return redirect("/not-found")
    data = json.loads(req.body)
    print(data)
    if not data["startTime"] or not data["date"] or not data["duration"]:
        return HttpResponseBadRequest("Missing required fields")
    lesson = Lesson(name = req.user.first_name,
        startTime = data["startTime"],
        date = data["date"],
        duration = data["duration"],
        user = req.user
    )
    takenLesson = Lesson.objects.filter(
        date = lesson.date,
        startTime = lesson.startTime
    )
    if takenLesson.exists():
        return HttpResponseBadRequest("Lesson already booked")

    lesson.save()
    response = HttpResponse("Lesson booked successfully")
    response.status_code = 201
    return response


@login_required
def cancel_lesson(req, lesson_id):
    if not req.method == "DELETE":
        response = JsonResponse({ "success": False, "message": "Invalid request method" })
        response.status_code = 400
        
    if not req.user.is_authenticated:
        response = JsonResponse({ "success": False, "message": "User not authenticated" })
        response.status_code = 401
        return response
    try:
        print(lesson_id)
        lesson = Lesson.objects.get(id=lesson_id)
        lesson.delete()
    except Lesson.DoesNotExist:
        return HttpResponseBadRequest("Lesson not found")
    response = HttpResponse("Lesson cancelled successfully")
    response.status_code = 200
    return response

@login_required
def get_account(req):
    if not req.method == "GET":
        response = JsonResponse({ "success": False, "message": "Invalid request method" })
        response.status_code = 404
        return response
    
    if not req.user.is_authenticated:
        response = JsonResponse({ "success": False, "message": "User not authenticated" })
        response.status_code = 401
        return response
    

    user = {
        "first_name": req.user.first_name,
        "last_name": req.user.last_name,
        "email": req.user.email,
        "username": req.user.username,
    }

    return JsonResponse({ "success": True ,"user": user})

@login_required
def get_lessons(req):
    if not req.method == "GET":
        return redirect("/not-found")
    
    if not req.user.is_authenticated:
        return redirect("/login")

    lessons = Lesson.objects.filter(user=req.user)
    lessons_list = []
    for lesson in lessons:
        lessons_list.append({
            "id": lesson.id,
            "name": lesson.name,
            "startTime": lesson.startTime,
            "date": lesson.date,
            "duration": lesson.duration,
            "price": lesson.price
        })
    return JsonResponse(lessons_list, safe=False)
        