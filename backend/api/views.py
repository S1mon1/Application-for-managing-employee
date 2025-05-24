from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Employee
from .serializers import EmployeeSerializer
from .models import Position, Permission
from .serializers import PositionSerializer, PermissionSerializer
from rest_framework import status


# Create your views here.
@api_view(['GET'])
def getRoutes(request):

    routes = [
        
    ]

    return Response(routes)

@api_view(['GET'])
def getEmployees(request):
    employee = Employee.objects.all()
    serializer = EmployeeSerializer(employee, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEmployee(request, pk):
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(employee, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateEmployee(request, pk):
    data = request.data
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(instance=employee, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def getPositions(request):
    position = Position.objects.all()
    serializer = PositionSerializer(position, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPosition(request, pk):
    position = Position.objects.get(id=pk)
    serializer = PositionSerializer(position, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePosition(request, pk):
    data = request.data
    position = Position.objects.get(id=pk)
    serializer = PositionSerializer(instance=position, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deletePosition(request, pk):
    position = Position.objects.get(id=pk)
    position.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def getPermissions(request):
    permission = Permission.objects.all()
    serializer = PermissionSerializer(permission, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPermisson(request, pk):
    permission = Permission.objects.get(id=pk)
    serializer = PermissionSerializer(permission, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePermission(request, pk):
    data = request.data
    permission = Permission.objects.get(id=pk)
    serializer = PermissionSerializer(instance=permission, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)