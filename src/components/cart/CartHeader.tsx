import React from 'react';
import { ShoppingCart, X, Trash2, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface CartHeaderProps {
  isExpanded: boolean;
  itemCount: number;
  onClearCart: () => void;
  onToggleExpand: () => void;
}

const CartHeader = ({ isExpanded, itemCount, onClearCart, onToggleExpand }: CartHeaderProps) => {
  const handleClearCart = () => {
    onClearCart();
    toast.info('Carrinho limpo com sucesso');
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <ShoppingCart className="text-primary" />
        <h3 className="text-lg font-semibold text-secondary">Seu Pedido</h3>
      </div>
      <div className="flex items-center gap-2">
        {itemCount > 0 && (
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
          onClick={onToggleExpand}
          className="hover:bg-primary/10 rounded-full"
        >
          {isExpanded ? <X className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;