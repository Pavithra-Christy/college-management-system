from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_superuser or getattr(request.user, "role", None) == "admin"
        )

class IsFaculty(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, "role", None) == "faculty"

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, "role", None) == "student"

class IsAdminOrFaculty(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.is_superuser or getattr(request.user, "role", None) in ["admin", "faculty"]
        )

class IsAdminOrFacultyOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Allow read-only access (GET, HEAD, OPTIONS) to any authenticated user
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        # Allow write access (POST, PUT, DELETE, etc.) only to admin or faculty
        return request.user.is_authenticated and getattr(request.user, "role", None) in ["admin", "faculty"]
