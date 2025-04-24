from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('api/lessons/book/', view=views.book_lesson, name="book_lesson"),
    path('api/lessons/cancel/<int:lesson_id>/', view=views.cancel_lesson, name="cancel_lesson"),
    path('api/get_account/', view=views.get_account, name="get_account"),
    path('about/', view=views.index, name="index"),
    path('lessons/', view=views.index, name="index"),
    path('book/', view=views.index, name="index"),
    
]