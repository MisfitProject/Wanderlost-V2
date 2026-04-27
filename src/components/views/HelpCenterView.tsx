import React, { useState } from 'react';
import { useStore } from '../../store';
import { ChevronLeft, ChevronDown, ChevronRight, Search } from 'lucide-react';

const HELP_DATA = [
  {
    category: "Getting Started",
    items: [
      {
        q: "How do \"Discoveries\" work?",
        a: "The \"Discover Places\" button reveals one high-quality hidden gem near your current location. These are places with a 4.8+ rating and a high density of local reviews. Once you tap the button, a new pulsating dot appears on your map."
      },
      {
        q: "What are the pulsating dots on the map?",
        a: "Each dot represents a \"Discovery.\" The color indicates the type of place (e.g., Food, Nature, or Culture). A pulsating dot means the place has been revealed but not yet visited or saved to your history."
      },
      {
        q: "Why can I only see 3 places for free?",
        a: "Wanderlost is a niche tool designed for high-quality exploration. We offer the first 3 discoveries for free so you can experience the network. To unlock unlimited discoveries and advanced features, you can join our Premium membership."
      }
    ]
  },
  {
    category: "Account & Profile",
    items: [
      {
        q: "How do I change my profile picture?",
        a: "Go to My Account, tap on your current profile picture (or the placeholder circle), and select \"Upload Picture.\" You can choose a photo from your library or take a new one."
      },
      {
        q: "How do I reset my password?",
        a: "In the My Account section, tap on the \"Password\" field. You will be prompted to enter your current password and then set a new one. If you've forgotten your password, use the \"Forgot Password\" link on the login screen to receive a reset email."
      },
      {
        q: "How can I delete my account and data?",
        a: "We respect your privacy. Go to Settings, scroll to the bottom, and select Delete my account. This will permanently remove your profile, history, and saved places. To remove only your activity data while keeping your account, select Delete my data."
      }
    ]
  },
  {
    category: "Premium & Billing",
    items: [
      {
        q: "What is included in the Premium plan?",
        a: "Premium members get unlimited discoveries, the ability to filter the map by category (e.g., only show Bakeries), a full history log of every place visited, and the ability to save places to a custom itinerary."
      },
      {
        q: "How do I cancel my subscription?",
        a: "Subscriptions are managed directly through your device's store:\niOS: Settings > Apple ID > Subscriptions > Wanderlost > Cancel.\nAndroid: Google Play Store > Menu > Subscriptions > Wanderlost > Cancel."
      },
      {
        q: "I paid for Premium but it's not showing up.",
        a: "Go to Settings and tap Manage Membership. Look for a button that says \"Restore Purchases.\" If the issue persists, ensure you are logged into the same Apple or Google account used for the purchase."
      }
    ]
  },
  {
    category: "Technical Issues",
    items: [
      {
        q: "The map isn't loading my location.",
        a: "Ensure that Location Services are enabled for Wanderlost in your phone's privacy settings. For the best experience, set location access to \"While Using the App.\""
      },
      {
        q: "Why can't I see any dots in my area?",
        a: "Wanderlost has a very high bar for recommendations (>4.8 stars and 80% local reviews). If you are in a very remote area or a place without highly-vetted local favorites, the map may appear empty. Try panning the map to a nearby neighborhood or city center."
      },
      {
        q: "The \"Go to Google Maps\" button isn't working.",
        a: "This button requires the Google Maps app to be installed on your device. If it is installed and still not working, check your internet connection or try restarting the app."
      }
    ]
  },
  {
    category: "Safety & Responsibility",
    items: [
      {
        q: "Is the information in the app verified?",
        a: "Wanderlost uses a data-driven algorithm to find highly-rated spots. We do not manually curate or visit these locations. Conditions on the ground can change, so always use your own judgment when visiting a new area."
      },
      {
        q: "What should I do if a location feels unsafe?",
        a: "Your safety is your responsibility. If you arrive at a discovery and the environment feels uncomfortable or different than expected, leave immediately. Wanderlost is a recommendation tool, not a safety guide."
      }
    ]
  }
];

export const HelpCenterView: React.FC = () => {
  const { setCurrentView } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIndex(expandedIndex === id ? null : id);
  };

  // Filter data based on search
  const filteredData = HELP_DATA.map(category => {
    const filteredItems = category.items.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items: filteredItems };
  }).filter(category => category.items.length > 0);

  return (
    <div className="absolute inset-0 z-50 bg-black overflow-y-auto pb-safe pt-safe">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setCurrentView('settings')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold tracking-wide">Help Center</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/50" />
          </div>
          <input
            type="text"
            className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all"
            placeholder="How can we help you?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-8 pb-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-white/50">
            No results found for "{searchQuery}"
          </div>
        ) : (
          filteredData.map((category, catIdx) => (
            <section key={catIdx} className="space-y-3">
              <h2 className="text-white/50 text-xs font-bold uppercase tracking-wider pl-2">{category.category}</h2>
              <div className="glass rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                {category.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isExpanded = expandedIndex === id;
                  return (
                    <div key={itemIdx} className="flex flex-col">
                      <button 
                        onClick={() => toggleExpand(id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                      >
                        <span className="font-medium text-sm text-white/90 pr-4">{item.q}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 text-sm text-white/70 leading-relaxed bg-white/5">
                          {item.a.split('\n').map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};
