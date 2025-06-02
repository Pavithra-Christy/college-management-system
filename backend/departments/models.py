from django.db import models

class Department(models.Model):
    department_id = models.AutoField(primary_key=True, db_column='DepartmentID')
    department_name = models.CharField(max_length=50, unique=True, db_column='DepartmentName')
    hod = models.CharField(max_length=100, db_column='HOD')

    class Meta:
        db_table = 'Departments'  # ✅ Capitalized to match your MySQL table name exactly

    def __str__(self):
        return self.department_name
