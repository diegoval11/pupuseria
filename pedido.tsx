import React, { useState } from 'react';
import ConfirmacionPedido from './components/ConfirmacionPedido';
import type { DatosPedido } from './components/types';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Pedido() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  const handleConfirmPedido = async (datos: DatosPedido) => {
    try {
      // Aquí iría la lógica para enviar el pedido al backend
      console.log('Pedido confirmado:', { cart, ...datos });
      setShowConfirmacion(false);
      setCart([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      {/* Tu contenido existente */}
      
      {showConfirmacion && (
        <ConfirmacionPedido
          pedido={{
            items: cart,
            total: getTotalPrice()
          }}
          onClose={() => setShowConfirmacion(false)}
          onConfirm={handleConfirmPedido}
        />
      )}
    </div>
  );
}

