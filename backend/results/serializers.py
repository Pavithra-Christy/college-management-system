# results/serializers.py

from rest_framework import serializers
from .models import Result
from students.models import Student
from exams.models import Exam
from students.serializers import StudentSerializer
from exams.serializers import ExamSerializer

class ResultSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    exam = serializers.SerializerMethodField()  # ✅ replaces ExamSerializer(read_only=True)

    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), source='student', write_only=True
    )
    exam_id = serializers.PrimaryKeyRelatedField(
        queryset=Exam.objects.all(), source='exam', write_only=True
    )

    class Meta:
        model = Result
        fields = ['result_id', 'student', 'exam', 'student_id', 'exam_id', 'obtained_marks', 'grade']
        read_only_fields = ['result_id', 'student', 'exam']

    def get_exam(self, obj):
        request = self.context.get('request', None)
        return ExamSerializer(obj.exam, context={'request': request}).data

    def calculate_grade(self, marks):
        if marks >= 90:
            return 'A'
        elif marks >= 80:
            return 'B'
        elif marks >= 70:
            return 'C'
        elif marks >= 60:
            return 'D'
        elif marks >= 50:
            return 'E'
        elif marks >= 40:
            return 'P'
        else:
            return 'NP'

    def create(self, validated_data):
        marks = validated_data.get("obtained_marks")
        validated_data['grade'] = self.calculate_grade(marks)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if "obtained_marks" in validated_data:
            marks = validated_data.get("obtained_marks")
            validated_data['grade'] = self.calculate_grade(marks)
        return super().update(instance, validated_data)
