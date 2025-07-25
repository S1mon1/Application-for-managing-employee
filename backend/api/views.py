from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Employee, PositionEmployees
from .serializers import EmployeeSerializer, EmployeesPositionSerializer
from .models import Position, Permission
from .serializers import PositionSerializer, PermissionSerializer
from rest_framework import status

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
    try:
        employee = Employee.objects.get(id=pk)
        serializer = EmployeeSerializer(instance=employee, data=request.data)
        
        if serializer.is_valid():
            employee = serializer.save()

            position_ids = request.data.get('workable_positions', [])
            permission_ids = request.data.get('employees_permissions', [])
            
            if not position_ids:
                employee.workable_positions.clear()
            else:
                positions = Position.objects.filter(id__in=position_ids)
                employee.workable_positions.set(positions)

            if not permission_ids:
                employee.employees_permissions.clear()
            else:
                permissions = Permission.objects.filter(id__in=permission_ids)
                employee.employees_permissions.set(permissions)
            
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
def deleteEmployee(request, pk):
    employee = Employee.objects.get(id=pk)
    employee.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def addEmployee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        employee = serializer.save()
        position = serializer.save()
        
        position_ids = request.data.get('workable_positions', [])
        positions = Position.objects.filter(id__in=position_ids)
        employee.workable_positions.set(positions)

        permission_ids = request.data.get('employees_permissions', [])
        permissions = Permission.objects.filter(id__in=permission_ids)
        position.employees_permissions.set(permissions)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getPositions(request):
    position = Position.objects.all()
    serializer = PositionSerializer(position, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addPosition(request):
    serializer = PositionSerializer(data=request.data)
    if serializer.is_valid():
        position = serializer.save()
        
        permission_ids = request.data.get('required_permissions', [])
        permissions = Permission.objects.filter(id__in=permission_ids)
        
        position.required_permissions.set(permissions)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getPosition(request, pk):
    position = Position.objects.get(id=pk)
    serializer = PositionSerializer(position, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePosition(request, pk):
    try:
        position = Position.objects.get(id=pk)
        serializer = PositionSerializer(instance=position, data=request.data)
        
        if serializer.is_valid():
            position = serializer.save()

            permission_ids = request.data.get('required_permissions', [])
            
            if not permission_ids:
                position.required_permissions.clear()
            else:
                permission = Permission.objects.filter(id__in=permission_ids)
                position.required_permissions.set(permission)
            
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

@api_view(['POST'])
def addPermission(request):
    serializer = PermissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['DELETE'])
def deletePermission(request, pk):
    permission = Permission.objects.get(id=pk)
    permission.delete()
    return Response(status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def getEmployeesPosition(request):
    try:
        employeesposition = PositionEmployees.objects.all()
        serializer = EmployeesPositionSerializer(instance=employeesposition, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def addEmployeePosition(request):
    serializer = EmployeesPositionSerializer(data=request.data, many=True)

    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteEmployeePosition(request, pk):
    try:
        employeesposition = PositionEmployees.objects.get(id=pk)
        employeesposition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Position.DoesNotExist:
        return Response("Position not found", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    