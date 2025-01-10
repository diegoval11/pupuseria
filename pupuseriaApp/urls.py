from django.urls import path, include

from .views import home,pedido

urlpatterns = [
    path('', home.index , name="home"),
    path('pedido/', pedido.pedido , name="pedido"),

]