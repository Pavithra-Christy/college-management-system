from django.db import models
from students.models import Student
from exams.models import Exam
from courses.models import Course
from faculty.models import Faculty 

class Result(models.Model):
    result_id = models.AutoField(primary_key=True, db_column='ResultID')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, db_column='StudentID')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, db_column='ExamID')
    obtained_marks = models.IntegerField(db_column='ObtainedMarks')
    grade = models.CharField(
        max_length=2,
        choices=[
            ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E'),
            ('F', 'F'), ('P', 'Pass'), ('NP', 'No Pass')
        ],
        db_column='Grade'
    )

    class Meta:
        db_table = 'results'

    def __str__(self):
        return f"{self.student.name} - {self.exam.course.course_name} - {self.grade}"


class FacultyCourses(models.Model):
    faculty_course_id = models.AutoField(primary_key=True, db_column='FacultyCourseID')
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, db_column='FacultyID')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column='CourseID')

    class Meta:
        db_table = 'facultycourses'
        unique_together = ('faculty', 'course')
        managed = False  

    def __str__(self):
        return f"{self.faculty.name} teaches {self.course.course_name}"
