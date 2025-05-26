from django.db import models

# Create your models here.

class Permission(models.Model):
    permission_name = models.CharField(max_length=100)

    def __str__(self):
        return self.permission_name

class Position(models.Model):
    position_name = models.CharField(max_length=100)
    description = models.TextField()
    required_permissions = models.ManyToManyField(Permission, related_name='required_by_positions', null=True, blank=True)
    history = models.ManyToManyField('self', through='PositionEmployees')

    def __str__(self):
        return self.position_name

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employees_permissions = models.ManyToManyField(Permission, through='EmployeePermissions', null=True, blank=True)
    workable_positions = models.ManyToManyField(Position, related_name='employees', null=True, blank=True)
    position_history = models.ManyToManyField('self', through='PositionEmployees')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class EmployeePermissions(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.employee}: {self.permission}"

class PositionEmployees(models.Model):
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        if self.assigned_to.position_history.count() >= 12:
            oldest_entry = self.assigned_to.position_history.first()
            if oldest_entry:
                oldest_entry.delete()

        if self.position.history.count() >= 12:
            oldest_entry = self.position.history.first()
            if oldest_entry:
                oldest_entry.delete()

        super().delete(*args, **kwargs)
    
    def __str__(self):
        return f"{self.position}: {self.assigned_to}"