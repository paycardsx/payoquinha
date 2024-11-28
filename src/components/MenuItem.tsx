import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  onAdd: () => void;
  onRemove: () => void;
  quantity: number;
}

const MenuItem = ({ name, description, price, onAdd, onRemove, quantity }: MenuItemProps) => {
  const handleAdd = () => {
    onAdd();
    toast.success(`${name} adicionado ao carrinho`);
  };

  const handleRemove = () => {
    onRemove();
    if (quantity === 1) {
      toast.info(`${name} removido do carrinho`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
    >
      <div className="relative aspect-video overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <img
          src="/placeholder.svg"
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {quantity > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-primary text-secondary font-semibold rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
          >
            {quantity}
          </motion.div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-montserrat font-semibold text-secondary line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm text-secondary font-medium">4.8</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2 h-10">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-primary font-bold text-lg">
            R$ {price.toFixed(2)}
          </p>

          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleRemove}
                className="h-9 w-9 border-secondary hover:bg-secondary/10 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="default"
              size="icon"
              onClick={handleAdd}
              className="h-9 w-9 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;