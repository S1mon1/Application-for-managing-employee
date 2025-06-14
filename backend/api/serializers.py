from rest_framework.serializers import ModelSerializer
from .models import Employee, Position, Permission, PositionEmployees

class PermissionSerializer(ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'
        
class PositionSerializer(ModelSerializer):
    required_permissions = PermissionSerializer(many = True, read_only = True)

    class Meta:
        model = Position
        fields = '__all__'

class EmployeeSerializer(ModelSerializer):
    workable_positions = PositionSerializer(many = True, read_only = True)
    employees_permissions = PermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'

class EmployeesPositionSerializer(ModelSerializer):

    class Meta:
        model = PositionEmployees
        fields = '__all__'