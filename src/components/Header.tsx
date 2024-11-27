import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary py-6 shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-secondary text-center">
          Payoca
          <span className="block text-lg font-normal">Tapiocas com Goma Rendada</span>
        </h1>
        <div className="mt-4 text-center">
          <p className="text-secondary/80 text-sm">
            Entregamos em toda parte alta de Maceió
          </p>
          <p className="text-secondary/80 text-sm">
            Frete grátis em pedidos acima de 5 tapiocas
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;