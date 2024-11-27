import React, { useState } from 'react';
import { ShoppingCart, X, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import PaymentSelector from './PaymentSelector';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
  items: Array<{ name: string; quantity: number; price: number }>;
  deliveryPrice: number;
}

const Cart = ({ items, deliveryPrice }: CartProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [cashAmount, setCashAmount] = useState(0);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryPrice;
  const change = cashAmount > total ? cashAmount - total : 0;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const formatOrderText = () => {
    let text = "Olá! Gostaria de fazer um pedido:\n\n";
    items.forEach(item => {
      text += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    text += `\nSubtotal: R$ ${subtotal.toFixed(2)}`;
    text += `\nEntrega: R$ ${deliveryPrice.toFixed(2)}`;
    text += `\nTotal: R$ ${total.toFixed(2)}`;
    text += `\n\nForma de pagamento: ${paymentMethod.toUpperCase()}`;
    if (paymentMethod === 'cash') {
      text += `\nTroco para: R$ ${cashAmount.toFixed(2)}`;
      text += `\nTroco a receber: R$ ${change.toFixed(2)}`;
    }
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
    <AnimatePresence>
      <motion.div 
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : itemCount > 0 ? '64px' : '0',
          opacity: itemCount > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed z-50 transition-all duration-300 ease-in-out",
          isExpanded 
            ? "bottom-0 right-0 left-0 md:left-auto md:right-4 md:bottom-4 md:w-96 bg-white rounded-t-2xl md:rounded-2xl shadow-2xl" 
            : "bottom-4 right-4 bg-primary rounded-full shadow-lg w-16 h-16 md:w-auto md:h-auto md:rounded-full md:p-4"
        )}
      >
        {isExpanded ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="animate-fade-in"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-primary" />
                <h3 className="text-lg font-semibold">Seu Pedido</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="hover:bg-primary/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between mb-3 p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  <span className="font-medium">{item.quantity}x {item.name}</span>
                  <span className="text-primary font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </motion.div>
              ))}
              
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Entrega</span>
                  <span>R$ {deliveryPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-secondary pt-2">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <PaymentSelector
                  onPaymentMethodChange={setPaymentMethod}
                  onCashAmountChange={setCashAmount}
                />
              </div>

              {paymentMethod === 'cash' && change > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-primary/10 rounded-lg"
                >
                  <p className="font-semibold text-secondary">Troco: R$ {change.toFixed(2)}</p>
                </motion.div>
              )}

              <Button
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-secondary font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={handleWhatsAppClick}
              >
                Enviar Pedido pelo WhatsApp
              </Button>
            </div>
          </motion.div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center md:justify-between gap-2 p-2 md:p-4 text-secondary hover:bg-primary/90 transition-colors rounded-full"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 md:h-5 md:w-5" />
              <span className="hidden md:inline font-medium">Ver Carrinho</span>
            </div>
            {itemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 md:relative md:top-auto md:right-auto bg-secondary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;