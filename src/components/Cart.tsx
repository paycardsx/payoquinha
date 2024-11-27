import React, { useState } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import PaymentSelector from './PaymentSelector';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import CartContent from './CartContent';
import DeliveryAddressForm, { DeliveryAddress } from './DeliveryAddressForm';

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
  deliveryPrice: number;
  selectedNeighborhood: string;
  onUpdateQuantity?: (itemName: string, newQuantity: number) => void;
  onRemoveItem?: (itemName: string) => void;
  onClearCart?: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const Cart = ({ 
  items, 
  deliveryPrice, 
  selectedNeighborhood,
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart 
}: CartProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [cashAmount, setCashAmount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryPrice;
  const change = cashAmount > total ? cashAmount - total : 0;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleUpdateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    onUpdateQuantity?.(itemName, newQuantity);
    
    if (newQuantity === 0) {
      toast.info(`${itemName} removido do carrinho`);
    }
  };

  const handleRemoveItem = (itemName: string) => {
    onRemoveItem?.(itemName);
    toast.info(`${itemName} removido do carrinho`);
  };

  const handleClearCart = () => {
    onClearCart?.();
    toast.info('Carrinho limpo com sucesso');
    setIsExpanded(false);
  };

  const handleAddressSubmit = (address: DeliveryAddress) => {
    setDeliveryAddress(address);
    setShowAddressForm(false);
    toast.success('Endereço de entrega salvo!');
  };

  const formatOrderText = () => {
    if (!deliveryAddress) {
      toast.error('Por favor, preencha o endereço de entrega');
      return null;
    }

    let text = "Olá! Gostaria de fazer um pedido:\n\n";
    items.forEach(item => {
      text += `${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}\n`;
    });
    text += `\nSubtotal: ${formatCurrency(subtotal)}`;
    text += `\nEntrega: ${formatCurrency(deliveryPrice)}`;
    text += `\nTotal: ${formatCurrency(total)}`;
    text += `\n\nEndereço de entrega:`;
    text += `\nRua: ${deliveryAddress.street}, ${deliveryAddress.number}`;
    if (deliveryAddress.complement) {
      text += `\nComplemento: ${deliveryAddress.complement}`;
    }
    text += `\nBairro: ${deliveryAddress.neighborhood}`;
    text += `\nCEP: ${deliveryAddress.zipCode}`;
    text += `\n\nForma de pagamento: ${paymentMethod.toUpperCase()}`;
    if (paymentMethod === 'cash') {
      text += `\nTroco para: ${formatCurrency(cashAmount)}`;
      text += `\nTroco a receber: ${formatCurrency(change)}`;
    }
    return encodeURIComponent(text);
  };

  const handleWhatsAppClick = () => {
    if (items.length === 0) {
      toast.error('Adicione itens ao carrinho primeiro!');
      return;
    }

    if (!deliveryAddress) {
      toast.error('Por favor, preencha o endereço de entrega');
      setShowAddressForm(true);
      return;
    }

    const orderText = formatOrderText();
    if (orderText) {
      window.open(`https://wa.me/5582994150378?text=${orderText}`, '_blank');
    }
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
                <h3 className="text-lg font-semibold text-secondary">Seu Pedido</h3>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearCart}
                    className="hover:bg-red-50 hover:text-red-500 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="hover:bg-primary/10 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {showAddressForm ? (
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-4">Endereço de Entrega</h4>
                <DeliveryAddressForm
                  selectedNeighborhood={selectedNeighborhood}
                  onAddressSubmit={handleAddressSubmit}
                />
              </div>
            ) : (
              <>
                <CartContent
                  items={items}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />

                {items.length > 0 && (
                  <div className="p-4">
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm text-text-secondary">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-text-secondary">
                        <span>Entrega</span>
                        <span>{formatCurrency(deliveryPrice)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg text-secondary pt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>

                    {!deliveryAddress && (
                      <Button
                        className="w-full mt-6"
                        onClick={() => setShowAddressForm(true)}
                      >
                        Adicionar Endereço de Entrega
                      </Button>
                    )}

                    {deliveryAddress && (
                      <>
                        <div className="mt-6 p-3 bg-surface rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">Endereço de Entrega</h4>
                              <p className="text-sm text-text-secondary mt-1">
                                {deliveryAddress.street}, {deliveryAddress.number}
                                {deliveryAddress.complement && ` - ${deliveryAddress.complement}`}
                                <br />
                                {deliveryAddress.neighborhood} - CEP: {deliveryAddress.zipCode}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowAddressForm(true)}
                            >
                              Editar
                            </Button>
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
                            <p className="font-semibold text-secondary">
                              Troco: {formatCurrency(change)}
                            </p>
                          </motion.div>
                        )}

                        <Button
                          className="w-full mt-6 bg-primary hover:bg-primary/90 text-secondary font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                          onClick={handleWhatsAppClick}
                        >
                          Enviar Pedido pelo WhatsApp
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
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