import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  MapPin, 
  PhoneCall, 
  Menu, 
  X, 
  Anchor, 
  Scissors, 
  User, 
  ChevronDown,
  Sparkles,
  GitCompare
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Header({ 
  cartCount, 
  wishlistCount, 
  cartTotal, 
  onOpenCart, 
  onOpenStoreLocator,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
      
      {/* Top Bar (Sailor Style) */}
      <div className="sailor-topbar text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Left links */}
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              Call us now: +880 1700-000000
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <button 
              onClick={onOpenStoreLocator}
              className="hidden md:flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Store Locator
            </button>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-300">Blog</span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-300">About Us</span>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-4 ml-auto text-[11px] font-medium">
            <span className="flex items-center gap-1 text-slate-300 hover:text-amber-400 cursor-pointer">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Log in
            </span>
            <span className="text-slate-600">|</span>
            <span 
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-1 text-slate-300 hover:text-rose-400 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              My Wishlist ({wishlistCount})
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <GitCompare className="w-3.5 h-3.5 text-amber-400" />
              Compare(0)
            </span>
          </div>

        </div>
      </div>

      {/* Main Header (Logo, Search, Cart) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Sailor Style Brand Logo */}
          <div 
            onClick={() => setSelectedCategory('all')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-[#0b1b3d] p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform">
              <Anchor className="w-6 h-6 text-amber-400 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-extrabold tracking-tight text-[#0b1b3d] group-hover:text-amber-600 transition-colors">
                SAIL <span className="text-amber-500 font-sans font-black">&</span> STITCH
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-bold -mt-1">
                Sailing Life & Style
              </span>
            </div>
          </div>

          {/* Sailor Search Box (Category Dropdown + Input) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="flex w-full border-2 border-[#0b1b3d] rounded-lg overflow-hidden bg-slate-50 focus-within:border-amber-500 transition-colors shadow-sm">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 border-r border-slate-200 focus:outline-none cursor-pointer max-w-[140px] truncate"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search products in Sail & Stitch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs px-3 py-2 focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="mr-2 text-slate-400 hover:text-slate-700">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button className="bg-[#0b1b3d] hover:bg-amber-600 text-white px-5 flex items-center justify-center transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Widget */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-3 bg-[#0b1b3d] hover:bg-[#152850] text-white px-4 py-2 rounded-xl transition-all shadow-md group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-300 uppercase font-bold">Shopping Cart</span>
                <span className="text-xs font-extrabold text-amber-400 font-mono">৳ {cartTotal.toLocaleString()}</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-[#0b1b3d] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-center gap-1 py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 border-b-2 ${
                    isActive 
                      ? 'border-amber-400 text-amber-400 bg-slate-900/80 font-black'
                      : 'border-transparent text-slate-200 hover:text-amber-300 hover:bg-slate-900/40'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-t border-slate-800 px-4 py-4 space-y-2 animate-fade-in">
          <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider mb-2">
            Sail & Stitch Categories
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

    </header>
  );
}
