from django.urls import path
from .views import (
    PicsFilter,
    Detail,
    TagFilterView,
    PostCreate,
    PostDelete,
    PostUpdate,
    UserPics,
    save_pic,
    SavedPics,
    like_pic,
    AllTags,
    TagsSuggestion,
    MoreRelatedPics
)


urlpatterns = [
    path("api-pics/", PicsFilter.as_view()),
    path("api-post/<str:pk>/", Detail.as_view()),
    path("api-related/<str:pk>/", MoreRelatedPics.as_view()),
    path("api-tag/<slug:tag_slug>/", TagFilterView.as_view()),
    path("api-create/", PostCreate.as_view()),
    path("api-tag-suggestion/", TagsSuggestion.as_view()),
    path("<str:pk>/api-delete/", PostDelete.as_view()),
    path("<str:pk>/api-update/", PostUpdate.as_view()),
    path("api-user-posts/<str:username>/", UserPics.as_view()),
    path("<str:pk>/api-save-pic/", save_pic),
    path("api-saved-pics/", SavedPics.as_view()),
    path("<str:pk>/api-like-pic/", like_pic),
    path("api-tags/", AllTags.as_view()),
]
