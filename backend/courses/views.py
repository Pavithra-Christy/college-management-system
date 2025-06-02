from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsAdminOrFaculty
from .models import Course
from .serializers import CourseSerializer
from results.models import FacultyCourses  # Import for filtering

class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.role == "admin":
            return Course.objects.all()
        elif user.role == "faculty":
            return Course.objects.filter(
                course_id__in=FacultyCourses.objects.filter(faculty__user=user).values('course_id')
            ).distinct()
        elif user.role == "student":
            # ✅ Fix: safely get student's department from user.student_profile
            student_profile = getattr(user, 'student_profile', None)
            if student_profile and student_profile.department:
                return Course.objects.filter(department=student_profile.department).distinct()
            return Course.objects.none()
        return Course.objects.none()

    def get_permissions(self):
        user = self.request.user
        if user.is_authenticated and (user.is_superuser or user.role == "faculty"):
            return [IsAuthenticated(), IsAdminOrFaculty()]
        return [IsAuthenticated()]

    def get_serializer_context(self):
        # ✅ Pass request into serializer context
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
