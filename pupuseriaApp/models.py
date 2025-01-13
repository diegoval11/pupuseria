from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Categorías"

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)
    
    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    nombre_cliente = models.CharField(max_length=100)
    direccion = models.TextField()
    telefono = models.CharField(max_length=15)
    dispositivo_id = models.CharField(max_length=100)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Pedido de {self.nombre_cliente} - {self.fecha_pedido}"

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=6, decimal_places=2)
    
    def __str__(self):
        return f"{self.cantidad}x {self.producto.nombre}"


class HorarioNegocio(models.Model):
    DIAS_SEMANA = [
        (0, _('Lunes')),
        (1, _('Martes')),
        (2, _('Miércoles')),
        (3, _('Jueves')),
        (4, _('Viernes')),
        (5, _('Sábado')),
        (6, _('Domingo')),
    ]
    
    dia = models.IntegerField(choices=DIAS_SEMANA)
    hora_apertura = models.TimeField()
    hora_cierre = models.TimeField()

    class Meta:
        verbose_name = _("Horario de Negocio")
        verbose_name_plural = _("Horarios de Negocio")
        unique_together = ['dia']

    def __str__(self):
        return f"{self.get_dia_display()}: {self.hora_apertura} - {self.hora_cierre}"

    def clean(self):
        if self.hora_apertura >= self.hora_cierre:
            raise ValidationError(_('La hora de apertura debe ser anterior a la hora de cierre.'))

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

