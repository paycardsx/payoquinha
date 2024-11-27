import React, { useState } from 'react';
import Header from '@/components/Header';
import MenuItem from '@/components/MenuItem';
import DeliveryCheck from '@/components/DeliveryCheck';
import Cart from '@/components/Cart';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

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

const EXTRAS = [
  { id: 'extra-cheese', name: 'Queijo Coalho Extra', price: 3.00 },
  { id: 'extra-dulce', name: 'Doce de Leite Extra', price: 2.00 },
];

const Index = () => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [deliveryPrice, setDeliveryPrice] = useState(5);

  const handleAddItem = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveItem = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id]--;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-secondary mb-4">
            Saboreie nossas deliciosas tapiocas!
          </h2>
          <p className="text-text-secondary text-lg mb-4">
            Escolha sua tapioca favorita e receba no conforto da sua casa
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full">
            <h2 className="section-title">Tapiocas Salgadas</h2>
            <div className="grid gap-6">
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
          </div>

          <div className="col-span-full">
            <h2 className="section-title">Tapiocas Doces</h2>
            <div className="grid gap-6">
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
          </div>
        </div>

        <div className="mt-12">
          <DeliveryCheck
            onDeliveryPrice={setDeliveryPrice}
            totalItems={Object.values(cart).reduce((acc, curr) => acc + curr, 0)}
          />
        </div>

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
      />

      <Footer />
    </div>
  );
};

export default Index;
