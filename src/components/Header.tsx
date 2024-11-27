import React from 'react';
import { Clock } from 'lucide-react';

const Header = () => {
  return (
    <>
      <div className="bg-primary/10 text-secondary py-2 px-4 text-center font-montserrat text-sm fixed top-0 left-0 right-0 z-50">
        <Clock className="inline-block mr-2 h-4 w-4" />
        Aberto de 16:45 às 21:00 (Segunda a Sábado) - Faça seu pedido dentro do horário de funcionamento!
      </div>
      
      <header className="bg-gradient-to-b from-primary to-primary/90 py-16 shadow-lg mt-10">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
              Payoca
              <span className="block text-xl md:text-2xl font-normal mt-2">
                Tapiocas com Goma Rendada
              </span>
            </h1>
            
            <div className="mt-8 space-y-2">
              <p className="text-secondary/80 text-lg">
                Entregamos em toda parte alta de Maceió
              </p>
              <p className="text-secondary font-semibold text-lg animate-float">
                Frete grátis em pedidos acima de 5 tapiocas
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;