import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import CartContent from './CartContent';
import CartHeader from './cart/CartHeader';
import CartButton from './cart/CartButton';
import DeliveryAddressForm, { DeliveryAddress } from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

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
    console.log('Updating quantity:', itemName, newQuantity);
    if (newQuantity < 0) return;
    onUpdateQuantity?.(itemName, newQuantity);
  };

  const handleRemoveItem = (itemName: string) => {
    console.log('Removing item:', itemName);
    onRemoveItem?.(itemName);
    toast.info(`${itemName} removido do carrinho`);
  };

  const handleClearCart = () => {
    console.log('Clearing cart');
    onClearCart?.();
    setIsExpanded(false);
  };

  const handleAddressSubmit = (address: DeliveryAddress) => {
    setDeliveryAddress(address);
    setShowAddressForm(false);
    toast.success('Endereço de entrega salvo!');
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      console.log('Expandindo carrinho');
    } else {
      console.log('Minimizando carrinho para continuar comprando');
    }
  };

  const handleWhatsAppClick = () => {
    console.log('Enviando pedido via WhatsApp');
    toast.success('Redirecionando para o WhatsApp...');
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
            <CartHeader
              isExpanded={isExpanded}
              itemCount={itemCount}
              onClearCart={handleClearCart}
              onToggleExpand={handleToggleExpand}
            />
            
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
                  <OrderSummary
                    subtotal={subtotal}
                    deliveryPrice={deliveryPrice}
                    total={total}
                    paymentMethod={paymentMethod}
                    cashAmount={cashAmount}
                    change={change}
                    deliveryAddress={deliveryAddress}
                    onPaymentMethodChange={setPaymentMethod}
                    onCashAmountChange={setCashAmount}
                    onEditAddress={() => setShowAddressForm(true)}
                    onWhatsAppClick={handleWhatsAppClick}
                  />
                )}
              </>
            )}
          </motion.div>
        ) : (
          <CartButton itemCount={itemCount} onExpand={handleToggleExpand} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;