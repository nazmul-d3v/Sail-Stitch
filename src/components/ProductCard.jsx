import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check, GitCompare } from 'lucide-react';

const FALLBACK_IMAGE = '/images/emerald_kurti_set.jpg';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted,
  onToggleCompare,
  isCompared
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.mainImage);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image & Badges Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Top Badges (Sailor style red discount tag) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
              {product.discount}
            </span>
          )}
          {product.tag && (
            <span className="bg-[#0b1b3d] text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
              {product.tag}
            </span>
          )}
        </div>

        {/* Action Buttons Top Right (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2.5 rounded-full transition-all backdrop-blur-md ${
              isWishlisted 
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
                : 'bg-white/90 text-slate-700 hover:text-rose-600 hover:bg-white shadow'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Compare Button */}
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product.id);
              }}
              className={`p-2.5 rounded-full transition-all backdrop-blur-md ${
                isCompared 
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-bold' 
                  : 'bg-white/90 text-slate-700 hover:text-amber-600 hover:bg-white shadow'
              }`}
              title={isCompared ? "Remove from compare" : "Add to compare"}
            >
              <GitCompare className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
        </div>

        {/* Quick View Floating Button */}
        <div className="absolute inset-x-0 bottom-3 px-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-[#0b1b3d]/90 hover:bg-[#0b1b3d] text-white py-2.5 px-4 rounded-xl text-xs font-bold backdrop-blur-md flex items-center justify-center gap-2 shadow-lg transition-colors border border-slate-700"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Quick Preview</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white text-slate-900">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-amber-700 font-extrabold uppercase tracking-wider text-[10px]">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-slate-600 font-bold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors font-serif">
            {product.name}
          </h3>

          {/* Size selector chips */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                  selectedSize === size
                    ? 'bg-[#0b1b3d] text-amber-400 border-[#0b1b3d]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-extrabold text-slate-950 font-sans">
              ৳ {product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through -mt-1 font-medium">
                ৳ {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 ${
              addedAnimation 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline font-bold">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 stroke-[2.3]" />
                <span className="hidden sm:inline font-bold">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
