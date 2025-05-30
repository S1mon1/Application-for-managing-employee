# Generated by Django 5.0.6 on 2025-05-22 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_employee_position_history_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='employees_permissions',
            field=models.ManyToManyField(null=True, through='api.EmployeePermissions', to='api.permission'),
        ),
        migrations.AlterField(
            model_name='employee',
            name='workable_positions',
            field=models.ManyToManyField(null=True, related_name='employees', to='api.position'),
        ),
    ]
