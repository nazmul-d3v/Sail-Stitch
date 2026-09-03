import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import StoreLocatorModal from './components/StoreLocatorModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import BlogModal from './components/BlogModal';
import AboutUsModal from './components/AboutUsModal';
import WishlistModal from './components/WishlistModal';
import CompareModal from './components/CompareModal';
import Footer from './components/Footer';
import { PRODUCTS, CATEGORIES } from './data/products';
import { SlidersHorizontal, ArrowUpDown, ShoppingBag, Home, MapPin, Search, Sparkles } from 'lucide-react';

export default function App() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [priceRange, setPriceRange] = useState(15000);
  
  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // User Authentication state persisted in localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sail_stitch_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Cart & Wishlist persisted in localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('sail_stitch_cart');
    return saved ? JSON.parse(saved) : [
      { ...PRODUCTS[0], selectedSize: 'L', selectedColor: 'Imperial Maroon', quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sail_stitch_wishlist');
    return saved ? JSON.parse(saved) : ['em-01', 'ew-01'];
  });

  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('sail_stitch_compare');
    return saved ? JSON.parse(saved) : ['em-01', 'em-02'];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sail_stitch_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sail_stitch_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sail_stitch_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('sail_stitch_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sail_stitch_compare', JSON.stringify(compareList));
  }, [compareList]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Handlers
  const handleAddToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { 
          ...product, 
          selectedSize, 
          selectedColor: selectedColor || product.colors?.[0]?.name, 
          quantity 
        }];
      }
    });
  };

  const handleUpdateQuantity = (productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, selectedSize);
      return;
    }
    setCartItems(prev => prev.map(item => 
      (item.id === productId && item.selectedSize === selectedSize)
        ? { ...item, quantity: newQty }
        : item
    ));
  };

  const handleRemoveFromCart = (productId, selectedSize) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === selectedSize)));
  };

  const handleToggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleToggleCompare = (productId) => {
    setCompareList(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // Price filter
      if (product.price > priceRange) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 flex flex-col font-sans">
      
      {/* Sticky Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        compareCount={compareList.length}
        onGoHome={() => {
          setSelectedCategory('all');
          setSearchQuery('');
          setPriceRange(15000);
          setSortBy('featured');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Hero Banner Slider */}
      {selectedCategory === 'all' && !searchQuery && (
        <HeroSlider onSelectCategory={setSelectedCategory} />
      )}

      {/* Category Grid Section */}
      {selectedCategory === 'all' && !searchQuery && (
        <CategoryGrid onSelectCategory={setSelectedCategory} />
      )}

      {/* Main Product Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section Header & Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{searchQuery ? `Search Results for "${searchQuery}"` : 'Sail & Stitch Catalog'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight capitalize">
              {selectedCategory === 'all' ? 'All Signature Collections' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Showing <strong className="text-amber-400 font-mono text-sm">{filteredProducts.length}</strong> premium fashion items
            </p>
          </div>

          {/* Sort & Price Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs shadow-md">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-slate-300">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900 text-white">Featured & Newest</option>
                <option value="price-low" className="bg-slate-900 text-white">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="flex items-center gap-2.5 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs shadow-md">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-slate-300">Max Price:</span>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-24 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono font-bold text-amber-400">৳ {priceRange.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/60 rounded-3xl border border-slate-800 shadow-xl p-8 space-y-3">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
              <Search className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any items matching your selected category, search query, or price filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceRange(15000);
              }}
              className="mt-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-full transition-all shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onToggleCompare={handleToggleCompare}
                isCompared={compareList.includes(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenAboutUs={() => setIsAboutUsOpen(true)}
        onOpenBlog={() => setIsBlogOpen(true)}
      />

      {/* Mobile Bottom Sticky Navigation */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-6 py-2.5 flex items-center justify-between text-white text-[10px]">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-amber-400 font-bold"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setIsStoreLocatorOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white"
        >
          <MapPin className="w-5 h-5" />
          <span>Outlets</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-slate-950">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
        user={user}
      />

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      {/* User Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* User Profile & Account Drawer Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onLogout={handleLogout}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setSelectedCategory('all')}
      />

      {/* Blog & Fashion Journal Modal */}
      <BlogModal
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
      />

      {/* About Us & Heritage Modal */}
      <AboutUsModal
        isOpen={isAboutUsOpen}
        onClose={() => setIsAboutUsOpen(false)}
      />

      {/* Wishlist Modal Drawer */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Compare Specifications Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareIds={compareList}
        onRemoveFromCompare={handleToggleCompare}
        onClearCompare={() => setCompareList([])}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}
