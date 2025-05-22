from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),

    path('employee/', views.getEmployees, name="users"),
    path('employee/<str:pk>/', views.getEmployee, name="user"),
    path('employee/<str:pk>/update/', views.updateEmployee, name="update-employee"),

    path('positions/', views.getPositions, name="positions"),
    path('positions/<str:pk>/', views.getPosition, name="position"),
    path('positions/<str:pk>/update/', views.updatePosition, name="update-position"),

    path('permissions/', views.getPermissions, name="permissions"),
    path('permissions/<str:pk>/', views.getPermisson, name="permission")
]