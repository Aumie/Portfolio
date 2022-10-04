"""URL mappings for the post app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from posts import views

router = DefaultRouter()
router.register('post', views.PostViewSet)
router.register('tag', views.TagViewSet)
router.register('image', views.ImageViewSet)

app_name = 'posts'

urlpatterns = [
    path('', include(router.urls)),

]
