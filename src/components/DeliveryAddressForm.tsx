import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { NEIGHBORHOODS } from '@/lib/constants';
import { toast } from 'sonner';

interface DeliveryAddressFormProps {
  selectedNeighborhood: string;
  onAddressSubmit: (address: DeliveryAddress) => void;
}

export interface DeliveryAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  zipCode: string;
}

const DeliveryAddressForm = ({ selectedNeighborhood, onAddressSubmit }: DeliveryAddressFormProps) => {
  const [formData, setFormData] = React.useState<DeliveryAddress>({
    street: '',
    number: '',
    complement: '',
    neighborhood: selectedNeighborhood || '',
    zipCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.street || !formData.number || !formData.neighborhood || !formData.zipCode) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    onAddressSubmit(formData);
  };

  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="street" className="text-sm font-medium text-secondary">
          Rua *
        </label>
        <Input
          id="street"
          value={formData.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
          placeholder="Digite o nome da rua"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="number" className="text-sm font-medium text-secondary">
            Número *
          </label>
          <Input
            id="number"
            value={formData.number}
            onChange={(e) => handleInputChange('number', e.target.value)}
            placeholder="Nº"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="complement" className="text-sm font-medium text-secondary">
            Complemento
          </label>
          <Input
            id="complement"
            value={formData.complement}
            onChange={(e) => handleInputChange('complement', e.target.value)}
            placeholder="Apto, Bloco, etc."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="neighborhood" className="text-sm font-medium text-secondary">
          Bairro *
        </label>
        <Select
          value={formData.neighborhood}
          onValueChange={(value) => handleInputChange('neighborhood', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o bairro" />
          </SelectTrigger>
          <SelectContent>
            {NEIGHBORHOODS.filter(n => n.available).map((neighborhood) => (
              <SelectItem key={neighborhood.name} value={neighborhood.name}>
                {neighborhood.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="zipCode" className="text-sm font-medium text-secondary">
          CEP *
        </label>
        <Input
          id="zipCode"
          value={formData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          placeholder="00000-000"
          required
        />
      </div>
    </form>
  );
};

export default DeliveryAddressForm;