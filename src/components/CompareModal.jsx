import React from 'react';
import { X, GitCompare, Star, ShoppingBag, Trash2, CheckCircle2, Sparkles, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function CompareModal({ 
  isOpen, 
  onClose, 
  compareIds, 
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart,
  onOpenCart,
  onSelectCategory
}) {
  if (!isOpen) return null;

  const comparedProducts = PRODUCTS.filter(p => compareIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0b1b3d] via-[#112856] to-[#0b1b3d] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest mb-1">
              <GitCompare className="w-4 h-4" />
              <span>Product Comparison Engine</span>
            </div>
            <h2 className="text-2xl font-extrabold font-serif text-white tracking-tight">
              Compare Specifications ({comparedProducts.length} Items Selected)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-slate-300 hover:text-rose-400 font-bold underline"
              >
                Clear Compare List
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Comparison Matrix */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">

          {comparedProducts.length === 0 ? (
            /* Empty Compare State */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <GitCompare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">No Products Added for Comparison</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select products from the catalog to compare their fabrics, prices, available sizes, and customer ratings side-by-side!
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#0b1b3d] hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs px-8 py-3 rounded-full transition-all shadow-md uppercase tracking-wider"
              >
                Browse Product Catalog
              </button>
            </div>
          ) : (
            /* Side by Side Comparison Grid */
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[600px]">
                {comparedProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-4 relative shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveFromCompare(product.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full shadow border border-slate-200 transition-colors z-10"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Product Image & Title */}
                    <div className="space-y-3">
                      <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-slate-200">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                          {product.category.replace('-', ' ')}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 font-serif line-clamp-2 leading-snug">
                          {product.name}
                        </h4>
                      </div>
                    </div>

                    {/* Specs List */}
                    <div className="space-y-3 text-xs border-t border-slate-200 pt-3">
                      {/* Price */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Price</span>
                        <div className="text-base font-extrabold text-slate-950 font-mono">
                          ৳ {product.price.toLocaleString()}
                        </div>
                        {product.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ৳ {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Rating</span>
                        <div className="flex items-center gap-1 font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 text-[11px]">({product.reviewsCount} reviews)</span>
                        </div>
                      </div>

                      {/* Available Sizes */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Available Sizes</span>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((sz) => (
                            <span key={sz} className="text-[10px] bg-white border border-slate-200 font-bold px-2 py-0.5 rounded text-slate-700">
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Fabric Material */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Fabric & Material</span>
                        <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                          {product.fabric || 'Premium Combed Cotton & Silk Blend'}
                        </p>
                      </div>

                      {/* Availability */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Availability</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          In Stock (Ready to ship)
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-slate-200">
                      <button
                        onClick={() => {
                          onAddToCart(product, product.sizes[0] || 'M');
                          onOpenCart();
                          onClose();
                        }}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors uppercase tracking-wider"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[2.3]" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
