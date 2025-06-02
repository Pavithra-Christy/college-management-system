from rest_framework.viewsets import ModelViewSet
from authentication.permissions import IsAdmin
from .models import Department
from .serializers import DepartmentSerializer

class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdmin]
