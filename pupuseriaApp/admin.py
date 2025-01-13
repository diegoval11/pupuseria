from django.contrib import admin
from .models import Categoria, Producto, Pedido, DetallePedido, HorarioNegocio

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria')
    list_filter = ('categoria',)

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('nombre_cliente', 'fecha_pedido', 'telefono')
    list_filter = ('fecha_pedido',)

@admin.register(DetallePedido)
class DetallePedidoAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'producto', 'cantidad', 'precio_unitario')

@admin.register(HorarioNegocio)
class HorarioNegocioAdmin(admin.ModelAdmin):
    list_display = ('get_dia_display', 'hora_apertura', 'hora_cierre')
    ordering = ['dia']

