import React, { useMemo } from 'react';
import { type Place, useStore } from '../store';
import { Star, Navigation, Bookmark, BookmarkCheck } from 'lucide-react';

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}

export const PlaceCard: React.FC<{ place: Place }> = ({ place }) => {
  const { addPlaceToTrip, trips, userLocation, useMeters } = useStore();
  const [added, setAdded] = React.useState(false);

  const handleSaveToTrip = () => {
    if (trips.length === 0) {
      const newTrip = { id: 't1', name: 'Saved Places', places: [place], createdAt: Date.now() };
      useStore.getState().createTrip(newTrip);
    } else {
      addPlaceToTrip(trips[0].id, place);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank');
  };

  const distanceText = useMemo(() => {
    if (!userLocation) return null;
    const distKm = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, place.lat, place.lng);
    
    if (useMeters) {
      if (distKm < 1) return `${Math.round(distKm * 1000)} m away`;
      return `${distKm.toFixed(1)} km away`;
    } else {
      const distMiles = distKm * 0.621371;
      if (distMiles < 0.1) return `${Math.round(distMiles * 5280)} ft away`;
      return `${distMiles.toFixed(1)} mi away`;
    }
  }, [userLocation, place.lat, place.lng, useMeters]);

  // Make the category readable (first type or fallback)
  const categoryStr = place.types && place.types.length > 0 
    ? place.types[0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Hidden Gem';

  return (
    <div className="flex flex-col gap-4 text-white pb-6">
      
      {/* If we had a photoUrl, we'd render it here */}
      {place.photoUrl && (
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-2 shadow-lg">
          <img src={place.photoUrl} alt={place.name} className="w-full h-full object-cover" />
        </div>
      )}

      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold leading-tight drop-shadow-md">{place.name}</h2>
          <div className="flex flex-col items-end gap-1">
            {place.isOpen !== undefined && (
              <span className={`text-xs px-2 py-1 rounded-md font-bold ${place.isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {place.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
            )}
            {distanceText && (
              <span className="text-xs text-white/60 font-medium whitespace-nowrap bg-white/10 px-2 py-1 rounded-md">
                {distanceText}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-white/80 text-sm mt-1.5 flex items-center gap-1.5 font-medium tracking-wide text-amber-500">
           {categoryStr}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {place.rating && (
          <div className="flex items-center gap-1 font-semibold text-lg drop-shadow">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>{place.rating}</span>
            {place.reviews && <span className="text-sm font-normal text-white/60">({place.reviews})</span>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button 
          onClick={handleSaveToTrip}
          className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-[15px] transition-all shadow-lg ${
            added ? 'bg-emerald-500 text-white border-emerald-400 border' : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
          }`}
        >
          {added ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          {added ? 'Saved' : 'Save'}
        </button>
        <button 
          onClick={handleDirections}
          className="flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold text-[15px] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_4px_15px_rgba(255,255,255,0.3)]"
        >
          <Navigation className="w-5 h-5" /> Google Maps
        </button>
      </div>
    </div>
  );
};
