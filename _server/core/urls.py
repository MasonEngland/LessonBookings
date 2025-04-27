from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('api/lessons/book/', view=views.book_lesson, name="book_lesson"),
    path('api/lessons/cancel/<int:lesson_id>/', view=views.cancel_lesson, name="cancel_lesson"),
    path('api/get_account/', view=views.get_account, name="get_account"),
    path('api/get_lessons/', view=views.get_lessons, name="get_lessons"),
    path('about/', view=views.index, name="index"),
    path('lessons/', view=views.index, name="index"),
    path('book/', view=views.index, name="index"),
    path('calendar/', view=views.index, name="index"),
    path('api/get_studio_events/', view=views.get_studio_events, name="get_studio_events"),
    path('api/add_studio_event/', view=views.add_studio_event, name="add_studio_event"),
]