# exams/serializers.py
from rest_framework import serializers
from .models import Exam

class ExamSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.course_name', read_only=True)

    class Meta:
        model = Exam
        fields = '__all__'  # includes course, exam_date, etc. + course_name

    def validate_course(self, course):
        user = self.context['request'].user

        # Admin can assign any course
        if user.role == 'admin':
            return course

        # Faculty can only assign exams to their own courses
        if user.role == 'faculty':
            if course.facultycourses_set.filter(faculty__user=user).exists():
                return course
            raise serializers.ValidationError("You are not assigned to this course.")
        
        raise serializers.ValidationError("You do not have permission to assign this course.")
