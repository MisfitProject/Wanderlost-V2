import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store';

export const SplashView: React.FC = () => {
  const { setCurrentView } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentView('map');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setCurrentView]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        <img 
          src="/wanderlost logo no background.png" 
          alt="Wanderlost Logo" 
          className="w-32 h-32 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          onError={(e) => {
            // Fallback if logo isn't loaded correctly
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <h1 className="text-4xl font-bold tracking-widest uppercase text-white">
          Wanderlost
        </h1>
      </motion.div>
    </motion.div>
  );
};
