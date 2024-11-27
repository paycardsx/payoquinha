import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface DeliveryCheckProps {
  onDeliveryPrice: (price: number) => void;
  totalItems: number;
}

const DeliveryCheck = ({ onDeliveryPrice, totalItems }: DeliveryCheckProps) => {
  const [neighborhood, setNeighborhood] = useState('');

  const checkDelivery = () => {
    const normalizedNeighborhood = neighborhood.toLowerCase().trim();
    
    if (normalizedNeighborhood === 'clima bom') {
      alert('Entregas em Clima Bom estarão disponíveis em breve!');
      return;
    }

    // Simplified delivery logic - can be expanded with more neighborhoods
    const deliveryPrice = totalItems >= 5 ? 0 : 5;
    onDeliveryPrice(deliveryPrice);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="text-xl font-semibold mb-4">Consultar Entrega</h3>
      <div className="flex gap-2">
        <Input
          placeholder="Digite seu bairro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
        <Button onClick={checkDelivery} className="bg-primary hover:bg-primary/90">
          Verificar
        </Button>
      </div>
    </div>
  );
};

export default DeliveryCheck;