import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { CartItem } from './Cart';

interface CartContentProps {
  items: CartItem[];
  onUpdateQuantity: (itemName: string, newQuantity: number) => void;
  onRemoveItem: (itemName: string) => void;
}

const CartContent = ({ items, onUpdateQuantity, onRemoveItem }: CartContentProps) => {
  console.log('CartContent rendered with items:', items);

  const handleIncrement = (itemName: string, currentQuantity: number) => {
    console.log('Incrementing quantity for:', itemName);
    onUpdateQuantity(itemName, currentQuantity + 1);
  };

  const handleDecrement = (itemName: string, currentQuantity: number) => {
    console.log('Decrementing quantity for:', itemName);
    if (currentQuantity > 1) {
      onUpdateQuantity(itemName, currentQuantity - 1);
    } else {
      onRemoveItem(itemName);
    }
  };

  return (
    <div className="p-4 max-h-[70vh] overflow-y-auto">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div 
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between mb-3 p-2 hover:bg-surface rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex flex-col">
                <span className="font-medium text-secondary">{item.name}</span>
                <span className="text-sm text-text-secondary">{formatCurrency(item.price)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-surface rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/20 rounded-full"
                  onClick={() => handleDecrement(item.name, item.quantity)}
                >
                  <Minus className="h-4 w-4 text-secondary" />
                </Button>
                <span className="w-8 text-center font-medium text-secondary">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/20 rounded-full"
                  onClick={() => handleIncrement(item.name, item.quantity)}
                >
                  <Plus className="h-4 w-4 text-secondary" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-full"
                onClick={() => onRemoveItem(item.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          Seu carrinho está vazio
        </div>
      )}
    </div>
  );
};

export default CartContent;