import { useState } from 'react';
import { useStore } from '../store';
import { Coffee, Search, Utensils, GlassWater, TreePine, Mountain, History, Palette, ShoppingBag, Library, BookOpen, Store, Hammer } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Surprise Me', icon: Search },
  { id: 'restaurant', label: 'Restaurants', icon: Utensils },
  { id: 'takeaway', label: 'Take-away', icon: ShoppingBag },
  { id: 'cafe', label: 'Cafes', icon: Coffee },
  { id: 'bakery', label: 'Bakeries', icon: Coffee }, // Could use a Croissant icon if lucide had one, Coffee works
  { id: 'bar', label: 'Bars', icon: GlassWater },
  { id: 'park', label: 'Parks', icon: TreePine },
  { id: 'library', label: 'Libraries', icon: Library },
  { id: 'bookstore', label: 'Bookstores', icon: BookOpen },
  { id: 'museum', label: 'Museums', icon: History },
  { id: 'gallery', label: 'Galleries', icon: Palette },
  { id: 'market', label: 'Markets', icon: Store },
  { id: 'viewpoint', label: 'Viewpoints', icon: Mountain },
  { id: 'workshop', label: 'Artisan Workshops', icon: Hammer },
];

export const CategoryPills = () => {
  const { isDiscovering, selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 snap-x no-scrollbar mask-edges pt-2">
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            disabled={isDiscovering}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap snap-start transition-all
              ${isActive 
                ? 'bg-white/20 text-white font-medium shadow-sm backdrop-blur-md border border-white/30' 
                : 'glass text-white/80 hover:bg-white/10 active:scale-95 border border-transparent'
              }
              ${isDiscovering ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-white/70'}`} />
            <span className="text-sm tracking-wide">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
