import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CartButtonProps {
  itemCount: number;
  onExpand: () => void;
}

const CartButton = ({ itemCount, onExpand }: CartButtonProps) => {
  return (
    <button
      onClick={onExpand}
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
  );
};

export default CartButton;