from django.db import models
from departments.models import Department

class Course(models.Model):
    course_id = models.AutoField(primary_key=True, db_column='CourseID')
    course_name = models.CharField(max_length=255, db_column='CourseName')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, db_column='DepartmentID')

    # ✅ Correct string reference and through model
    faculty = models.ManyToManyField(
        'faculty.Faculty',
        through='results.FacultyCourses',
        related_name='courses'
    )

    class Meta:
        db_table = 'courses'

    def __str__(self):
        return self.course_name
