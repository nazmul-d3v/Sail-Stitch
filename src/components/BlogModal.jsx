import React, { useState } from 'react';
import { X, Calendar, Clock, User, ArrowRight, ArrowLeft, Sparkles, BookOpen, Share2 } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Royal Heritage '26: The Craftsmanship of Hand-Embroidered Silk Panjabis",
    category: "Ethnic Fashion",
    author: "Tanvir Rahman",
    date: "Aug 28, 2026",
    readTime: "5 min read",
    image: "/images/royal_panjabi_maroon.jpg",
    excerpt: "Discover the intricate artistry behind pure Jacquard silk weaves, zari embroidered collars, and regal maroon tones crafted for grand Bangladeshi celebrations.",
    content: `
      Festive fashion in Bangladesh is undergoing a magnificent renaissance. At Sail & Stitch, our Royal Heritage '26 collection brings together centuries-old South Asian weaving techniques with modern ergonomic tailoring.

      ### The Art of Pure Silk Jacquard
      Every Panjabi in this collection starts with carefully sourced raw silk threads. Our master weavers spend over 40 hours per piece constructing dense jacquard patterns that shimmer under ambient evening lighting.

      ### Zari & Bullion Threadwork
      The mandarin collars and front plackets feature hand-stitched antique gold zari threadwork. Each metallic button is custom-cast in brass, giving every garment an unmistakable weight of luxury.

      ### How to Style Your Heritage Panjabi
      - **Footwear**: Pair with our Handcrafted Leather Loafers or Nagra shoes.
      - **Bottoms**: White combed cotton pajama or slim-fit beige chinos.
      - **Accessories**: A silk pocket square or gold wrist watch completes the regal aesthetic.
    `
  },
  {
    id: 2,
    title: "Designer Kurtis & Artisan Jamdani: Redefining Women's Festive Elegance",
    category: "Womenswear Trends",
    author: "Nusrat Jahan",
    date: "Aug 20, 2026",
    readTime: "4 min read",
    image: "/images/emerald_kurti_set.jpg",
    excerpt: "Explore fine viscose cotton kurtis, sheer organza dupattas, and authentic handloom Narayanganj Jamdani sarees designed for modern women.",
    content: `
      Elegance lies in delicate storytelling. Our latest Women's Ethnic Collection merges centuries-old handloom Jamdani motifs with airy organza dupattas and floral cutwork kurtis.

      ### Heritage Meets Modern Silhouettes
      Whether it is an intimate family dawat or a festive evening wedding, modern Bangladeshi women seek comfort without compromising on opulent design. Our viscose cotton 3-piece sets offer breathable wear with intricate floral threadwork.

      ### Caring for Authentic Jamdani & Organza
      - Dry clean only for original luster.
      - Store wrapped in soft white muslin fabric to protect delicate gold zari threads.
    `
  },
  {
    id: 3,
    title: "Nautical Summer Linen: How to Stay Cool & Sharp in Tropical Heat",
    category: "Casual Menswear",
    author: "Siam Ahmed",
    date: "Aug 12, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    excerpt: "Unpack our signature European linen resort shirts, breathable pique cotton polos, and stretch chinos tailored for effortless tropical style.",
    content: `
      Navigating Bangladesh's humid summers requires lightweight, moisture-wicking fabrics that maintain a crisp, refined structure all day long.

      ### Why European Linen is Unrivaled
      Linen possesses natural breathability and hollow fibers that allow continuous air circulation. Our resort shirts are pre-washed to prevent shrinkage and impart an ultra-soft touch against the skin.
    `
  }
];

export default function BlogModal({ isOpen, onClose }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-6 bg-[#0b1b3d] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Sail & Stitch Fashion Journal</span>
            </div>
            <h2 className="text-2xl font-extrabold font-serif tracking-tight text-white">
              {selectedPost ? selectedPost.title : 'Latest Stories, Styles & Trends'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">

          {selectedPost ? (
            /* Article Detail View */
            <div className="space-y-6 animate-fade-in">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Articles</span>
              </button>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {selectedPost.category}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-200 pb-4">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  {selectedPost.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {selectedPost.readTime}
                </span>
              </div>

              <div className="prose max-w-none text-slate-800 text-sm leading-relaxed space-y-4 whitespace-pre-line font-serif">
                {selectedPost.content}
              </div>
            </div>
          ) : (
            /* Articles Grid View */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0b1b3d] text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5 font-medium">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-serif line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-amber-700">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
