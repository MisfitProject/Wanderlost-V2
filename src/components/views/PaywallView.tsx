import React from 'react';
import { useStore } from '../../store';
import { CheckCircle2, Apple, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';

export const PaywallView: React.FC = () => {
  const { setCurrentView, setIsPremium, setPremiumExpiry, currentUser } = useStore();

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    if (!currentUser) {
      // Oblige login to subscribe
      setCurrentView('myaccount');
      return;
    }

    // Mock purchase flow
    setIsPremium(true);
    const expiry = new Date();
    if (plan === 'annual') {
      expiry.setFullYear(expiry.getFullYear() + 1);
    } else {
      expiry.setMonth(expiry.getMonth() + 1);
    }
    setPremiumExpiry(expiry.getTime());
    setCurrentView('myaccount');
  };

  const features = [
    "Unlimited discoveries",
    "Filter by category",
    "Availability status",
    "Show entire History",
    "Save Places",
    "Create Itinerary"
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col pt-safe pb-safe overflow-y-auto">
      
      {/* Header Image / Hero */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Premium Travel" 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setCurrentView('map')}
          className="absolute top-4 left-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="px-6 -mt-10 relative z-20 pb-12">
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Wanderlost<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600">Premium</span></h1>
        <p className="text-white/80 leading-relaxed mb-8">
          Unlock the possibilities. Join a curated world of modern explorers and archive your journeys with precision.
        </p>

        {/* Features List */}
        <div className="space-y-4 mb-10">
          {features.map((feat, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="font-medium text-white/90">{feat}</span>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-4 mb-8">
          <button 
            onClick={() => handleSubscribe('annual')}
            className="w-full relative overflow-hidden glass border-2 border-amber-500/50 rounded-2xl p-5 text-left transition-transform active:scale-[0.98]"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Best Value
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Annual Plan</h3>
                <p className="text-sm text-white/50">Cancel anytime</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$100</span>
                <span className="text-white/50 text-sm"> / year</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => handleSubscribe('monthly')}
            className="w-full glass border border-white/10 rounded-2xl p-5 text-left transition-transform active:scale-[0.98]"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Monthly Plan</h3>
                <p className="text-sm text-white/50">Cancel anytime</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$10</span>
                <span className="text-white/50 text-sm"> / month</span>
              </div>
            </div>
          </button>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <p className="text-center text-xs text-white/40 uppercase tracking-widest mb-4">Secure Checkout</p>
          <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
            <Apple className="w-5 h-5" /> Pay
          </button>
          <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
            <Smartphone className="w-5 h-5" /> Google Pay
          </button>
          <button className="w-full bg-white/10 border border-white/20 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" /> Credit Card
          </button>
        </div>

      </div>
    </div>
  );
};
