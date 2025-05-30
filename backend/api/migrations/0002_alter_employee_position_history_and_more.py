# Generated by Django 5.0.6 on 2024-08-02 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='position_history',
            field=models.ManyToManyField(through='api.PositionEmployees', to='api.employee'),
        ),
        migrations.AlterField(
            model_name='position',
            name='history',
            field=models.ManyToManyField(through='api.PositionEmployees', to='api.position'),
        ),
    ]
