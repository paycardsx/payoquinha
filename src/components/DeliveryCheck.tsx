import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { NEIGHBORHOODS } from '@/lib/constants';

interface DeliveryCheckProps {
  onDeliveryPrice: (price: number, neighborhood: string) => void;
  totalItems: number;
}

const DeliveryCheck = ({ onDeliveryPrice, totalItems }: DeliveryCheckProps) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [deliveryInfo, setDeliveryInfo] = useState<typeof NEIGHBORHOODS[number] | null>(null);

  useEffect(() => {
    if (selectedNeighborhood) {
      const neighborhood = NEIGHBORHOODS.find(n => n.name === selectedNeighborhood);
      if (neighborhood) {
        setDeliveryInfo(neighborhood);
        
        if (!neighborhood.available) {
          if (neighborhood.name === 'Clima Bom') {
            toast.info('Entregas em Clima Bom estarão disponíveis em breve!');
          } else {
            toast.info('Ainda não realizamos entregas nesse bairro. Em breve, expandiremos nosso atendimento!');
          }
          onDeliveryPrice(0, selectedNeighborhood);
          return;
        }

        const isFreeDelivery = totalItems >= 5 && neighborhood.distance <= 4;
        const deliveryPrice = isFreeDelivery ? 0 : neighborhood.freight;
        onDeliveryPrice(deliveryPrice, selectedNeighborhood);

        if (isFreeDelivery) {
          toast.success('Frete grátis aplicado ao seu pedido!');
        }
      }
    }
  }, [selectedNeighborhood, totalItems, onDeliveryPrice]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg space-y-4 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-primary">Consultar Entrega</h3>
      
      <Select onValueChange={setSelectedNeighborhood} value={selectedNeighborhood}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione seu bairro" />
        </SelectTrigger>
        <SelectContent>
          {NEIGHBORHOODS.sort((a, b) => a.name.localeCompare(b.name)).map((neighborhood) => (
            <SelectItem key={neighborhood.name} value={neighborhood.name}>
              {neighborhood.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {deliveryInfo && deliveryInfo.available && (
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Distância: {deliveryInfo.distance} km</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Tempo estimado: {deliveryInfo.time} minutos</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Truck className="h-4 w-4" />
            <span>
              {totalItems >= 5 && deliveryInfo.distance <= 4
                ? 'Frete grátis para este pedido!'
                : `Frete: R$ ${deliveryInfo.freight.toFixed(2)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCheck;