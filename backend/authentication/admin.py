from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'role', 'is_active', 'is_superuser', 'is_staff')
    list_filter = ('role', 'is_superuser', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'role')
    ordering = ('id',)
    list_editable = ('is_active', 'is_staff')
