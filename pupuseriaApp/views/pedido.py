from django.shortcuts import render
from django.http import JsonResponse
from ..models import Categoria, Producto, Pedido, DetallePedido
import json
from django.core.serializers.json import DjangoJSONEncoder
import uuid

def generar_dispositivo_id(request):
    if 'dispositivo_id' not in request.session:
        request.session['dispositivo_id'] = str(uuid.uuid4())
    return request.session['dispositivo_id']

def pedido(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all().select_related('categoria')
    
    productos_list = [
        {
            'id': producto.id,
            'name': producto.nombre,
            'price': float(producto.precio),
            'category': producto.categoria.id,
            'image': request.build_absolute_uri(producto.imagen.url) if producto.imagen else None
        }
        for producto in productos
    ]
    
    productos_json = json.dumps(productos_list, cls=DjangoJSONEncoder)
    
    context = {
        'categorias': categorias,
        'productos': productos,
        'productos_json': productos_json,
    }
    return render(request, 'pedido.html', context)

def procesar_pedido(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        dispositivo_id = request.session.get('dispositivo_id', generar_dispositivo_id(request))
        
        pedido = Pedido.objects.create(
            nombre_cliente=data['nombre'],
            direccion=data['direccion'],
            telefono=data['telefono'],
            dispositivo_id=dispositivo_id
        )
        
        for item in data['items']:
            producto = Producto.objects.get(id=item['id'])
            DetallePedido.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=item['quantity'],
                precio_unitario=item['price']
            )
        
        return JsonResponse({
            'success': True,
            'pedido_id': pedido.id
        })
    
    return JsonResponse({'success': False}, status=400)
