import React from 'react';
import { Clock, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-primary/10 text-secondary py-2 px-4 text-center font-montserrat text-sm fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      >
        <Clock className="inline-block mr-2 h-4 w-4" />
        Aberto de 16:45 às 21:00 (Segunda a Sábado) - Faça seu pedido dentro do horário de funcionamento!
      </motion.div>
      
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-12 shadow-xl mt-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <img 
                src="/payoca-logo.png" 
                alt="Payoca Logo" 
                className="w-48 md:w-64 h-auto drop-shadow-lg animate-float"
              />
            </motion.div>
            
            <div className="mt-8 space-y-3">
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-secondary/80 text-lg md:text-xl"
              >
                Entregamos em toda parte alta de Maceió
              </motion.p>
              <motion.p 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-secondary font-semibold text-lg md:text-xl animate-float"
              >
                Frete grátis em pedidos acima de 5 tapiocas
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;