from django.urls import path
from .views import (Home, Detail, SavedPicsView)




urlpatterns = [
    path('api-post/', Home.as_view()),
    path('api-post/<str:pk>/', Detail.as_view()),
    path('api-tag/<slug:tag_slug>/', SavedPicsView.as_view()),
]