# exams/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsAdminOrFacultyOrReadOnly
from .models import Exam
from .serializers import ExamSerializer
from results.models import FacultyCourses  # ✅ Reuse existing model
from rest_framework.exceptions import PermissionDenied


class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated, IsAdminOrFacultyOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Exam.objects.all()
        elif user.role == 'faculty':
            return Exam.objects.filter(course__facultycourses__faculty__user=user)
        elif user.role == 'student':
            return Exam.objects.filter(course__enrollment__student__user=user).distinct()
        return Exam.objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        user = self.request.user
        if user.role == 'faculty':
            assigned_courses = FacultyCourses.objects.filter(faculty__user=user).values_list('course_id', flat=True)
            context['faculty_course_ids'] = set(assigned_courses)
        return context
