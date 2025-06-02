from django.db import models
from students.models import Student
from courses.models import Course

class Enrollment(models.Model):
    enrollment_id = models.AutoField(primary_key=True, db_column='EnrollmentID')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='StudentID')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
    semester = models.IntegerField(db_column='Semester')
    year = models.IntegerField(db_column='Year')
    grade = models.CharField(max_length=2, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E'), ('F', 'F'), ('P', 'Pass'), ('NP', 'No Pass')], db_column='Grade', blank=True, null=True)

    class Meta:
        db_table = 'enrollment'

    def __str__(self):
        return f"{self.student.name} - {self.course.course_name}"
