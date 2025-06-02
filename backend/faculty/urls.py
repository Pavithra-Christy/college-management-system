from django.urls import path
from .views import FacultyListCreateView, FacultyDetailView

urlpatterns = [
    path('', FacultyListCreateView.as_view(), name='faculty-list-create'),
    path('<int:pk>/', FacultyDetailView.as_view(), name='faculty-detail'),
]
