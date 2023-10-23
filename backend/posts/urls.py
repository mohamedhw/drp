from django.urls import path
from .views import (
    Home,
    Detail,
    SavedPicsView,
    Search,
    PostCreate,
    PostDelete,
    PostUpdate,
    )




urlpatterns = [
    path('api-post/', Home.as_view()),
    path('api-post/<str:pk>/', Detail.as_view()),
    path('api-tag/<slug:tag_slug>/', SavedPicsView.as_view()),
    path('api-search/', Search.as_view()),
    path('api-create/', PostCreate.as_view()),
    path('<str:pk>/api-delete/', PostDelete.as_view()),
    path('<str:pk>/api-update/', PostUpdate.as_view()),
]