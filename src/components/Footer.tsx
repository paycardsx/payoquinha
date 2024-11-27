import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-montserrat font-semibold">Endereço</h3>
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              R. Santa Mariana, 242 - Antares, Maceió - AL
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-montserrat font-semibold">Contato</h3>
            <p className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              +55 (82) 9-9415-0378
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-montserrat font-semibold">Horário</h3>
            <p className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              16:45 às 21:00 (Segunda a Sábado)
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Payoca - Tapiocas com Goma Rendada. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;