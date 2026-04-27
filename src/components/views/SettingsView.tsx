import React from 'react';
import { useStore } from '../../store';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { ChevronLeft, LogOut, Trash2, ShieldAlert, FileText, HelpCircle, Ruler } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    currentUser, 
    setCurrentView, 
    isPremium, 
    useMeters, 
    setUseMeters,
    setLegalViewType
  } = useStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView('map');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const handleDeleteAccount = () => {
    // In a real app, this would require re-authentication before deleting the user from Firebase
    alert("This action will permanently delete your account and all associated data. Please contact support to proceed.");
  };

  return (
    <div className="absolute inset-0 z-50 bg-black overflow-y-auto pb-safe pt-safe">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={() => setCurrentView('map')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold tracking-wide">Settings</h1>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Account Details */}
        {currentUser && (
          <section className="space-y-4">
            <h2 className="text-white/50 text-xs font-bold uppercase tracking-wider">Account Details</h2>
            <div className="glass rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
              <div className="p-4 flex flex-col gap-1 hover:bg-white/5 cursor-pointer">
                <span className="text-sm text-white/50">Name</span>
                <span className="font-medium">{currentUser.displayName || 'Set your name'}</span>
              </div>
              <div className="p-4 flex flex-col gap-1 hover:bg-white/5 cursor-pointer">
                <span className="text-sm text-white/50">Email</span>
                <span className="font-medium">{currentUser.email}</span>
              </div>
              <div className="p-4 flex flex-col gap-1 hover:bg-white/5 cursor-pointer">
                <span className="text-sm text-white/50">Password</span>
                <span className="font-medium">••••••••</span>
              </div>
            </div>
          </section>
        )}

        {/* Membership */}
        <section className="space-y-4">
          <h2 className="text-white/50 text-xs font-bold uppercase tracking-wider">Membership</h2>
          <div className="glass rounded-2xl p-4 border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-medium block">{isPremium ? 'Premium Plan' : 'Free Plan'}</span>
              <span className="text-sm text-white/50">{isPremium ? 'Active' : 'Upgrade to unlock everything'}</span>
            </div>
            <button 
              onClick={() => setCurrentView('paywall')}
              className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Manage
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <h2 className="text-white/50 text-xs font-bold uppercase tracking-wider">Preferences</h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-white/70" />
                <span>Distance Unit</span>
              </div>
              <div className="flex bg-white/10 rounded-lg p-1">
                <button 
                  onClick={() => setUseMeters(true)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${useMeters ? 'bg-white text-black font-medium' : 'text-white/70'}`}
                >
                  Meters
                </button>
                <button 
                  onClick={() => setUseMeters(false)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${!useMeters ? 'bg-white text-black font-medium' : 'text-white/70'}`}
                >
                  Feet
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Support & Legal */}
        <section className="space-y-4">
          <h2 className="text-white/50 text-xs font-bold uppercase tracking-wider">Support & Legal</h2>
          <div className="glass rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
            <button 
              onClick={() => setCurrentView('help')}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-white/70" />
                <span>Help Center & Support</span>
              </div>
            </button>
            <button 
              onClick={() => { setLegalViewType('terms'); setCurrentView('legal'); }}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-white/70" />
                <span>Terms & Conditions</span>
              </div>
            </button>
            <button 
              onClick={() => { setLegalViewType('privacy'); setCurrentView('legal'); }}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-white/70" />
                <span>Privacy Policy</span>
              </div>
            </button>
            <button 
              onClick={() => { setLegalViewType('safety'); setCurrentView('legal'); }}
              className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-white/70" />
                <span>Safety Measures</span>
              </div>
            </button>
          </div>
        </section>

        {/* Destructive Actions */}
        {currentUser && (
          <section className="space-y-4 pt-4">
            <button 
              onClick={handleLogout}
              className="w-full glass border border-white/10 p-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
            
            <button 
              onClick={handleDeleteAccount}
              className="w-full border border-red-500/30 bg-red-500/10 text-red-400 p-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete My Account
            </button>
          </section>
        )}

      </div>
    </div>
  );
};
