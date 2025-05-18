from rest_framework.serializers import ModelSerializer
from .models import Employee, Position

class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'

class EmployeeSerializer(ModelSerializer):
    workable_positions = PositionSerializer(many = True, read_only = True)

    class Meta:
        model = Employee
        fields = '__all__'