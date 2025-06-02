from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Student
from .serializers import StudentSerializer
from enrollment.models import Enrollment

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.role == 'admin':
            return Student.objects.all()

        elif user.role == 'faculty':
            try:
                faculty = user.faculty_profile  # related_name from Faculty model
                course_ids = faculty.facultycourses_set.values_list('course_id', flat=True)
                enrolled_student_ids = Enrollment.objects.filter(
                    course_id__in=course_ids
                ).values_list('student_id', flat=True)
                return Student.objects.filter(student_id__in=enrolled_student_ids).distinct()
            except Exception as e:
                print("Faculty filtering error:", e)
                return Student.objects.none()

        elif user.role == 'student':
            return Student.objects.filter(user=user)

        return Student.objects.none()
