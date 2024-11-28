import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const handleAddItem = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleUpdateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    setCart(prev => {
      if (newQuantity === 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: newQuantity };
    });
  };

  const handleRemoveItem = (itemName: string) => {
    setCart(prev => {
      const { [itemName]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  return {
    cart,
    handleAddItem,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart
  };
};