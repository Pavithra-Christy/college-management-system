from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExamViewSet, FacultyExamsView

router = DefaultRouter()
router.register(r'', ExamViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('faculty/<int:faculty_id>/exams/', FacultyExamsView.as_view(), name='faculty-exams'),
]
