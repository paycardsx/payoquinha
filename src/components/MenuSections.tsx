import React from 'react';
import MenuItem from './MenuItem';
import { motion } from 'framer-motion';

interface MenuSectionsProps {
  menuItems: {
    salgadas: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
    }>;
    doces: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
    }>;
  };
  onAddItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  cart: Record<string, number>;
}

const MenuSections = ({ menuItems, onAddItem, onRemoveItem, cart }: MenuSectionsProps) => {
  return (
    <motion.div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-secondary mb-6 pl-4 border-l-4 border-primary">
          Tapiocas Salgadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.salgadas.map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              onAdd={() => onAddItem(item.id)}
              onRemove={() => onRemoveItem(item.id)}
              quantity={cart[item.id] || 0}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-secondary mb-6 pl-4 border-l-4 border-primary">
          Tapiocas Doces
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.doces.map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              onAdd={() => onAddItem(item.id)}
              onRemove={() => onRemoveItem(item.id)}
              quantity={cart[item.id] || 0}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default MenuSections;