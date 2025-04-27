from datetime import datetime
from django.shortcuts import render
from django.conf  import settings
from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .models import Lesson, StudioEvent
import json
import os
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

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
        response = JsonResponse({ "success": False, "message": "Invalid request method" })
        response.status_code = 404
        return response

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
        return response
        
    if not req.user.is_authenticated:
        response = JsonResponse({ "success": False, "message": "User not authenticated" })
        response.status_code = 401
        return response
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        lesson_day_of_week = str(lesson.date)
        current_day_of_week = datetime.now().strftime("%A")
        lesson_hour_in_military = int(lesson.startTime.split(":")[0]) + 12 if "pm" in lesson.startTime else int(lesson.startTime.split(":")[0])
        current_hour_in_military = int(datetime.now().strftime("%H"))
        if lesson_day_of_week == current_day_of_week and lesson_hour_in_military - current_hour_in_military < 2 and lesson_hour_in_military - current_hour_in_military > 0:
            return HttpResponseBadRequest("Cannot cancel a lesson within 2 hours of the start time")

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
        response = JsonResponse({ "success": False, "message": "Invalid request method" })
        response.status_code = 404
        return response
    
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


@csrf_exempt
def add_studio_event(req):
    if not req.method == "POST":
        response = JsonResponse({ "success": False, "message": "Invalid request method" })
        response.status_code = 404
        return response
    data = json.loads(req.body)
    print(data)
    if not data["title"] or not data["start"]:
        return HttpResponseBadRequest("Missing required fields")
    studio_event = StudioEvent(name = data["title"],
        start = data["start"],
        end = data["end"],
        allDay = data["allDay"]
    )
    studio_event.save()
    response = HttpResponse("Studio event added successfully")
    response.status_code = 201
    return response


def get_studio_events(req):
    if not req.method == "GET":
        response = JsonResponse({ "success": False, "message": "Invalid request method" })
        response.status_code = 404
        return response
    
    studio_events = StudioEvent.objects.all()
    studio_events_list = []
    for studio_event in studio_events:
        studio_events_list.append({
            "id": studio_event.id,
            "title": studio_event.name,
            "start": studio_event.start,
            "end": studio_event.end,
            "allDay": studio_event.allDay
        })
    return JsonResponse(studio_events_list, safe=False)
        