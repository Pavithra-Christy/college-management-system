from django.db import models
from django.conf import settings  # ✅ Import settings to use custom user
from departments.models import Department

class Student(models.Model):
    student_id = models.AutoField(primary_key=True, db_column='StudentID')
    
    # ✅ TEMPORARY: Allow null and blank to avoid migration issues
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='student_profile',
        null=True,
        blank=True
    )
    
    name = models.CharField(max_length=100, db_column='Name')
    dob = models.DateField(db_column='DOB')
    gender = models.CharField(
        max_length=20,
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')],
        db_column='Gender'
    )
    email = models.EmailField(unique=True, db_column='Email')
    phone = models.CharField(max_length=15, unique=True, db_column='Phone')
    address = models.TextField(db_column='Address', blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, db_column='DepartmentID')

    class Meta:
        db_table = 'students'

    def __str__(self):
        return self.name
