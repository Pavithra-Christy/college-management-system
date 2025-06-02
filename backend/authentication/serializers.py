from rest_framework import serializers
from django.contrib.auth import get_user_model
from students.models import Student
from faculty.models import Faculty
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, default='student')
    email = serializers.EmailField(required=False)

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def validate(self, attrs):
        role = attrs.get("role")
        email = attrs.get("email")

        if role == "faculty" and not Faculty.objects.filter(email=email).exists():
            raise serializers.ValidationError("Faculty signup restricted to pre-registered emails.")

        if role == "student" and not Student.objects.filter(email=email).exists():
            raise serializers.ValidationError("Student signup restricted to pre-registered emails.")

        return attrs

    def create(self, validated_data):
        role = validated_data.pop('role')
        password = validated_data.pop('password')
        email = validated_data.get('email')

        is_staff = role in ["admin", "faculty"]
        is_superuser = role == "admin"

        user = User.objects.create_user(
            is_staff=is_staff,
            is_superuser=is_superuser,
            password=password,
            role=role,
            **validated_data
        )

        # Assign group
        from django.contrib.auth.models import Group
        group, _ = Group.objects.get_or_create(name=role.capitalize())
        user.groups.add(group)

        # Link to existing profile
        if role == "student":
            student = Student.objects.get(email=email)
            student.user = user
            student.save()
        elif role == "faculty":
            faculty = Faculty.objects.get(email=email)
            faculty.user = user
            faculty.save()

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        data['role'] = user.role
        data['user_id'] = user.id

        if user.role == 'student':
            try:
                student = Student.objects.get(user=user)
                data['student_id'] = student.student_id
            except Student.DoesNotExist:
                data['student_id'] = None

        elif user.role == 'faculty':
            try:
                faculty = Faculty.objects.get(user=user)
                data['faculty_id'] = faculty.faculty_id
            except Faculty.DoesNotExist:
                data['faculty_id'] = None

        return data
