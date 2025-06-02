from django.db import models
from courses.models import Course

class Exam(models.Model):
    exam_id = models.AutoField(primary_key=True, db_column='ExamID')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')
    exam_date = models.DateField(db_column='ExamDate')
    total_marks = models.IntegerField(db_column='TotalMarks')
    passing_marks = models.IntegerField(db_column='PassingMarks')

    class Meta:
        db_table = 'exams'

    def __str__(self):
        return f"{self.course.course_name} - {self.exam_date}"
