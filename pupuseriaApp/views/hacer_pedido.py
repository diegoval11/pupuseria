from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from ..models import Pedido, DetallePedido, Producto
import json
from math import radians, sin, cos, sqrt, atan2

@csrf_exempt
@require_POST
def crear_pedido(request):
    data = json.loads(request.body)
    
    # Verificar la ubicación (esto es un ejemplo simplificado)
    lat_local = 13.7034  # Latitud del local (ejemplo)
    lon_local = -89.2073  # Longitud del local (ejemplo)
    lat_cliente = data.get('latitud')
    lon_cliente = data.get('longitud')
    
    if lat_cliente and lon_cliente:
        distancia = calcular_distancia(lat_local, lon_local, lat_cliente, lon_cliente)
        if distancia > 50:  # 50 km de radio
            return JsonResponse({'error': 'Fuera del área de entrega'}, status=400)
    
    pedido = Pedido.objects.create(
        nombre_cliente=data['nombre'],
        direccion=data['direccion'],
        telefono=data['telefono'],
        dispositivo_id=request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR')),
        latitud=lat_cliente,
        longitud=lon_cliente
    )
    
    for item in data['items']:
        producto = Producto.objects.get(id=item['id'])
        DetallePedido.objects.create(
            pedido=pedido,
            producto=producto,
            cantidad=item['quantity'],
            precio_unitario=item['price']
        )
    
    return JsonResponse({'mensaje': 'Pedido creado con éxito', 'id_pedido': pedido.id})

def calcular_distancia(lat1, lon1, lat2, lon2):
    R = 6371  # Radio de la Tierra en km

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    distancia = R * c

    return distancia

# Actualiza urls.py para incluir la nueva vista

