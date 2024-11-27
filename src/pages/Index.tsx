import React, { useState } from 'react';
import Header from '@/components/Header';
import MenuItem from '@/components/MenuItem';
import DeliveryCheck from '@/components/DeliveryCheck';
import Cart from '@/components/Cart';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const MENU_ITEMS = {
  salgadas: [
    { 
      id: 1, 
      name: 'Tradicional', 
      price: 13.20, 
      description: 'Goma rendada de queijo / coco' 
    },
    { 
      id: 2, 
      name: 'Coco & Queijo Coalho', 
      price: 15.20, 
      description: 'Goma rendada de queijo / coco com queijo coalho' 
    },
    { 
      id: 3, 
      name: 'Banana & Queijo Coalho', 
      price: 15.20, 
      description: 'Goma rendada de queijo / banana com queijo coalho' 
    },
    { 
      id: 4, 
      name: 'Frango & Mussarela', 
      price: 16.20, 
      description: 'Goma rendada de queijo / frango com mussarela' 
    },
  ],
  doces: [
    { 
      id: 5, 
      name: 'Coco & Doce de Leite', 
      price: 15.20, 
      description: 'Goma rendada de queijo / coco e leite condensado' 
    },
    { 
      id: 6, 
      name: 'Morango & Doce de Leite', 
      price: 16.20, 
      description: 'Goma rendada de queijo / morango e leite condensado' 
    },
    { 
      id: 7, 
      name: 'Banana & Doce de Leite', 
      price: 15.20, 
      description: 'Goma rendada de queijo / morango e leite condensado' 
    },
  ],
};

const Index = () => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [deliveryPrice, setDeliveryPrice] = useState(5);

  const handleAddItem = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev, [id]: (prev[id] || 0) + 1 };
      const item = [...MENU_ITEMS.salgadas, ...MENU_ITEMS.doces].find(item => item.id === id);
      if (item) {
        toast.success(`${item.name} adicionado ao carrinho`);
      }
      return newCart;
    });
  };

  const handleUpdateQuantity = (itemName: string, newQuantity: number) => {
    const item = [...MENU_ITEMS.salgadas, ...MENU_ITEMS.doces].find(item => item.name === itemName);
    if (!item) return;

    setCart(prev => {
      if (newQuantity === 0) {
        const { [item.id]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item.id]: newQuantity };
    });
  };

  const handleRemoveItem = (itemName: string) => {
    const item = [...MENU_ITEMS.salgadas, ...MENU_ITEMS.doces].find(item => item.name === itemName);
    if (!item) return;

    setCart(prev => {
      const { [item.id]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
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

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          <section>
            <h2 className="text-2xl font-bold text-secondary mb-6 pl-4 border-l-4 border-primary">
              Tapiocas Salgadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENU_ITEMS.salgadas.map((item) => (
                <MenuItem
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  onAdd={() => handleAddItem(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
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
              {MENU_ITEMS.doces.map((item) => (
                <MenuItem
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  onAdd={() => handleAddItem(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
                  quantity={cart[item.id] || 0}
                />
              ))}
            </div>
          </section>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-xl mx-auto"
        >
          <DeliveryCheck
            onDeliveryPrice={setDeliveryPrice}
            totalItems={Object.values(cart).reduce((acc, curr) => acc + curr, 0)}
          />
        </motion.div>

        <div className="mt-16">
          <Testimonials />
        </div>
      </main>

      <Cart
        items={Object.entries(cart).map(([id, quantity]) => {
          const allItems = [...MENU_ITEMS.salgadas, ...MENU_ITEMS.doces];
          const item = allItems.find(item => item.id === parseInt(id));
          return item ? { name: item.name, quantity, price: item.price } : null;
        }).filter(Boolean) as Array<{ name: string; quantity: number; price: number }>}
        deliveryPrice={deliveryPrice}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <Footer />
    </div>
  );
};

export default Index;
