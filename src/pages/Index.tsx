import React, { useState } from 'react';
import Header from '@/components/Header';
import MenuItem from '@/components/MenuItem';
import DeliveryCheck from '@/components/DeliveryCheck';
import Cart from '@/components/Cart';

const MENU_ITEMS = {
  salgadas: [
    { id: 1, name: 'Tradicional', price: 8.00 },
    { id: 2, name: 'Coco & Queijo Coalho', price: 10.00 },
    { id: 3, name: 'Banana & Queijo Coalho', price: 10.00 },
    { id: 4, name: 'Frango & Mussarela', price: 12.00 },
  ],
  doces: [
    { id: 5, name: 'Coco & Doce de Leite', price: 10.00 },
    { id: 6, name: 'Morango & Doce de Leite', price: 12.00 },
    { id: 7, name: 'Banana & Doce de Leite', price: 10.00 },
  ],
};

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
          <p className="text-text-secondary text-lg">
            Escolha sua tapioca favorita e receba no conforto de sua casa!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="col-span-full">
            <h2 className="text-2xl font-bold mb-4">Tapiocas Salgadas</h2>
            <div className="grid gap-4">
              {MENU_ITEMS.salgadas.map((item) => (
                <MenuItem
                  key={item.id}
                  name={item.name}
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
      </main>

      <Cart
        items={cartItems}
        deliveryPrice={deliveryPrice}
      />
    </div>
  );
};

export default Index;