import React from 'react';
import { X, Anchor, ShieldCheck, Award, Sparkles, MapPin, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function AboutUsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0b1b3d] via-[#112856] to-[#0b1b3d] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2.5 rounded-xl text-slate-950 shadow-md">
              <Anchor className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage & Vision</span>
              </div>
              <h2 className="text-2xl font-extrabold font-serif text-white tracking-tight">
                About Sail & Stitch
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">

          {/* Banner Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[21/9] bg-slate-900">
            <img
              src="/images/royal_panjabi_maroon.jpg"
              alt="Sail & Stitch Heritage"
              className="w-full h-full object-cover object-top opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
              <h3 className="text-xl font-serif font-extrabold text-amber-300">
                Sailing Life & Modern Bangladeshi Fashion
              </h3>
              <p className="text-xs text-slate-300 font-light max-w-xl">
                Crafting export-quality menswear, womenswear & lifestyle wear inspired by maritime adventure and royal heritage.
              </p>
            </div>
          </div>

          {/* Our Story Paragraph */}
          <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <h3 className="text-base font-extrabold font-serif text-slate-900 uppercase tracking-wider text-amber-700">
              The Sail & Stitch Story
            </h3>
            <p>
              Founded with a passion for precision tailoring and nautical design, <strong>Sail & Stitch</strong> has grown to become one of Bangladesh's premier lifestyle fashion retail brands. We blend centuries-old heritage weaving techniques — such as handloom Narayanganj Jamdani and Zari Jacquard embroideries — with contemporary urban silhouettes.
            </p>
            <p>
              Every garment carrying the <strong>Sail & Stitch</strong> anchor emblem is crafted in our state-of-the-art export-certified facilities using non-toxic dyes, 100% organic cottons, and high-thread-count silk blends.
            </p>
          </div>

          {/* Key Brand Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-700 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">100% Export Quality</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Double-stitched seams, high tensile thread, and rigorous multi-stage quality control.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-700 rounded-xl flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Artisan Empowerment</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Supporting local weavers, jamdani artisans, and needlework craftspeople across Bangladesh.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <div className="w-10 h-10 bg-amber-500/10 text-amber-700 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">7 Days Exchange</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Hassle-free 100% satisfaction guarantee with nationwide door-to-door exchange policy.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-[#0b1b3d] text-white rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">15+</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-1">Flagship Outlets</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">250K+</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">100%</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-1">Export Fabrics</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">24/48h</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold mt-1">Nationwide Delivery</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
