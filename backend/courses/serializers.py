# courses/serializers.py
from rest_framework import serializers
from .models import Course
from departments.models import Department
from results.models import FacultyCourses  # ✅ Import the link table


class CourseSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    department_name = serializers.CharField(source='department.department_name', read_only=True)
    is_faculty_owner = serializers.SerializerMethodField()  # ✅ Dynamic field

    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['department_name', 'is_faculty_owner']

    def get_is_faculty_owner(self, obj):
        """
        Returns True if the current user (faculty) is assigned to this course via FacultyCourses table.
        """
        request = self.context.get('request')
        if request and hasattr(request.user, 'id') and request.user.role == 'faculty':
            return FacultyCourses.objects.filter(faculty__user=request.user, course=obj).exists()
        return False
