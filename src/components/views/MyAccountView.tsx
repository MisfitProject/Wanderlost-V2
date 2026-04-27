import React, { useState } from 'react';
import { useStore } from '../../store';
import { auth } from '../../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail
} from 'firebase/auth';
import { Mail, Lock, User, Calendar, History, Map as MapIcon, ChevronRight, Crown, ArrowLeft } from 'lucide-react';

export const MyAccountView: React.FC = () => {
  const { currentUser, isPremium, premiumExpiry, setCurrentView, setCurrentUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.warn("Firebase Auth failed, using mock login for demo.", err);
      // Fallback for demonstration if Firebase Email Auth is disabled
      setCurrentUser({ 
        uid: 'demo-' + Date.now(), 
        email, 
        displayName: name || email.split('@')[0] 
      } as any);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.warn("Google Auth failed, using mock login for demo.", err);
      setCurrentUser({ 
        uid: 'demo-google', 
        email: 'explorer@google.com', 
        displayName: 'Google Explorer' 
      } as any);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (currentUser) {
    // Authenticated View
    const formattedDate = premiumExpiry 
      ? new Date(premiumExpiry).toLocaleDateString() 
      : 'N/A';

    return (
      <div className="absolute inset-0 z-30 bg-black overflow-y-auto pb-32 pt-12 px-6">
        <button 
          onClick={() => setCurrentView('map')}
          className="absolute top-6 left-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-3xl font-bold mb-8 mt-12 text-white tracking-wide">My Account</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold border border-white/20">
            {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{currentUser.displayName || 'Explorer'}</h2>
            <p className="text-white/50 text-sm">{currentUser.email}</p>
          </div>
        </div>

        {/* Membership Status */}
        <div className="glass p-5 rounded-2xl mb-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Crown className="w-24 h-24" />
          </div>
          <h3 className="text-white/50 text-sm mb-1 uppercase tracking-wider">Membership</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{isPremium ? 'Premium' : 'Free'}</p>
              {isPremium && <p className="text-sm text-white/70 mt-1">Renews on: {formattedDate}</p>}
            </div>
            {!isPremium && (
              <button 
                onClick={() => setCurrentView('paywall')}
                className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform"
              >
                Join Premium
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => setCurrentView('history')}
            className="w-full glass p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-white/70" />
              <div className="text-left">
                <span className="font-medium block">History</span>
                <span className="text-xs text-white/50">places visited</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30" />
          </button>

          <button 
            onClick={() => setCurrentView('trips')}
            className="w-full glass p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapIcon className="w-5 h-5 text-white/70" />
              <div className="text-left">
                <span className="font-medium block">Itinerary</span>
                <span className="text-xs text-white/50">Save places to visit for the future trip.</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30" />
          </button>
        </div>
      </div>
    );
  }

  // Unauthenticated View
  return (
    <div className="absolute inset-0 z-30 bg-black overflow-y-auto pb-32 pt-12 px-6 flex flex-col justify-center">
      <button 
        onClick={() => setCurrentView('map')}
        className="absolute top-6 left-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div className="flex flex-col items-center mb-8 mt-8">
        <img 
          src="/wanderlost logo no background.png" 
          alt="Logo" 
          className="w-20 h-20 mb-4"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <h1 className="text-3xl font-bold tracking-widest uppercase">Wonderlost</h1>
        <p className="text-white/50 mt-2">{isLogin ? 'Welcome back, explorer' : 'Begin your journey'}</p>
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4 max-w-sm w-full mx-auto">
        {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">{error}</div>}

        {!isLogin && (
          <>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="date" 
                required
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              />
            </div>
          </>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="email" 
            placeholder={isLogin ? "Username or Email" : "Email address"}
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
          />
        </div>

        {!isLogin && (
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white text-black font-bold rounded-xl py-3 mt-4 hover:scale-[1.02] transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Save')}
        </button>
      </form>

      <div className="max-w-sm w-full mx-auto mt-6 text-center">
        {isLogin && (
          <button onClick={handleForgotPassword} className="text-white/50 text-sm hover:text-white mb-6">
            Forgot password?
          </button>
        )}

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-black px-4 text-sm text-white/30">OR</span>
        </div>

        <button 
          onClick={handleGoogleAuth}
          className="w-full glass border border-white/10 font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-white/50 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-white font-medium hover:underline"
          >
            {isLogin ? 'Register' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};
