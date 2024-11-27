import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface CartProps {
  items: Array<{ name: string; quantity: number; price: number }>;
  deliveryPrice: number;
}

const Cart = ({ items, deliveryPrice }: CartProps) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryPrice;

  const formatOrderText = () => {
    let text = "Olá! Gostaria de fazer um pedido:\n\n";
    items.forEach(item => {
      text += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    text += `\nSubtotal: R$ ${subtotal.toFixed(2)}`;
    text += `\nEntrega: R$ ${deliveryPrice.toFixed(2)}`;
    text += `\nTotal: R$ ${total.toFixed(2)}`;
    return encodeURIComponent(text);
  };

  const handleWhatsAppClick = () => {
    if (items.length === 0) {
      alert('Adicione itens ao carrinho primeiro!');
      return;
    }
    window.open(`https://wa.me/5582994150378?text=${formatOrderText()}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="text-primary" />
        <h3 className="text-lg font-semibold">Seu Pedido</h3>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex justify-between mb-2">
          <span>{item.quantity}x {item.name}</span>
          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Entrega</span>
          <span>R$ {deliveryPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-primary hover:bg-primary/90"
        onClick={handleWhatsAppClick}
      >
        Enviar Pedido pelo WhatsApp
      </Button>
    </div>
  );
};

export default Cart;