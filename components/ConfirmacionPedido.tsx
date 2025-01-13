import React, { useState, useEffect } from 'react';

// Define interfaces
interface PedidoItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface ConfirmacionPedidoProps {
  pedido: {
    items: PedidoItem[];
    total: number;
  };
  onClose: () => void;
  onConfirm: (datos: DatosPedido) => void;
}

interface DatosPedido {
  nombre: string;
  telefono: string;
  direccion: string;
}

// Create reusable UI components
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg ${
      className || 'bg-red-800 text-white hover:bg-red-700'
    }`}
  />
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
  />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
  />
);

const Progress: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-red-800 h-2.5 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

const ConfirmacionPedido: React.FC<ConfirmacionPedidoProps> = ({ pedido, onClose, onConfirm }) => {
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ubicacion, setUbicacion] = useState<{latitud: number; longitud: number} | null>(null);
  const [dentroDeRango, setDentroDeRango] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUbicacion({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          });
          setDentroDeRango(true);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          setDentroDeRango(false);
        }
      );
    }
  }, []);

  const avanzarPaso = () => {
    if (paso < 3) setPaso(paso + 1);
  };

  const retrocederPaso = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const confirmarPedido = async () => {
    try {
      const response = await fetch('/api/crear-pedido/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          telefono,
          direccion,
          items: pedido.items,
          ...ubicacion
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el pedido');
      }

      const data = await response.json();
      onConfirm({ nombre, telefono, direccion });
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo procesar el pedido. Por favor, inténtalo de nuevo.');
    }
  };

  if (!dentroDeRango) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Lo sentimos</h2>
          <p>Estás fuera del área de entrega. No podemos procesar tu pedido en este momento.</p>
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Confirmar Pedido</h2>
        <Progress value={(paso / 3) * 100} />
        
        <div className="mt-6">
          {paso === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Resumen de tu pedido</h3>
              {pedido.items.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="font-bold mt-4">Total: ${pedido.total.toFixed(2)}</div>
            </div>
          )}

          {paso === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Dirección de entrega</h3>
              <Textarea
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingresa tu dirección completa"
                rows={4}
              />
            </div>
          )}

          {paso === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Datos de contacto</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                />
                <Input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {paso > 1 && (
            <Button onClick={retrocederPaso} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Atrás
            </Button>
          )}
          {paso < 3 ? (
            <Button onClick={avanzarPaso} className="ml-auto">
              Siguiente
            </Button>
          ) : (
            <Button onClick={confirmarPedido} className="ml-auto">
              Confirmar Pedido
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionPedido;

