from django.contrib import admin

# Register your models here.

from .models import Permission, Position, PositionEmployees, Employee, EmployeePermissions

admin.site.register(Permission)
admin.site.register(Position)
admin.site.register(PositionEmployees)
admin.site.register(Employee)
admin.site.register(EmployeePermissions)