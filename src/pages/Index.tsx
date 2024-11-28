import React, { useState } from 'react';
import Header from '@/components/Header';
import MenuItem from '@/components/MenuItem';
import DeliveryCheck from '@/components/DeliveryCheck';
import Cart from '@/components/Cart';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useCart } from '@/hooks/useCart';

const Index = () => {
  const { menuItems } = useMenuItems();
  const [deliveryPrice, setDeliveryPrice] = useState(5);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const { cart, handleAddItem, handleUpdateQuantity, handleRemoveItem, handleClearCart } = useCart();

  const handleDeliveryCheck = (price: number, neighborhood: string) => {
    setDeliveryPrice(price);
    setSelectedNeighborhood(neighborhood);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Cardápio Digital
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Escolha suas tapiocas favoritas e receba no conforto da sua casa
          </p>
        </motion.div>

        <MenuSections 
          menuItems={menuItems} 
          onAddItem={handleAddItem} 
          onRemoveItem={handleRemoveItem}
          cart={cart}
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-xl mx-auto"
        >
          <DeliveryCheck
            onDeliveryPrice={handleDeliveryCheck}
            totalItems={Object.values(cart).reduce((acc, curr) => acc + curr, 0)}
          />
        </motion.div>

        <div className="mt-16">
          <Testimonials />
        </div>
      </main>

      <Cart
        items={Object.entries(cart).map(([id, quantity]) => {
          const allItems = [...menuItems.salgadas, ...menuItems.doces];
          const item = allItems.find(item => item.id.toString() === id);
          return item ? { name: item.name, quantity, price: item.price } : null;
        }).filter(Boolean) as Array<{ name: string; quantity: number; price: number }>}
        deliveryPrice={deliveryPrice}
        selectedNeighborhood={selectedNeighborhood}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <Footer />
    </div>
  );
};

export default Index;