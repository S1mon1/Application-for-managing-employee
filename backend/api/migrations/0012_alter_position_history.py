# Generated by Django 5.0.6 on 2025-06-05 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_positionemployees_assigned_to'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='history',
            field=models.ManyToManyField(related_name='employees', through='api.PositionEmployees', to='api.position'),
        ),
    ]
