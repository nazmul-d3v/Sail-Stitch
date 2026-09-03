import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import { OUTLETS } from '../data/products';

export default function StoreLocatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');

  const filtered = OUTLETS.filter(o => 
    o.name.toLowerCase().includes(search.toLowerCase()) || 
    o.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8"
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold font-serif tracking-tight">Sail & Stitch Outlets</h2>
              <p className="text-slate-400 text-xs mt-0.5">Visit our stores to experience our collections</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-100 border-b border-slate-200">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search outlet by area or city (e.g. Gulshan, Dhanmondi, Chittagong)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Outlet Cards Grid */}
        <div className="p-6 max-h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-500 text-xs">
              No store outlets found matching "{search}".
            </div>
          ) : (
            filtered.map((outlet) => (
              <div key={outlet.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                <img
                  src={outlet.image}
                  alt={outlet.name}
                  className="w-24 h-24 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between text-xs space-y-1">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-serif">
                      {outlet.name}
                    </h3>
                    <p className="text-slate-600 flex items-start gap-1 mt-1">
                      <Navigation className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </p>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-200 text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-amber-600" />
                      <span>{outlet.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{outlet.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
