import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Sparkles, Star } from 'lucide-react';
import { SLIDERS } from '../data/products';

export default function HeroSlider({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDERS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-slate-950 overflow-hidden border-b border-slate-800">
      {/* Slide Image Backgrounds */}
      <div className="relative h-[500px] sm:h-[560px] md:h-[620px] w-full">
        {SLIDERS.map((item, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
              />
              
              {/* Luxury Multi-layer Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.accentColor} opacity-85`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-transparent to-black/50" />
              
              {/* Decorative Subtle Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full text-white">
                  <div className="max-w-2xl space-y-5 animate-fade-in">
                    
                    {/* Floating Campaign Badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-500/15 backdrop-blur-md text-amber-300 border border-amber-500/40 text-xs uppercase font-extrabold tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.subtitle}</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif leading-[1.1] tracking-tight text-white drop-shadow-lg">
                      {item.title.split(' ')[0]}{' '}
                      <span className="shimmer-text">{item.title.split(' ').slice(1).join(' ')}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light line-clamp-3 max-w-xl">
                      {item.description}
                    </p>

                    {/* CTA Actions */}
                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => onSelectCategory(item.categoryId)}
                        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:scale-105 transition-all duration-300 group border border-amber-300/40"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Small Spec Badge */}
                      <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 bg-black/40 backdrop-blur-md px-4 py-3 rounded-full border border-slate-700/60">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Export Quality Fabric</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDERS.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/60 hover:bg-amber-400 hover:text-slate-950 text-white p-3 rounded-full border border-amber-500/30 transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDERS.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/60 hover:bg-amber-400 hover:text-slate-950 text-white p-3 rounded-full border border-amber-500/30 transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-110"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {SLIDERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-10 bg-amber-400 shadow-md shadow-amber-400/50' : 'w-2.5 bg-slate-600/80 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Glassmorphism Trust Badges Bar */}
      <div className="relative z-20 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 py-4 px-4 text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="p-2.5 bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">Express Delivery</div>
              <div className="text-slate-400 text-[11px]">All Bangladesh in 24-48 hrs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="p-2.5 bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">100% Export Quality</div>
              <div className="text-slate-400 text-[11px]">Tailored Stitching Perfection</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="p-2.5 bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">7 Days Easy Return</div>
              <div className="text-slate-400 text-[11px]">Hassle-free exchange guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="p-2.5 bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white">Secure Payments</div>
              <div className="text-slate-400 text-[11px]">bKash, Nagad & Cash on Delivery</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
