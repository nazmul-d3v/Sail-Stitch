import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function WishlistModal({ 
  isOpen, 
  onClose, 
  wishlist, 
  onToggleWishlist, 
  onAddToCart,
  onOpenCart 
}) {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0b1b3d] via-[#112856] to-[#0b1b3d] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-1">
              <Heart className="w-4 h-4 fill-current" />
              <span>Saved Favorites</span>
            </div>
            <h2 className="text-2xl font-extrabold font-serif text-white tracking-tight">
              My Wishlist ({wishlistedProducts.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-4">
          
          {wishlistedProducts.length === 0 ? (
            /* Empty Wishlist View */
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-200">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our signature Panjabis, Kurtis, Menswear & Accessories, and tap the heart icon to save your favorite pieces!
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#0b1b3d] hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs px-8 py-3 rounded-full transition-all shadow-md uppercase tracking-wider"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            /* Wishlist Items List */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span>Showing {wishlistedProducts.length} saved item(s)</span>
                <button
                  onClick={() => {
                    wishlist.forEach(id => onToggleWishlist(id));
                  }}
                  className="text-rose-600 hover:underline font-bold text-[11px]"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3.5 group hover:shadow-md transition-shadow relative"
                  >
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-20 h-24 object-cover object-top rounded-xl bg-white shrink-0 border border-slate-200"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
                          {product.category.replace('-', ' ')}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 font-serif group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h4>
                        <div className="text-sm font-extrabold text-slate-950 font-mono mt-1">
                          ৳ {product.price.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/60">
                        <button
                          onClick={() => {
                            onAddToCart(product, product.sizes[0] || 'M');
                            onOpenCart();
                            onClose();
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 stroke-[2.3]" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
