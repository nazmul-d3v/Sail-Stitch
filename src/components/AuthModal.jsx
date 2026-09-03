import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Sparkles, LogIn, UserPlus, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  initialTab = 'login'
}) {
  const [tab, setTab] = useState(initialTab); // 'login' | 'register'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please fill in both email/phone and password.');
      return;
    }

    // Process Login
    const userData = {
      name: loginEmail.includes('@') ? loginEmail.split('@')[0] : 'Member User',
      email: loginEmail.includes('@') ? loginEmail : `${loginEmail}@sailstitch.com`,
      phone: loginEmail.includes('@') ? '+880 1700-112233' : loginEmail,
      memberTier: 'VIP Sailor',
      joinedDate: 'Jan 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    };

    setSuccessMsg('Logged in successfully!');
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const userData = {
      name: regName,
      email: regEmail,
      phone: regPhone || '+880 1700-998877',
      memberTier: 'Sailor Club Member',
      joinedDate: 'Sep 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    };

    setSuccessMsg('Account created successfully! Welcome to Sail & Stitch.');
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setErrorMsg('');
    const demoUser = {
      name: 'Nazmul Hossain',
      email: 'nazmul@sailstitch.com',
      phone: '+880 1700-112233',
      memberTier: 'Gold VIP Member',
      joinedDate: 'Aug 2025',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    };

    setSuccessMsg('Instant Demo Login Successful!');
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8"
      >
        
        {/* Header with Dark Sailor Theme */}
        <div className="p-6 bg-[#0b1b3d] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Sail & Stitch Account</span>
          </div>

          <h2 className="text-2xl font-extrabold font-serif tracking-tight text-white">
            {tab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-slate-300 text-xs mt-1 font-light">
            {tab === 'login' 
              ? 'Access your orders, saved wishlist & exclusive member perks' 
              : 'Join the Sail & Stitch Club for member rewards and faster checkout'}
          </p>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-900/90 p-1 rounded-xl mt-5 border border-slate-800">
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                tab === 'login' 
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => { setTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                tab === 'register' 
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">

          {/* Error / Success Feedback Banners */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Demo Login Button */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full bg-gradient-to-r from-amber-50 to-amber-100/80 hover:from-amber-100 hover:to-amber-200 text-amber-900 border border-amber-300 py-2.5 px-4 rounded-2xl text-xs font-black flex items-center justify-between transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 p-1 rounded-md text-[10px] font-extrabold">DEMO</span>
              <span>1-Click Quick Demo Login</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-slate-200" />
            <span className="absolute bg-white px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Or {tab === 'login' ? 'sign in with credentials' : 'fill details'}
            </span>
          </div>

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email or Phone Number *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. nazmul@example.com or 017XXXXXXXX"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password *</label>
                  <button 
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email.')}
                    className="text-[11px] font-bold text-amber-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b1b3d] hover:bg-[#152850] text-amber-400 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Sign In to Account
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Nazmul Hossain"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your data is protected under Sail & Stitch privacy terms.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Create Free Member Account
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
