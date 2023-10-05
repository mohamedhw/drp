from django.urls import path
from .views import Home, Detail




urlpatterns = [
    path('api-post/', Home.as_view()),
    path('api-post/<str:pk>/', Detail.as_view())
]