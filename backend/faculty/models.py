from django.db import models
from django.conf import settings  # ✅ Custom user
from departments.models import Department

class Faculty(models.Model):
    faculty_id = models.AutoField(primary_key=True, db_column='FacultyID')
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='faculty_profile',
        null=True,
        blank=True
    )
    name = models.CharField(max_length=100, db_column='Name')
    email = models.EmailField(unique=True, db_column='Email')
    phone = models.CharField(max_length=15, unique=True, db_column='Phone')
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        db_column='DepartmentID',
        related_name='faculties'
    )
    salary = models.DecimalField(max_digits=10, decimal_places=2, db_column='Salary')

    class Meta:
        db_table = 'faculty'

    def __str__(self):
        return self.name


