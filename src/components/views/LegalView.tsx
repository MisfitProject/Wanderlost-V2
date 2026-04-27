import React from 'react';
import { useStore } from '../../store';
import { ChevronLeft } from 'lucide-react';

export const LegalView: React.FC = () => {
  const { setCurrentView, legalViewType, setLegalViewType } = useStore();

  let title = '';
  let content: React.ReactNode = null;

  if (legalViewType === 'terms') {
    title = 'Terms & Conditions';
    content = (
      <div className="space-y-6 text-sm text-white/80 leading-relaxed">
        <section>
          <h3 className="text-white font-bold text-base mb-2">1. Acceptance of Terms</h3>
          <p>By downloading, accessing, or using Wanderlost, you agree to be bound by these Terms and Conditions. If you do not agree, do not use the application.</p>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">2. The Service (Discovery, Not Curation)</h3>
          <p>Wanderlost is a recommendation engine that utilizes third-party algorithms to identify high-rated locations.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>No Curation:</strong> We do not manually vet, visit, or curate these locations.</li>
            <li><strong>No Travel Guide:</strong> Wanderlost does not provide travel advice, safety ratings, or guided services. We provide a visual interface for public data.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">3. User Responsibility & Safety</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Self-Directed Travel:</strong> All travel undertaken as a result of a "Discovery" is at your own risk.</li>
            <li><strong>Self-Preservation:</strong> You are solely responsible for assessing the safety, legality, and accessibility of any location before and during your visit.</li>
            <li><strong>Awareness:</strong> You agree to maintain situational awareness and adhere to local laws. Wanderlost is not responsible for accidents, injuries, or legal issues encountered during your journey.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">4. Subscriptions & Billing</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Free Tier:</strong> Users receive 3 free "Discoveries." Once exhausted, a Premium subscription is required for further access.</li>
            <li><strong>Premium Plans:</strong> $10.00/month or $100.00/year.</li>
            <li><strong>Renewals:</strong> Subscriptions auto-renew through your Apple ID or Google Play account unless canceled at least 24 hours before the end of the current period.</li>
            <li><strong>Refunds:</strong> All billing is handled by the respective App Stores; Wanderlost does not issue direct refunds.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">5. Account Security</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials (Email, Password). Wanderlost is not liable for unauthorized access to your account resulting from your failure to secure your login details.</p>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">6. Limitation of Liability</h3>
          <p>To the maximum extent permitted by law, Wanderlost and its creators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your use of the app or reliance on its recommendations.</li>
            <li>Any interactions with third-party locations or individuals at those locations.</li>
            <li>Data inaccuracies or map errors provided by third-party SDKs (Google Maps).</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">7. Prohibited Use</h3>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Reverse engineer or scrape data from the "Neural Map."</li>
            <li>Use the app for any illegal purposes or to harass others.</li>
            <li>Circumvent the "3 Free Discoveries" limit through technical manipulation.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">8. Termination</h3>
          <p>We reserve the right to suspend or terminate your account if you violate these terms. You may delete your account and data at any time via the Settings menu.</p>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">9. Changes to Terms</h3>
          <p>Wanderlost may update these terms to reflect changes in the law or app features. Continued use of the app after updates constitutes acceptance of the new terms.</p>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">10. Governing Law</h3>
          <p>These terms are governed by the laws of your local jurisdiction, without regard to conflict of law principles.</p>
        </section>

        <div className="pt-6 border-t border-white/10">
          <button 
            onClick={() => setLegalViewType('privacy')}
            className="text-amber-500 hover:text-amber-400 underline transition-colors"
          >
            Read our Privacy Policy
          </button>
        </div>
      </div>
    );
  } else if (legalViewType === 'safety') {
    title = 'Safety Measures';
    content = (
      <div className="space-y-6 text-sm text-white/80 leading-relaxed pb-8">
        <p className="font-medium text-white/90">
          Wanderlost is a discovery interface, not a travel guide. We provide data-driven recommendations based on public information; we do not verify the current physical condition, safety, or legality of any location. You are responsible for your own journey.
        </p>

        <section>
          <h3 className="text-white font-bold text-base mb-2">1. Self-Preservation (Physical Safety)</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>The 80/20 Rule:</strong> While 80% of reviews are from locals, local comfort levels may differ from yours. Assess the environment upon arrival. If it feels wrong, leave.
            </li>
            <li>
              <strong>Emergency Readiness:</strong> Always identify your closest exit or transit point. Wanderlost does not provide real-time hazard alerts or security monitoring.
            </li>
            <li>
              <strong>Battery Management:</strong> Your safety depends on your ability to communicate. Do not rely solely on the neural map if your device is below 20% power.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">2. Self-Awareness (Environment)</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Eyes Up:</strong> The neural map is an abstraction. Do not walk while looking at the screen. Use the "Go to Google Maps" function for active navigation and stay aware of traffic and pedestrians.
            </li>
            <li>
              <strong>Cultural Context:</strong> Being in a "local" spot means you are a guest in a community. Observe local customs, noise levels, and dress codes to avoid unwanted attention.
            </li>
            <li>
              <strong>Time of Day:</strong> A 5-star rating at noon does not guarantee safety at midnight. Use your judgment regarding operating hours and lighting.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">3. Self-Responsibility (Legal & Liability)</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>No Agency:</strong> Wanderlost does not act as an agent, guide, or insurer. We do not take responsibility for accidents, theft, or incidents occurring at recommended locations.
            </li>
            <li>
              <strong>Private Property:</strong> The map may show points of interest near private areas. Never trespass. If a location is restricted, do not enter.
            </li>
            <li>
              <strong>Data Accuracy:</strong> Google Maps data can be outdated. If a place is closed or inaccessible, the app is not liable for your travel costs or lost time.
            </li>
          </ul>
        </section>

        <div className="pt-6 border-t border-white/10 mt-8">
          <p className="text-xs text-white/50 leading-relaxed uppercase tracking-wider font-semibold mb-2">
            Mandatory Legal Disclaimer
          </p>
          <p className="text-xs text-white/40 leading-relaxed">
            Disclaimer of Liability: By using Wanderlost, you acknowledge that all travel is undertaken at your own risk. Wanderlost and its affiliates expressly disclaim all liability for any loss, damage, injury, or inconvenience arising from the use of this app or the pursuit of its recommendations. You agree to hold Wanderlost harmless from any claims resulting from your personal travel decisions.
          </p>
        </div>
      </div>
    );
  } else if (legalViewType === 'privacy') {
    title = 'Privacy Policy';
    content = (
      <div className="space-y-6 text-sm text-white/80 leading-relaxed pb-8">
        <section>
          <h3 className="text-white font-bold text-base mb-2">1. Data We Collect</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Precise Location Data:</strong> To generate your neural map and find local-vetted spots, we collect your GPS coordinates. This data is processed in real-time.</li>
            <li><strong>Account Information:</strong> Name, email address, date of birth, and profile picture.</li>
            <li><strong>Usage Data:</strong> We track the number of "discoveries" used to manage your free-tier limit and provide access to your history/itinerary.</li>
            <li><strong>Device Identifiers:</strong> Basic hardware info to ensure subscription security and app stability.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">2. How Your Data Is Used</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>The Neural Map:</strong> To visualize nearby "nodes" (places) and calculate distances.</li>
            <li><strong>Tier Management:</strong> To enforce the "3 Free Discoveries" limit for non-premium users.</li>
            <li><strong>Premium Features:</strong> To store your travel history, saved places, and custom category filters.</li>
            <li><strong>Communication:</strong> To send essential account updates or subscription receipts.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">3. Data Sharing & Third Parties</h3>
          <p>Wanderlost does not sell your personal data. We share information only with service providers necessary for app operation:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Map Services:</strong> Google Maps SDK (Location data for mapping).</li>
            <li><strong>Payment Processors:</strong> Apple Pay, Google Pay, and our secure card processor (Card data never touches our servers).</li>
            <li><strong>Analytics:</strong> To monitor app performance and crash reports.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-white font-bold text-base mb-2">4. User Control & Compliance</h3>
          <p>In accordance with global privacy laws (GDPR, CCPA), Wanderlost provides full control within the Settings menu:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Access:</strong> You can view all profile data in the "My Account" section.</li>
            <li><strong>Withdrawal:</strong> You can disable location services at any time via your device settings.</li>
            <li><strong>Mandatory Deletion:</strong> You have the right to "Delete My Account" and "Delete My Data." Once selected, all personal records, history, and saved itineraries are purged from our servers within 30 days.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">5. Safety & Liability Disclaimer</h3>
          <p>Wanderlost is a recommendation engine. We do not curate, guide, or verify the current safety or legality of any location.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Data Source:</strong> Our recommendations are generated via third-party data algorithms (filtering for {'>'}4.8 stars and high local review density).</li>
            <li><strong>User Responsibility:</strong> By using this app, you acknowledge that all travel is self-directed. Wanderlost is not liable for any incidents, injuries, or losses occurring at recommended locations. Stay aware, stay responsible.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-white font-bold text-base mb-2">6. Children’s Privacy</h3>
          <p>Wanderlost is not intended for users under the age of 13. We do not knowingly collect data from children.</p>
        </section>

        <div className="pt-6 border-t border-white/10">
          <button 
            onClick={() => setLegalViewType('terms')}
            className="text-amber-500 hover:text-amber-400 underline transition-colors"
          >
            Read our Terms & Conditions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-black overflow-y-auto pb-safe pt-safe">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={() => setCurrentView('settings')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold tracking-wide">{title}</h1>
      </div>

      <div className="p-6 pb-12">
        {content}
      </div>
    </div>
  );
};
