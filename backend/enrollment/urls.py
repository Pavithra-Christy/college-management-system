# enrollments/urls.py
from rest_framework.routers import DefaultRouter
from .views import EnrollmentViewSet

router = DefaultRouter()
router.register(r'', EnrollmentViewSet, basename='enrollments')

urlpatterns = router.urls
