import { create } from 'zustand'
import { type User } from 'firebase/auth'

export interface Place {
  id: string;
  name: string;
  address: string;
  rating?: number;
  reviews?: number;
  lat: number;
  lng: number;
  types?: string[];
  localLanguageRatio?: number;
  photoUrl?: string;
  isOpen?: boolean;
}

export interface Trip {
  id: string;
  name: string;
  places: Place[];
  createdAt: number;
}

type BottomSheetState = 'dismissed' | 'peek' | 'expanded';
type CurrentView = 'splash' | 'map' | 'myaccount' | 'paywall' | 'settings' | 'trips' | 'history' | 'legal' | 'help';
type LegalViewType = 'terms' | 'privacy' | 'safety';

interface WanderlostState {
  // Session & User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  premiumExpiry: number | null;
  setPremiumExpiry: (val: number | null) => void;
  
  // Credits & Discovery
  credits: number;
  setCredits: (credits: number) => void;
  deductCredit: () => void;
  isDiscovering: boolean;
  setIsDiscovering: (isDiscovering: boolean) => void;
  discoveredPlace: Place | null;
  setDiscoveredPlace: (place: Place | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  
  // App State & Navigation
  currentView: CurrentView;
  setCurrentView: (view: CurrentView) => void;
  bottomSheetState: BottomSheetState;
  setBottomSheetState: (state: BottomSheetState) => void;
  
  // Trips & History
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  createTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
  addPlaceToTrip: (tripId: string, place: Place) => void;
  removePlaceFromTrip: (tripId: string, placeId: string) => void;
  
  history: Place[];
  setHistory: (history: Place[]) => void;
  addToHistory: (place: Place) => void;
  
  // Settings & Context
  useMeters: boolean;
  setUseMeters: (useMeters: boolean) => void;
  userLocation: { lat: number, lng: number } | null;
  setUserLocation: (loc: { lat: number, lng: number } | null) => void;
  
  // Legal
  legalViewType: LegalViewType;
  setLegalViewType: (type: LegalViewType) => void;
}

export const useStore = create<WanderlostState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  isPremium: false,
  setIsPremium: (val) => set({ isPremium: val }),
  premiumExpiry: null,
  setPremiumExpiry: (val) => set({ premiumExpiry: val }),
  
  credits: 3, 
  setCredits: (credits) => set({ credits }),
  deductCredit: () => set((state) => ({ credits: Math.max(0, state.credits - 1) })),
  
  isDiscovering: false,
  setIsDiscovering: (isDiscovering) => set({ isDiscovering }),
  
  discoveredPlace: null,
  setDiscoveredPlace: (place) => set({ discoveredPlace: place }),
  
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  currentView: 'splash',
  setCurrentView: (view) => set({ currentView: view }),
  
  bottomSheetState: 'dismissed',
  setBottomSheetState: (state) => set({ bottomSheetState: state }),
  
  trips: [],
  setTrips: (trips) => set({ trips }),
  createTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
  deleteTrip: (tripId) => set((state) => ({ trips: state.trips.filter(t => t.id !== tripId) })),
  addPlaceToTrip: (tripId, place) => set((state) => ({
    trips: state.trips.map(trip => 
      trip.id === tripId ? { ...trip, places: [...trip.places, place] } : trip
    )
  })),
  removePlaceFromTrip: (tripId, placeId) => set((state) => ({
    trips: state.trips.map(trip => 
      trip.id === tripId ? { ...trip, places: trip.places.filter(p => p.id !== placeId) } : trip
    )
  })),
  
  history: [],
  setHistory: (history) => set({ history }),
  addToHistory: (place) => set((state) => ({ history: [place, ...state.history] })),
  
  useMeters: true,
  setUseMeters: (useMeters) => set({ useMeters }),
  userLocation: null,
  setUserLocation: (loc) => set({ userLocation: loc }),
  
  legalViewType: 'terms',
  setLegalViewType: (type) => set({ legalViewType: type })
}));
