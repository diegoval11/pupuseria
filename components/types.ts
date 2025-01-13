export interface ConfirmacionPedidoProps {
    pedido: {
      items: Array<{
        id: number;
        name: string;
        quantity: number;
        price: number;
      }>;
      total: number;
    };
    onClose: () => void;
    onConfirm: (datos: DatosPedido) => void;
  }
  
  export interface DatosPedido {
    nombre: string;
    telefono: string;
    direccion: string;
  }
  
  