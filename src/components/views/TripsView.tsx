import React from 'react';
import { useStore } from '../../store';
import { ArrowLeft, Map as MapIcon } from 'lucide-react';

export const TripsView: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="absolute inset-0 z-40 bg-black overflow-y-auto pb-safe pt-safe">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button 
          onClick={() => setCurrentView('myaccount')} 
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold tracking-wide">Itinerary</h1>
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center opacity-50">
        <MapIcon className="w-16 h-16 mb-4" />
        <h2 className="text-xl font-bold">No Saved Trips</h2>
        <p className="mt-2 text-sm max-w-xs">Save places you want to visit for future trips.</p>
      </div>
    </div>
  );
};
