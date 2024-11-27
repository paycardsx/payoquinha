import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-secondary text-center">
          Payoca
          <span className="block text-lg font-normal">Tapiocas com Goma Rendada</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;