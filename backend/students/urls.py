from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, FacultyStudentsView

router = DefaultRouter()
router.register(r'', StudentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('faculty/<int:faculty_id>/students/', FacultyStudentsView.as_view(), name='faculty-students'),
]
