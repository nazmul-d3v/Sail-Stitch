import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Truck, ShieldCheck, RefreshCw, Check } from 'lucide-react';

export default function ProductQuickView({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted 
}) {
  const [selectedImage, setSelectedImage] = useState(product?.mainImage || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.mainImage);
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedColor(product.colors?.[0] || null);
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor?.name, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 animate-slide-up"
      >
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-inner mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />
              {product.discount && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-amber-500 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Specs & Options */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-700 font-extrabold uppercase tracking-wider mb-2">
                <span>{product.category.replace('-', ' ')}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold">
                  In Stock
                </span>
              </div>

              <h2 className="text-2xl font-bold font-serif text-slate-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold text-slate-950 font-sans">
                  ৳ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through font-medium">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                {product.description}
              </p>

              <div className="my-4 pt-4 border-t border-slate-100 space-y-4">
                {/* Fabric Information */}
                <div>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fabric & Material:</span>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">{product.fabric}</p>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2">
                    <span>SELECT SIZE:</span>
                    <span className="text-amber-600 hover:underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                          selectedSize === size
                            ? 'bg-slate-950 text-amber-400 border-slate-950 shadow-md'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-slate-900 block mb-2">COLOR OPTION:</span>
                    <div className="flex items-center gap-3">
                      {product.colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col)}
                          title={col.name}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor?.name === col.name ? 'border-amber-500 scale-110 shadow' : 'border-slate-300'
                          }`}
                          style={{ backgroundColor: col.hex }}
                        >
                          {selectedColor?.name === col.name && (
                            <Check className={`w-3.5 h-3.5 ${col.hex === '#ffffff' ? 'text-slate-950' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                      <span className="text-xs text-slate-600 font-medium ml-1">
                        {selectedColor?.name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-bold text-slate-900">QUANTITY:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-extrabold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 stroke-[2.3]" />
                      <span>ADD TO SHOPPING BAG • ৳ {(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-200 text-rose-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 text-center pt-2">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>24-48h Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Original Quality</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                  <span>7 Days Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
