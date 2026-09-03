import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const FEATURED_CATS = [
  {
    id: 'ethnic-men',
    title: 'Festive Panjabi & Kabli',
    subtitle: 'Royal Silk & Zari Embroidery',
    image: '/images/royal_panjabi_maroon.jpg',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
    tag: 'Trending'
  },
  {
    id: 'ethnic-women',
    title: 'Women Kurtis & Sarees',
    subtitle: 'Floral Prints & Jamdani Weave',
    image: '/images/emerald_kurti_set.jpg',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: 'New'
  },
  {
    id: 'menswear',
    title: 'Menswear & Casuals',
    subtitle: 'Linen Shirts & Smart Chinos',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: 'Essential'
  },
  {
    id: 'kids',
    title: 'Junior Fashion',
    subtitle: 'Comfortable Cotton Sets',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: 'Kids'
  },
  {
    id: 'accessories',
    title: 'Leather & Accessories',
    subtitle: 'Wallets, Loafers & Belts',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    tag: 'Popular'
  }
];

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-widest uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Shop Signature Categories
          </h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md">
          Explore handcrafted ethnic elegance and contemporary casualwear tailored with precision for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {FEATURED_CATS.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`group relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-500 cursor-pointer min-h-[280px] flex items-end ${cat.colSpan}`}
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

            {/* Tag Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg border border-amber-300/30">
                {cat.tag}
              </span>
            </div>

            {/* Card Content */}
            <div className="relative z-10 p-6 w-full flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow">
                  {cat.title}
                </h3>
                <p className="text-slate-300 text-xs mt-1 font-light">
                  {cat.subtitle}
                </p>
              </div>

              <div className="bg-slate-950/60 group-hover:bg-amber-400 text-white group-hover:text-slate-950 p-3 rounded-full transition-all duration-300 backdrop-blur-md transform group-hover:translate-x-1 group-hover:-translate-y-1 border border-slate-700/60 group-hover:border-amber-400">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
