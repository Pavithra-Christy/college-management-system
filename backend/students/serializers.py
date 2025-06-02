from rest_framework import serializers
from .models import Student
from departments.models import Department

class StudentSerializer(serializers.ModelSerializer):
    # Readable department name for GET
    department_name = serializers.CharField(source='department.department_name', read_only=True)

    # Accepts department_id in POST/PUT, maps to 'department' FK
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        source='department',
        required=True  # Required for creation
    )

    class Meta:
        model = Student
        fields = [
            'student_id',
            'name',
            'email',
            'dob',
            'gender',
            'phone',
            'address',
            'department_id',     # used in POST/PUT
            'department_name'    # used in GET
        ]
