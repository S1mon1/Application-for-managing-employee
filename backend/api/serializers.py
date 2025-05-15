from rest_framework.serializers import ModelSerializer
from .models import Employee
from .models import Position

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class PositionSerializer(ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'