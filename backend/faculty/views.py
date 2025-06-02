# faculty/views.py
from rest_framework.viewsets import ModelViewSet
from .models import Faculty
from .serializers import FacultySerializer
from rest_framework.permissions import IsAuthenticated
from authentication.permissions import IsAdmin, IsFaculty
from rest_framework import permissions

class FacultyViewSet(ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        user = self.request.user
        if user.is_superuser or user.groups.filter(name='admin').exists():
            return [IsAdmin()]
        elif user.groups.filter(name='faculty').exists():
            return [IsFaculty()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser or user.groups.filter(name='admin').exists():
            return Faculty.objects.all()
        elif user.groups.filter(name='faculty').exists():
            return Faculty.objects.filter(user=user)
        return Faculty.objects.none()
