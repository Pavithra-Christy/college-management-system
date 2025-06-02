from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from authentication.permissions import IsAdmin
from .models import Enrollment
from .serializers import EnrollmentSerializer
from students.models import Student
from students.serializers import StudentSerializer
from results.models import FacultyCourses  # ✅ For filtering faculty's courses

User = get_user_model()

class EnrollmentViewSet(ModelViewSet):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.role == "admin":
            return Enrollment.objects.all()
        elif user.role == "faculty":
            # ✅ Faculty can view only enrollments of their assigned courses
            course_ids = FacultyCourses.objects.filter(
                faculty__user=user
            ).values_list("course_id", flat=True)
            return Enrollment.objects.filter(course_id__in=course_ids)
        elif user.role == "student":
            return Enrollment.objects.filter(student__user=user)
        return Enrollment.objects.none()

    def get_permissions(self):
        user = self.request.user
        if user.is_authenticated and (user.is_superuser or user.role == "admin"):
            return [IsAuthenticated(), IsAdmin()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        # ❌ Faculty cannot create enrollments
        if request.user.role == "faculty":
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # ❌ Faculty cannot update enrollments
        if request.user.role == "faculty":
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        # ❌ Faculty cannot delete enrollments
        if request.user.role == "faculty":
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=["get"], url_path="assigned-students")
    def assigned_students(self, request):
        user = request.user
        if user.role != "faculty":
            return Response([], status=status.HTTP_403_FORBIDDEN)

        course_ids = FacultyCourses.objects.filter(
            faculty__user=user
        ).values_list("course_id", flat=True)

        student_ids = Enrollment.objects.filter(
            course_id__in=course_ids
        ).values_list("student__student_id", flat=True).distinct()

        students = Student.objects.filter(student_id__in=student_ids)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
