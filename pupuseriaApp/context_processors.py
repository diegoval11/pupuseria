from datetime import datetime
from .models import HorarioNegocio

def estado_negocio(request):
    ahora = datetime.now()
    dia_actual = ahora.weekday()
    hora_actual = ahora.time()

    try:
        horario_hoy = HorarioNegocio.objects.get(dia=dia_actual)
        if horario_hoy.hora_apertura <= hora_actual < horario_hoy.hora_cierre:
            return {'negocio_abierto': True}
    except HorarioNegocio.DoesNotExist:
        pass

    return {'negocio_abierto': False}