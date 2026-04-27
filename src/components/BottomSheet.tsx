import { useEffect } from 'react';
import { motion, useAnimation, type PanInfo } from 'framer-motion';
import { useStore } from '../store';
import { PlaceCard } from './PlaceCard';
import { X, ChevronRight } from 'lucide-react';
import { discoverPlace } from '../lib/discovery';

export const BottomSheet: React.FC = () => {
  const { 
    discoveredPlace, 
    setDiscoveredPlace, 
    bottomSheetState, 
    setBottomSheetState,
    credits,
    deductCredit,
    isDiscovering,
    setIsDiscovering
  } = useStore();
  
  const controls = useAnimation();

  // If we have a place, snap to peek state (half screen)
  useEffect(() => {
    if (discoveredPlace && bottomSheetState === 'dismissed') {
      setBottomSheetState('peek');
    } else if (!discoveredPlace && bottomSheetState !== 'dismissed') {
      setBottomSheetState('dismissed');
    }
  }, [discoveredPlace, setBottomSheetState, bottomSheetState]);

  useEffect(() => {
    if (bottomSheetState === 'dismissed') {
      controls.start({ y: '100%' });
    } else if (bottomSheetState === 'peek') {
      controls.start({ y: '50%' }); // Half screen
    } else if (bottomSheetState === 'expanded') {
      controls.start({ y: '10%' }); // Expanded
    }
  }, [bottomSheetState, controls]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    
    if (info.velocity.y > 500 || info.offset.y > threshold) {
      // Swiped down
      if (bottomSheetState === 'expanded') setBottomSheetState('peek');
      else {
        setBottomSheetState('dismissed');
        setTimeout(() => setDiscoveredPlace(null), 300);
      }
    } else if (info.velocity.y < -500 || info.offset.y < -threshold) {
      // Swiped up
      if (bottomSheetState === 'peek') setBottomSheetState('expanded');
    }
  };

  const handleNextDiscovery = async () => {
    if (credits <= 0) return;
    setIsDiscovering(true);
    deductCredit();
    
    // Simulate getting map center
    const mockMapCenter = { lat: 41.9028, lng: 12.4964 }; // Rome
    
    const place = await discoverPlace(mockMapCenter, 'all');
    if (place) {
      // Trigger a small animation or transition
      setDiscoveredPlace(place);
    }
    setIsDiscovering(false);
  };

  const handleClose = () => {
    setBottomSheetState('dismissed');
    setTimeout(() => setDiscoveredPlace(null), 300);
  };

  if (!discoveredPlace) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={controls}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute bottom-0 w-full h-full z-30 pointer-events-none"
    >
      <div className="absolute w-full h-full glass bg-black/60 rounded-t-[32px] p-6 pointer-events-auto border-t border-white/20 shadow-[0_-8px_30px_rgb(0,0,0,0.5)]">
        {/* Grabber */}
        <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-4" />
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
          
          <button 
            onClick={handleNextDiscovery}
            disabled={isDiscovering}
            className={`flex items-center gap-1 bg-white/10 pl-4 pr-3 py-1.5 rounded-full hover:bg-white/20 transition-colors ${isDiscovering ? 'opacity-50' : ''}`}
          >
            <span className="text-sm font-medium">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Place Content */}
        <PlaceCard place={discoveredPlace} />
        
      </div>
    </motion.div>
  );
};
