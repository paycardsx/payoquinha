import React from 'react';
import { Button } from './ui/button';
import PaymentSelector from './PaymentSelector';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { DeliveryAddress } from './DeliveryAddressForm';

interface OrderSummaryProps {
  subtotal: number;
  deliveryPrice: number;
  total: number;
  paymentMethod: string;
  cashAmount: number;
  change: number;
  deliveryAddress: DeliveryAddress | null;
  onPaymentMethodChange: (method: string) => void;
  onCashAmountChange: (amount: number) => void;
  onEditAddress: () => void;
  onWhatsAppClick: () => void;
}

const OrderSummary = ({
  subtotal,
  deliveryPrice,
  total,
  paymentMethod,
  cashAmount,
  change,
  deliveryAddress,
  onPaymentMethodChange,
  onCashAmountChange,
  onEditAddress,
  onWhatsAppClick
}: OrderSummaryProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
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
          onClick={onEditAddress}
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
                onClick={onEditAddress}
              >
                Editar
              </Button>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <PaymentSelector
              onPaymentMethodChange={onPaymentMethodChange}
              onCashAmountChange={onCashAmountChange}
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
            onClick={onWhatsAppClick}
          >
            Finalizar Pedido
          </Button>
        </>
      )}
    </div>
  );
};

export default OrderSummary;