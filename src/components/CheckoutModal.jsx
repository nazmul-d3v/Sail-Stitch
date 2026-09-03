import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Truck, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

const DISTRICTS = [
  'Dhaka City', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj', 'Gazipur'
];

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onClearCart,
  user
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    district: 'Dhaka City',
    notes: ''
  });
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email,
          phone: user.phone || prev.phone
        }));
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 3000 ? 0 : 120;
  const grandTotal = subtotal + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = 'SS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('success');

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8"
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold font-serif tracking-tight">Checkout • Sail & Stitch</h2>
            <p className="text-slate-400 text-xs mt-0.5">Complete your shipping & payment details</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Customer & Delivery Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-600" />
                  Shipping Information
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nazmul Hossain"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">District / City *</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="House / Flat No, Road Name, Area..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Right Column: Payment Gateway Selection & Order Summary */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  Select Payment Gateway
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      paymentMethod === 'bkash' 
                        ? 'border-pink-600 bg-pink-50 text-pink-700 font-bold shadow' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <span className="text-[11px]">bKash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      paymentMethod === 'nagad' 
                        ? 'border-orange-600 bg-orange-50 text-orange-700 font-bold shadow' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    <span className="text-[11px]">Nagad</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-slate-900 bg-slate-100 text-slate-900 font-bold shadow' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 text-slate-900" />
                    <span className="text-[11px]">Cash on Delivery</span>
                  </button>
                </div>

                {/* Order Summary Box */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-xs">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Order Summary ({cartItems.length} items)
                  </div>
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-600">
                      <span className="line-clamp-1">{item.name} (x{item.quantity})</span>
                      <span className="font-semibold text-slate-900">৳ {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-950">
                    <span>Total Amount Payable</span>
                    <span className="text-amber-700 text-sm">৳ {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] uppercase tracking-wide"
                >
                  PLACE CONFIRMED ORDER • ৳ {grandTotal.toLocaleString()}
                </button>
              </div>

            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-4 my-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 stroke-[2.2]" />
            </div>

            <h3 className="text-2xl font-bold font-serif text-slate-900">
              Order Confirmed Successfully!
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
              Thank you for shopping with <strong>Sail & Stitch</strong>. Your order ID is <strong className="text-amber-600 font-mono text-base bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{orderId}</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-700">
              <div><strong>Recipient:</strong> {formData.name} ({formData.phone})</div>
              <div><strong>Address:</strong> {formData.address}, {formData.district}</div>
              <div><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</div>
              <div><strong>Estimated Delivery:</strong> Within 24-48 Hours</div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs px-8 py-3 rounded-full transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
