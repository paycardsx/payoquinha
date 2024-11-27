import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <img
          src="/placeholder.svg"
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-primary text-secondary font-semibold rounded-full w-8 h-8 flex items-center justify-center">
            {quantity}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-montserrat font-semibold text-secondary">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm text-text-secondary">4.8</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-primary font-semibold text-lg">
            R$ {price.toFixed(2)}
          </p>

          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 border-secondary hover:bg-secondary/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
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
    </div>
  );
};

export default MenuItem;