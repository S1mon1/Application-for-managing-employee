from django.db import models

# Create your models here.

'''
class Permission(models.Model):
    permission_name = models.CharField(max_length=100)

class Position(models.Model):
    position_name = models.CharField(max_length=100)
    description = models.TextField()
    required_permissions = models.ManyToManyField(Permission, related_name='required_by_positions')

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employees_permissions = models.ManyToManyField(Permission, through='EmployeePermissions')
    workable_positions = models.ManyToManyField(Position, related_name='employees')


class EmployeePermissions(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

class PositionEmployees(models.Model):
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE)

'''
#### Sprawdzić kod

class Permission(models.Model):
    permission_name = models.CharField(max_length=100)

class Position(models.Model):
    position_name = models.CharField(max_length=100)
    description = models.TextField()
    required_permissions = models.ManyToManyField(Permission, related_name='required_by_positions')
    history = models.ManyToManyField('self', through='PositionEmployees', related_name='positions')

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employees_permissions = models.ManyToManyField(Permission, through='EmployeePermissions')
    workable_positions = models.ManyToManyField(Position, related_name='employees')
    position_history = models.ManyToManyField('self', through='PositionEmployees', related_name='employees')

class EmployeePermissions(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

class PositionEmployees(models.Model):
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.assigned_to.position_history.count() >= 12:
            oldest_entry = self.assigned_to.position_history.first()
            oldest_entry.delete()

        if self.position.history.count() >= 12:
            oldest_entry = self.position.history.first()
            oldest_entry.delete()

        super().save(*args, **kwargs)