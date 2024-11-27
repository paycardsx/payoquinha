import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  onAdd: () => void;
  onRemove: () => void;
  quantity: number;
}

const MenuItem = ({ name, description, price, onAdd, onRemove, quantity }: MenuItemProps) => {
  return (
    <div className="menu-item group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-montserrat font-semibold text-secondary group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-text-secondary text-sm mt-2 leading-relaxed">
            {description}
          </p>
          <p className="text-primary font-semibold mt-3 text-lg">
            R$ {price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {quantity > 0 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 border-secondary hover:bg-secondary/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
            </>
          )}
          <Button
            variant="default"
            size="icon"
            onClick={onAdd}
            className="h-8 w-8 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;