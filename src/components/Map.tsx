import { useEffect } from 'react';
import { APIProvider, Map as GoogleMap, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useStore } from '../store';

// Premium minimalist dark theme for the map
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#121212' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#121212' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#888888' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#a3a3a3' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#555555' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#18201a' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#222222' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1a1a1a' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#333333' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0a0f14' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#334455' }]
  }
];

function PlacesLogic() {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const { isDiscovering, setIsDiscovering, setDiscoveredPlace, discoveredPlace, selectedCategory } = useStore();

  const getCategoryType = (categoryId: string): string => {
    const typeMap: Record<string, string> = {
      'all': 'tourist_attraction',
      'restaurant': 'restaurant',
      'takeaway': 'meal_takeaway',
      'cafe': 'cafe',
      'bakery': 'bakery',
      'bar': 'bar',
      'park': 'park',
      'library': 'library',
      'bookstore': 'book_store',
      'museum': 'museum',
      'gallery': 'art_gallery',
      'market': 'shopping_mall',
      'viewpoint': 'tourist_attraction',
      'workshop': 'store'
    };
    return typeMap[categoryId] || 'tourist_attraction';
  };

  useEffect(() => {
    if (!isDiscovering || !map || !placesLib) return;

    // Simulate network delay for discovery animation effect
    setTimeout(() => {
      const service = new placesLib.PlacesService(map);
      const request = {
        location: map.getCenter() || { lat: 40.7128, lng: -74.0060 },
        radius: 5000,
        type: getCategoryType(selectedCategory),
      };

      service.nearbySearch(request, (results: any, status: any) => {
        setIsDiscovering(false);
        if (status === placesLib.PlacesServiceStatus.OK && results && results.length > 0) {
          // Pick a random result
          const randomIndex = Math.floor(Math.random() * results.length);
          const place = results[randomIndex];
          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            
            setDiscoveredPlace({
              id: place.place_id || Math.random().toString(),
              name: place.name || 'Unknown Location',
              address: place.vicinity || 'Unknown Address',
              rating: place.rating,
              lat,
              lng
            });
            
            // Smoothly pan to the newly discovered location
            map.panTo({ lat, lng });
            map.setZoom(16);
          }
        } else {
          // Fallback if no places found
          alert("No new places found nearby!");
        }
      });
    }, 800); // Small delay to make the discovery feel intentional
  }, [isDiscovering, map, placesLib, setIsDiscovering, setDiscoveredPlace]);

  return (
    <>
      {discoveredPlace && (
         <Marker position={{ lat: discoveredPlace.lat, lng: discoveredPlace.lng }} />
      )}
    </>
  );
}

function UserLocationLogic() {
  const map = useMap();
  const { userLocation, setUserLocation } = useStore();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(loc);
        if (map) {
          map.panTo(loc);
          map.setZoom(14);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, [map, setUserLocation]);

  return (
    <>
      {userLocation && (
        <Marker 
          position={userLocation} 
          icon={{
            path: window.google?.maps?.SymbolPath?.CIRCLE,
            scale: 7,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
          zIndex={999}
        />
      )}
    </>
  );
}

export function MinimalMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
    return (
      <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-white/50">
        Missing Google Maps API Key
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          styles={mapStyle}
        >
          <PlacesLogic />
          <UserLocationLogic />
        </GoogleMap>
      </APIProvider>
    </div>
  );
}
