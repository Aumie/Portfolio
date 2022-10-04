from django.urls import path, include
from aum.views import AumFileViewSet, AumImageViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('file', AumFileViewSet)
router.register('image', AumImageViewSet)

app_name = 'aum'

urlpatterns = [
    path('', include(router.urls)),

]
