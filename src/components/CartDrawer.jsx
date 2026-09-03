import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onOpenCheckout 
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.10) : 0;
  const shippingFee = subtotal > 3000 || subtotal === 0 ? 0 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'SAIL10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try SAIL10 for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-right">
          
          {/* Drawer Header */}
          <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold font-serif tracking-tight">Your Shopping Bag</h2>
              <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-slate-900 text-slate-200 text-xs p-3.5 px-6 border-b border-slate-800 space-y-1.5">
            <div className="flex justify-between font-medium">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Congratulations! You unlocked FREE Delivery!
                  </span>
                ) : (
                  <span>Add <strong>৳ {(freeShippingThreshold - subtotal).toLocaleString()}</strong> more for FREE Delivery</span>
                )}
              </span>
              <span className="font-extrabold text-amber-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3 py-12">
                <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-700">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover our latest Panjabi, Kurti, and Western collections and add your favorite pieces.
                </p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={`${item.id}-${item.selectedSize}-${idx}`} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top rounded-xl border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-medium">
                        <span>Size: <strong className="text-slate-800">{item.selectedSize}</strong></span>
                        {item.selectedColor && (
                          <>
                            <span>•</span>
                            <span>Color: <strong className="text-slate-800">{item.selectedColor}</strong></span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-extrabold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-slate-950 font-sans">
                        ৳ {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Calculation */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo Coupon (SAIL10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      disabled={promoApplied}
                      className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-amber-500 uppercase font-semibold"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="bg-slate-900 hover:bg-slate-800 disabled:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    {promoApplied ? 'Applied!' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> 10% Discount applied! (Saved ৳ {discountAmount.toLocaleString()})
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-900">৳ {subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (SAIL10)</span>
                    <span>- ৳ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `৳ ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-amber-700">৳ {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
