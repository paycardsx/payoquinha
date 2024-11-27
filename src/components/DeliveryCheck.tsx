import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface Neighborhood {
  name: string;
  distance: number;
  time: number;
  available: boolean;
  freight: number;
}

interface DeliveryCheckProps {
  onDeliveryPrice: (price: number) => void;
  totalItems: number;
}

const NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Antares', distance: 1, time: 3, available: true, freight: 5 },
  { name: 'Santa Lúcia', distance: 1.5, time: 5, available: true, freight: 5 },
  { name: 'Canaã', distance: 2, time: 6, available: true, freight: 5 },
  { name: 'Cleto Marques Luz', distance: 2, time: 7, available: true, freight: 5 },
  { name: 'Grand Jardim', distance: 2.5, time: 8, available: true, freight: 5 },
  { name: 'Aldebaran', distance: 3, time: 9, available: true, freight: 7 },
  { name: 'Serraria', distance: 3, time: 10, available: true, freight: 7 },
  { name: 'Eustáquio', distance: 3, time: 9, available: true, freight: 7 },
  { name: 'Salvador Lyra', distance: 3.5, time: 10, available: true, freight: 7 },
  { name: 'Tabuleiro do Martins', distance: 4, time: 12, available: true, freight: 7 },
  { name: 'Santos Dumont', distance: 4, time: 12, available: true, freight: 7 },
  { name: 'Graciliano Ramos', distance: 4.5, time: 13, available: true, freight: 10 },
  { name: 'Cidade Universitária', distance: 5, time: 15, available: true, freight: 10 },
  { name: 'Clima Bom', distance: 5.5, time: 16, available: false, freight: 0 },
  { name: 'Benedito Bentes 1', distance: 6, time: 18, available: true, freight: 10 },
  { name: 'Outros Bairros', distance: 0, time: 0, available: false, freight: 0 },
];

const DeliveryCheck = ({ onDeliveryPrice, totalItems }: DeliveryCheckProps) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [deliveryInfo, setDeliveryInfo] = useState<Neighborhood | null>(null);

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
          onDeliveryPrice(0);
          return;
        }

        const isFreeDelivery = totalItems >= 5 && neighborhood.distance <= 4;
        const deliveryPrice = isFreeDelivery ? 0 : neighborhood.freight;
        onDeliveryPrice(deliveryPrice);

        if (isFreeDelivery) {
          toast.success('Frete grátis aplicado ao seu pedido!');
        }
      }
    }
  }, [selectedNeighborhood, totalItems, onDeliveryPrice]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg space-y-4">
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