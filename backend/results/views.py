# results/views.py

from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.exceptions import PermissionDenied
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.permissions import IsAdmin, IsFaculty
from .models import Result, FacultyCourses
from .serializers import ResultSerializer
from courses.models import Course
from courses.serializers import CourseSerializer

User = get_user_model()

class ResultViewSet(ModelViewSet):
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.role == "admin":
            return Result.objects.all()
        elif user.role == "faculty":
            # ✅ Faculty can view results only for exams in their assigned courses
            return Result.objects.filter(exam__course__facultycourses__faculty__user=user)
        elif user.role == "student":
            return Result.objects.filter(student__user=user)
        return Result.objects.none()

    def get_permissions(self):
        user = self.request.user
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]
        if user.is_superuser or user.role == "admin":
            return [IsAuthenticated(), IsAdmin()]
        if user.role == "faculty":
            return [IsAuthenticated(), IsFaculty()]
        return []

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == "faculty":
            exam = serializer.validated_data.get("exam")
            if not exam.course.facultycourses_set.filter(faculty__user=user).exists():
                raise PermissionDenied("You do not have permission to add results for this exam.")
        serializer.save()

    def perform_update(self, serializer):
        user = self.request.user
        if user.role == "faculty":
            result = self.get_object()
            if not result.exam.course.facultycourses_set.filter(faculty__user=user).exists():
                raise PermissionDenied("You do not have permission to update this result.")
        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user
        if user.role == "faculty":
            if not instance.exam.course.facultycourses_set.filter(faculty__user=user).exists():
                raise PermissionDenied("You do not have permission to delete this result.")
        instance.delete()


# ✅ API view to return faculty's assigned courses
class FacultyCoursesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'faculty':
            courses = Course.objects.filter(facultycourses__faculty__user=user)
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        return Response([])  # Admin or students don't need this
