from django.shortcuts import render

def pedido(request):
    menu_items = [
        {
            'id': 1,
            'name': 'Pupusa Revuelta',
            'price': '0.80',
            'category': 'tipicas',
            'image': 'images/pupusa-revuelta.jpg'
        },
        # Añade el resto de los items aquí
    ]
    return render(request, 'pedido.html', {'menu_items': menu_items})