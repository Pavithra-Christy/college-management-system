from django.urls import path
from .views import ResultListCreateView, ResultDetailView, FacultyCoursesView

urlpatterns = [
    path('', ResultListCreateView.as_view(), name='result-list-create'),
    path('<int:student_id>/<int:exam_id>/', ResultDetailView.as_view(), name='result-detail'),
    
    # ✅ New route for faculty's assigned courses
    path('faculty-courses/', FacultyCoursesView.as_view(), name='faculty-courses'),
]
