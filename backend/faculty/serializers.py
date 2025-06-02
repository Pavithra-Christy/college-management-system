from rest_framework import serializers
from .models import Faculty
from departments.serializers import DepartmentSerializer  # Nested serializer

class FacultySerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)  # For GET: nested department info
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Faculty._meta.get_field('department').related_model.objects.all(),
        source='department',
        write_only=True
    )  # For POST/PUT: accept department ID

    class Meta:
        model = Faculty
        fields = [
            'faculty_id',
            'name',
            'email',
            'phone',
            'salary',
            'department',      # For GET (read-only)
            'department_id'    # For POST/PUT (write-only)
        ]
        read_only_fields = ['faculty_id']
