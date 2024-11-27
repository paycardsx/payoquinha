import React, { useState } from 'react';
import Header from '@/components/Header';
import MenuItem from '@/components/MenuItem';
import DeliveryCheck from '@/components/DeliveryCheck';
import Cart from '@/components/Cart';
import Testimonials from '@/components/Testimonials';

const MENU_ITEMS = {
  salgadas: [
    { id: 1, name: 'Tradicional', price: 8.00, description: 'Goma rendada com manteiga' },
    { id: 2, name: 'Coco & Queijo Coalho', price: 10.00, description: 'Goma rendada, coco ralado fresco e queijo coalho artesanal' },
    { id: 3, name: 'Banana & Queijo Coalho', price: 10.00, description: 'Goma rendada, banana frita e queijo coalho artesanal' },
    { id: 4, name: 'Frango & Mussarela', price: 12.00, description: 'Goma rendada, frango desfiado temperado e queijo mussarela' },
  ],
  doces: [
    { id: 5, name: 'Coco & Doce de Leite', price: 10.00, description: 'Goma rendada, coco ralado fresco e doce de leite caseiro' },
    { id: 6, name: 'Morango & Doce de Leite', price: 12.00, description: 'Goma rendada, morango fresco e doce de leite caseiro' },
    { id: 7, name: 'Banana & Doce de Leite', price: 10.00, description: 'Goma rendada, banana caramelizada e doce de leite caseiro' },
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

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const allItems = [...MENU_ITEMS.salgadas, ...MENU_ITEMS.doces];
    const item = allItems.find(item => item.id === parseInt(id));
    return item ? { name: item.name, quantity, price: item.price } : null;
  }).filter(Boolean) as Array<{ name: string; quantity: number; price: number }>;

  const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="min-h-screen pb-32">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo à Payoca!</h2>
          <p className="text-text-secondary text-lg mb-4">
            Escolha sua tapioca favorita e receba no conforto de sua casa!
          </p>
          <div className="bg-primary/10 p-4 rounded-lg inline-block">
            <p className="font-semibold text-secondary">
              Tapiocas feitas com Goma Rendada e Queijo Coalho de verdade!
            </p>
            <p className="text-sm mt-2">
              Entrega rápida e prática na parte alta de Maceió
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="col-span-full">
            <h2 className="text-2xl font-bold mb-4">Tapiocas Salgadas</h2>
            <div className="grid gap-4">
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
            <h2 className="text-2xl font-bold mb-4">Tapiocas Doces</h2>
            <div className="grid gap-4">
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

        <DeliveryCheck
          onDeliveryPrice={setDeliveryPrice}
          totalItems={totalItems}
        />

        <Testimonials />
      </main>

      <Cart
        items={cartItems}
        deliveryPrice={deliveryPrice}
      />
    </div>
  );
};

export default Index;