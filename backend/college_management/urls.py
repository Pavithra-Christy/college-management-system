# college_management_system/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from students.views import StudentViewSet
from faculty.views import FacultyViewSet
from departments.views import DepartmentViewSet
from courses.views import CourseViewSet
from exams.views import ExamViewSet
from results.views import ResultViewSet, FacultyCoursesView  # ✅ import FacultyCoursesView
from enrollment.views import EnrollmentViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'faculty', FacultyViewSet, basename='faculty')
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'results', ResultViewSet, basename='result')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ All API ViewSets
    path('api/', include(router.urls)),

    # ✅ Auth
    path('api/auth/', include('authentication.urls')),
    path('api/auth/browse/', include('rest_framework.urls')),
]
