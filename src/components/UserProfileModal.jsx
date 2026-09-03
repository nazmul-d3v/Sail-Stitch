import React from 'react';
import { X, User, Mail, Phone, Award, Package, Heart, LogOut, ShieldCheck, Clock, CheckCircle, ExternalLink } from 'lucide-react';

export default function UserProfileModal({
  isOpen,
  onClose,
  user,
  onLogout,
  wishlistCount,
  onOpenWishlist
}) {
  if (!isOpen || !user) return null;

  const mockOrders = [
    {
      id: 'SS-894120',
      date: '02 Sep 2026',
      items: 'Imperial Crimson Jacquard Silk Panjabi (x1)',
      total: 4950,
      status: 'In Transit',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      id: 'SS-481902',
      date: '15 Aug 2026',
      items: 'Emerald Blossom Embroidered Kurti Set (x1)',
      total: 3950,
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8"
      >
        
        {/* Profile Banner */}
        <div className="p-6 bg-gradient-to-r from-[#0b1b3d] via-[#112856] to-[#0b1b3d] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-500 w-4 h-4 rounded-full border-2 border-[#0b1b3d]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                <Award className="w-3 h-3 text-amber-400" />
                <span>{user.memberTier || 'VIP Member'}</span>
              </div>
              <h2 className="text-xl font-extrabold font-serif text-white">{user.name}</h2>
              <p className="text-xs text-slate-300 font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Account Overview Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-700 rounded-xl">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm">{mockOrders.length}</div>
                <div className="text-slate-500 font-medium">Total Orders</div>
              </div>
            </div>

            <div 
              onClick={() => { onClose(); onOpenWishlist(); }}
              className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-rose-300 transition-colors"
            >
              <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm">{wishlistCount} Saved</div>
                <div className="text-slate-500 font-medium">My Wishlist</div>
              </div>
            </div>
          </div>

          {/* Customer Details Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
            <div className="font-bold text-slate-900 border-b border-slate-200 pb-2 uppercase tracking-wider text-[10px]">
              Personal Contact Information
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2 text-slate-500">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                Email Address:
              </span>
              <span className="font-semibold text-slate-900">{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2 text-slate-500">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                Mobile Phone:
              </span>
              <span className="font-semibold text-slate-900">{user.phone}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-2 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Member Since:
              </span>
              <span className="font-semibold text-slate-900">{user.joinedDate || 'Aug 2026'}</span>
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-600" />
                Recent Order History
              </h3>
              <span className="text-[11px] text-amber-700 font-bold">2 Orders</span>
            </div>

            <div className="space-y-2">
              {mockOrders.map((ord) => (
                <div key={ord.id} className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ord.statusColor}`}>
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{ord.items}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">৳ {ord.total.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">{ord.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Account</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
