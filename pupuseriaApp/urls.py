from django.urls import path, include

from .views import home,pedido,hacer_pedido

urlpatterns = [
    path('', home.index , name="home"),
    
    path('pedido/', pedido.pedido , name="pedido"),
    path('api/crear-pedido/', hacer_pedido.crear_pedido, name='crear_pedido'),


]