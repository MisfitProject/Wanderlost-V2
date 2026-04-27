import { useEffect } from 'react';
import { useStore } from './store';
import { MinimalMap } from './components/Map';
import { SplashView } from './components/views/SplashView';
import { PaywallView } from './components/views/PaywallView';
import { BottomSheet } from './components/BottomSheet';
import { TopBar } from './components/TopBar';
import { Map, User } from 'lucide-react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// We will create these shortly
import { MyAccountView } from './components/views/MyAccountView';
import { SettingsView } from './components/views/SettingsView';
import { HistoryView } from './components/views/HistoryView';
import { TripsView } from './components/views/TripsView';
import { LegalView } from './components/views/LegalView';
import { HelpCenterView } from './components/views/HelpCenterView';

function App() {
  const { currentView, setCurrentView, setCurrentUser, credits, setUserLocation, isDiscovering, setIsDiscovering } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [setCurrentUser]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      }, (err) => {
        console.warn("Geolocation denied or failed:", err);
      });
    }
  }, [setUserLocation]);

  const handleDiscoverClick = () => {
    // Basic logic to trigger discovery
    setIsDiscovering(true);
    // The Map component or discovery logic will handle the actual fetching and set setIsDiscovering(false)
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col relative overflow-hidden bg-black text-white selection:bg-white/30">
      
      {currentView === 'splash' && <SplashView />}

      {/* Background Map Layer */}
      <div className="absolute inset-0 z-0">
        <MinimalMap />
      </div>

      {/* Top Bar (Visible mainly on Map view, but we can conditionally render it) */}
      {currentView === 'map' && <TopBar />}

      {/* Main Views */}
      {currentView === 'myaccount' && <MyAccountView />}
      {currentView === 'settings' && <SettingsView />}
      {currentView === 'paywall' && <PaywallView />}
      {currentView === 'history' && <HistoryView />}
      {currentView === 'trips' && <TripsView />}
      {currentView === 'legal' && <LegalView />}
      {currentView === 'help' && <HelpCenterView />}

      {/* Discovery Bottom Sheet */}
      {currentView === 'map' && <BottomSheet />}

      {/* Bottom Navigation Shell */}
      <nav className="absolute bottom-0 w-full z-20 pb-safe pt-4 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-[2px]">
        <div className="flex justify-between items-end h-16 px-8 relative">
          
          <button 
            onClick={() => setCurrentView('map')}
            className={`flex flex-col items-center gap-1 transition-colors pb-2 ${currentView === 'map' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <Map className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">Map</span>
          </button>
          
          {/* Center Discover Button */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4">
            <button 
              onClick={handleDiscoverClick}
              disabled={isDiscovering || credits <= 0}
              className={`
                w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1
                shadow-[0_0_20px_rgba(255,255,255,0.2)] border-2 border-white/20
                transition-all duration-300 transform active:scale-95
                ${isDiscovering ? 'bg-white/20 animate-pulse' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md'}
              `}
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
              <span className="text-[10px] font-semibold tracking-wide">Discover</span>
            </button>
          </div>

          <button 
            onClick={() => setCurrentView('myaccount')}
            className={`flex flex-col items-center gap-1 transition-colors pb-2 ${currentView === 'myaccount' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">My Account</span>
          </button>
        </div>
      </nav>
      
    </div>
  );
}

export default App;
