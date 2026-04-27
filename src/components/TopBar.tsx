import React from 'react';
import { useStore } from '../store';
import { Search, Menu } from 'lucide-react';
import { CategoryPills } from './CategoryPills';

export const TopBar: React.FC = () => {
  const { credits, setCurrentView } = useStore();

  return (
    <div className="absolute top-0 w-full z-20 pointer-events-none">
      <div className="pt-safe pb-2 bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-[2px]">
        <div className="flex justify-between items-center px-4 pt-4 pb-2 pointer-events-auto">
          
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-2">
            <img 
              src="/wanderlost logo no background.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-xl font-bold tracking-widest uppercase">
              Wonderlost
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* 3 Free Discoveries Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center">
              <span className="text-xs font-semibold text-white/90">
                {credits} Free Discoveries Remaining
              </span>
            </div>

            {/* Search */}
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>

            {/* Settings (Hamburger) */}
            <button 
              onClick={() => setCurrentView('settings')}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Category Pills directly underneath the top bar */}
        <div className="px-4 pointer-events-auto">
          <CategoryPills />
        </div>
      </div>
    </div>
  );
};
