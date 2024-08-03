from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('employee/', views.getEmployees, name="users"),
    path('employee/<str:pk>', views.getEmployee, name="user")
]