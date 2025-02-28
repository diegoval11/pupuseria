# Generated by Django 5.1.4 on 2025-01-12 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pupuseriaApp', '0002_pedido_alter_categoria_options_producto_imagen_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='HorarioNegocio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia', models.IntegerField(choices=[(0, 'Lunes'), (1, 'Martes'), (2, 'Miércoles'), (3, 'Jueves'), (4, 'Viernes'), (5, 'Sábado'), (6, 'Domingo')])),
                ('hora_apertura', models.TimeField()),
                ('hora_cierre', models.TimeField()),
            ],
            options={
                'verbose_name': 'Horario de Negocio',
                'verbose_name_plural': 'Horarios de Negocio',
                'unique_together': {('dia',)},
            },
        ),
    ]
