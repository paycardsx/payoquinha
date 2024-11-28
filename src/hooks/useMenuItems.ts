import { useState } from 'react';

const INITIAL_MENU_ITEMS = {
  salgadas: [
    { 
      id: '1', 
      name: 'Tradicional', 
      price: 13.20, 
      description: 'Goma rendada de queijo / coco' 
    },
    { 
      id: '2', 
      name: 'Coco & Queijo Coalho', 
      price: 15.20, 
      description: 'Goma rendada de queijo / coco com queijo coalho' 
    },
    { 
      id: '3', 
      name: 'Banana & Queijo Coalho', 
      price: 15.20, 
      description: 'Goma rendada de queijo / banana com queijo coalho' 
    },
    { 
      id: '4', 
      name: 'Frango & Mussarela', 
      price: 16.20, 
      description: 'Goma rendada de queijo / frango com mussarela' 
    },
  ],
  doces: [
    { 
      id: '5', 
      name: 'Coco & Doce de Leite', 
      price: 15.20, 
      description: 'Goma rendada de queijo / coco e leite condensado' 
    },
    { 
      id: '6', 
      name: 'Morango & Doce de Leite', 
      price: 16.20, 
      description: 'Goma rendada de queijo / morango e leite condensado' 
    },
    { 
      id: '7', 
      name: 'Banana & Doce de Leite', 
      price: 15.20, 
      description: 'Goma rendada de queijo / morango e leite condensado' 
    },
  ],
};

export const useMenuItems = () => {
  const [menuItems] = useState(INITIAL_MENU_ITEMS);
  return { menuItems };
};