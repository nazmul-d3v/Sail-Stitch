import React, { useState } from 'react';
import { Anchor, Mail, Phone, Send, Check } from 'lucide-react';

export default function Footer({ onOpenStoreLocator, onOpenAboutUs, onOpenBlog }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#0b1b3d] text-slate-300 border-t border-slate-800 font-sans">
      
      {/* Sailor Newsletter Banner */}
      <div className="border-b border-slate-800 bg-[#07122a] py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-wider">
              SUBSCRIBE US
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg">
              Keep yourself updated with the latest Sail & Stitch News, Fashion Updates, Eid Collections and Blogs! Subscribe here!
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex gap-2">
            <div className="relative flex-1 md:w-80">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-amber-400"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-lg transition-all flex-shrink-0 uppercase tracking-wider"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>SUBSCRIBED</span>
                </>
              ) : (
                <>
                  <span>SUBSCRIBE</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        
        {/* Col 1: Brand & Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500 p-2 rounded-xl">
              <Anchor className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-serif text-xl font-bold text-white tracking-tight">
              SAIL <span className="text-amber-400 font-sans">&</span> STITCH
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Sail & Stitch is Bangladesh's premier lifestyle fashion retail brand, featuring export-quality menswear, womenswear, kidswear, and lifestyle essentials inspired by sailing life.
          </p>

          <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">CONTACT INFO</div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call us now: +880 1700-000000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>customercare@sailstitch.clothing</span>
            </div>
          </div>
        </div>

        {/* Col 2: Know Us */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
            KNOW US
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><button onClick={onOpenAboutUs} className="hover:text-amber-400 transition-colors">About Us</button></li>
            <li><button onClick={onOpenBlog} className="hover:text-amber-400 transition-colors">Blog</button></li>
            <li><button onClick={onOpenStoreLocator} className="hover:text-amber-400 transition-colors">Store Locator</button></li>
            <li><button onClick={onOpenAboutUs} className="hover:text-amber-400 transition-colors">Career & Culture</button></li>
            <li><button onClick={onOpenAboutUs} className="hover:text-amber-400 transition-colors">Privacy Policy</button></li>
          </ul>
        </div>

        {/* Col 3: Service Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
            SERVICE INFORMATION
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Delivery & Shipping Information</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">7 Days Return & Exchange Policy</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Size Guide & Fit Chart</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Col 4: Shopping Information & Payment Gateways */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
            SHOPPING INFORMATION
          </h4>
          <ul className="space-y-2 text-slate-400 mb-4">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Men Ethnic & Panjabi</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Women Kurtis & Sarees</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Kidswear Collection</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Lifestyle & Accessories</a></li>
          </ul>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="font-bold text-white text-[11px]">PAYMENT METHODS</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-pink-950 text-pink-300 border border-pink-800 text-[10px] font-extrabold px-2 py-0.5 rounded">bKash</span>
              <span className="bg-orange-950 text-orange-300 border border-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded">Nagad</span>
              <span className="bg-slate-900 text-slate-200 border border-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded">Cash on Delivery</span>
              <span className="bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded">Visa / Mastercard</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-black/60 py-5 px-4 text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Copyright © 2026 <strong>Sail & Stitch</strong>. All rights reserved.</span>
          <span>System designed & developed for Sail & Stitch</span>
        </div>
      </div>
    </footer>
  );
}
