from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('employee/', views.getEmployees, name="users"),
    path('employee/<str:pk>/update/', views.updateEmployee, name="update-employee"),

    path('employee/<str:pk>/', views.getEmployee, name="user"),
    path('positions/', views.getPositions, name="positions"),
    path('positions/<str:pk>/', views.getPosition, name="position")
]