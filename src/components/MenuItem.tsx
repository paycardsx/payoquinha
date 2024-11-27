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
    <div className="bg-white rounded-lg p-4 shadow card-hover">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-text-secondary text-sm mb-2">{description}</p>
          <p className="text-text-secondary font-semibold">R$ {price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          {quantity > 0 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
            </>
          )}
          <Button
            variant="default"
            size="icon"
            onClick={onAdd}
            className="h-8 w-8 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;