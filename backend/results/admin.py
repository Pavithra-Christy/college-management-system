# results/admin.py
from django.contrib import admin
from .models import Result, FacultyCourses

admin.site.register(Result)
admin.site.register(FacultyCourses)
