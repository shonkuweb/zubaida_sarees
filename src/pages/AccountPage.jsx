import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  MapPin, 
  Package, 
  ShoppingBag, 
  LogOut, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Edit2,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { INDIAN_STATES } from '../data/indianStates';
import { Footer } from '../components/Footer';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    signUpCustomer, 
    loginCustomer, 
    logoutCustomer, 
    updateCustomerProfile,
    orders,
    storeConfig,
    showToast 
  } = useStore();

  // Mode: 'login' | 'signup'
  const [authMode, setAuthMode] = useState('login');

  // Form States
  const [loginForm, setLoginForm] = useState({
    mobile: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    fullName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    state: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    pincode: '',
    state: ''
  });

  const boutiquePhone = storeConfig?.whatsappNumber || '+91 63925 31412';
  const cleanPhone = boutiquePhone.replace(/[^0-9]/g, '');

  // Filter orders matching current logged-in user
  const userOrders = currentUser 
    ? orders.filter(o => {
        const orderPhone = (o.phone || o.customerMobile || '').replace(/[^0-9]/g, '');
        return orderPhone && orderPhone.endsWith(currentUser.mobile);
      })
    : [];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.mobile.trim()) {
      showToast('Please enter your mobile number', 'error');
      return;
    }
    if (!loginForm.password) {
      showToast('Please enter your password', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      loginCustomer({
        mobile: loginForm.mobile,
        password: loginForm.password
      });
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      showToast(err.message || 'Login failed', 'error');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupForm.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    const cleanMob = signupForm.mobile.replace(/[^0-9]/g, '');
    if (cleanMob.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!signupForm.password || signupForm.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (!signupForm.pincode || signupForm.pincode.trim().length !== 6) {
      showToast('Please enter a valid 6-digit delivery pincode', 'error');
      return;
    }
    if (!signupForm.state) {
      showToast('Please select your state or region', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      signUpCustomer({
        fullName: signupForm.fullName,
        mobile: signupForm.mobile,
        password: signupForm.password,
        pincode: signupForm.pincode,
        state: signupForm.state
      });
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      showToast(err.message || 'Account creation failed', 'error');
    }
  };

  const handleStartEdit = () => {
    if (!currentUser) return;
    setEditForm({
      fullName: currentUser.fullName || '',
      pincode: currentUser.pincode || '',
      state: currentUser.state || 'Maharashtra'
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editForm.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    updateCustomerProfile(editForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      
      <div className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          
          {/* ========================================================
              IF NOT LOGGED IN: SHOW WELCOME BACK / CREATE AN ACCOUNT CARD
             ======================================================== */}
          {!currentUser ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(92,6,28,0.06)] border border-[#DEC49E]/70 animate-in fade-in duration-300">
              
              {/* Brand Top Pill */}
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C5A059]/50 text-[11px] font-sans font-bold text-[#121212] tracking-wide">
                  <span>🌸</span>
                  <span>Zubaida Sarees</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-6">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18181B] leading-tight">
                  {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h1>
                <p className="text-xs text-[#71717A] mt-1.5 leading-relaxed">
                  {authMode === 'login' 
                    ? 'Log in with your mobile number and password to track orders and manage your account.' 
                    : 'Sign up to track live orders, view purchase history, and enjoy smooth bespoke shopping.'}
                </p>
              </div>

              {/* Pill Tabs: [ Log In ] [ Sign Up ] */}
              <div className="flex items-center p-1 bg-[#F5EFE6] rounded-full mb-6 border border-[#DEC49E]/50">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-xs font-sans font-bold rounded-full transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white text-[#121212] shadow-xs'
                      : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 text-xs font-sans font-bold rounded-full transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white text-[#121212] shadow-xs'
                      : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* ================= LOG IN FORM ================= */}
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex items-center border border-[#DEC49E] rounded-xl overflow-hidden bg-white focus-within:ring-1 focus-within:ring-[#121212] focus-within:border-[#121212]">
                      <span className="px-3 py-2.5 bg-[#FAF8F5] text-xs font-bold text-[#121212] border-r border-[#DEC49E]">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="10-digit mobile number"
                        value={loginForm.mobile}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, mobile: e.target.value.replace(/[^0-9]/g, '') }))}
                        className="flex-1 px-3 py-2.5 text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-3 py-2.5 pr-10 border border-[#DEC49E] rounded-xl text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#18181B] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#121212] hover:bg-[#0A0A0A] text-[#FFFFFF] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                      <span>Log In</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Switch to Sign Up */}
                  <div className="text-center pt-2">
                    <p className="text-xs text-[#71717A]">
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className="font-bold text-[#121212] hover:underline cursor-pointer"
                      >
                        Create one now
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* ================= SIGN UP FORM ================= */
                <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Riddhi Sharma"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-[#DEC49E] rounded-xl text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex items-center border border-[#DEC49E] rounded-xl overflow-hidden bg-white focus-within:ring-1 focus-within:ring-[#121212] focus-within:border-[#121212]">
                      <span className="px-3 py-2 bg-[#FAF8F5] text-xs font-bold text-[#121212] border-r border-[#DEC49E]">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="10-digit mobile number"
                        value={signupForm.mobile}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, mobile: e.target.value.replace(/[^0-9]/g, '') }))}
                        className="flex-1 px-3 py-2 text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Set password (min 6 characters)"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-3 py-2 pr-10 border border-[#DEC49E] rounded-xl text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#18181B] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Re-enter your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-3 py-2 pr-10 border border-[#DEC49E] rounded-xl text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#18181B] cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Delivery Pincode */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Delivery Pincode *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="6-digit PIN code (e.g. 411001)"
                      value={signupForm.pincode}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, pincode: e.target.value.replace(/[^0-9]/g, '') }))}
                      className="w-full px-3 py-2 border border-[#DEC49E] rounded-xl text-xs sm:text-sm text-[#18181B] placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
                    />
                  </div>

                  {/* State / Region Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      State / Region *
                    </label>
                    <select
                      required
                      value={signupForm.state}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-[#DEC49E] rounded-xl text-xs sm:text-sm text-[#18181B] bg-white focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
                    >
                      <option value="">-- Select Your State --</option>
                      {INDIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#121212] hover:bg-[#0A0A0A] text-[#FFFFFF] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                      <span>Create Account</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Switch to Log In */}
                  <div className="text-center pt-2">
                    <p className="text-xs text-[#71717A]">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="font-bold text-[#121212] hover:underline cursor-pointer"
                      >
                        Log In
                      </button>
                    </p>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* ========================================================
                IF LOGGED IN: CUSTOMER ACCOUNT DETAILS & ORDERS DASHBOARD
               ======================================================== */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Profile Card Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(92,6,28,0.06)] border border-[#DEC49E]/70 relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Initials Avatar */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#121212] to-[#8C1733] text-[#FFFFFF] flex items-center justify-center font-serif text-xl font-bold shadow-md">
                      {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'P'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#18181B] leading-tight">
                          {currentUser.fullName}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DEC49E] text-[10px] font-sans font-bold text-[#121212]">
                          ✓ Patron
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#71717A] mt-0.5">
                        +91 {currentUser.mobile}
                      </p>
                      <p className="text-[11px] text-[#A68A78] mt-0.5">
                        Member since {currentUser.joinedAt || '2024'}
                      </p>
                    </div>
                  </div>

                  {/* Log Out Button */}
                  <button
                    type="button"
                    onClick={logoutCustomer}
                    className="p-2 text-neutral-400 hover:text-[#121212] hover:bg-[#FAF8F5] rounded-full transition-colors cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

                {/* Primary Shipping Details Summary */}
                <div className="mt-5 pt-4 border-t border-[#F0E4D5] grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DEC49E]/50">
                    <span className="text-[10px] font-bold text-[#71717A] uppercase block">
                      Delivery Pincode
                    </span>
                    <span className="font-sans font-bold text-[#18181B] text-sm mt-0.5 block">
                      {currentUser.pincode || '411001'}
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DEC49E]/50">
                    <span className="text-[10px] font-bold text-[#71717A] uppercase block">
                      State / Region
                    </span>
                    <span className="font-sans font-bold text-[#18181B] text-sm mt-0.5 block truncate">
                      {currentUser.state || 'Maharashtra'}
                    </span>
                  </div>
                </div>

                {/* Edit Profile Toggle */}
                {!isEditingProfile ? (
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleStartEdit}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121212] hover:underline cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="mt-4 pt-4 border-t border-[#F0E4D5] space-y-3">
                    <h3 className="font-serif text-sm font-bold text-[#18181B]">Update Profile Details</h3>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#18181B] mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editForm.fullName}
                        onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-3 py-1.5 border border-[#DEC49E] rounded-lg text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#18181B] mb-1">Pincode</label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={editForm.pincode}
                          onChange={(e) => setEditForm(prev => ({ ...prev, pincode: e.target.value.replace(/[^0-9]/g, '') }))}
                          className="w-full px-3 py-1.5 border border-[#DEC49E] rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#18181B] mb-1">State</label>
                        <select
                          required
                          value={editForm.state}
                          onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full px-3 py-1.5 border border-[#DEC49E] rounded-lg text-xs bg-white"
                        >
                          {INDIAN_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#121212] text-white rounded-lg text-xs font-bold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}

              </div>

              {/* Order History Section */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(92,6,28,0.06)] border border-[#DEC49E]/70">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#18181B]">
                      My Orders &amp; Purchases
                    </h3>
                    <p className="text-xs text-[#71717A]">
                      Live order status and previous studio commissions
                    </p>
                  </div>
                  <Package className="w-5 h-5 text-[#C5A059]" />
                </div>

                {userOrders.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DEC49E]">
                    <ShoppingBag className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-60" />
                    <p className="font-serif text-sm font-medium text-[#18181B]">
                      No orders placed yet
                    </p>
                    <p className="text-xs text-[#71717A] mt-1 max-w-xs mx-auto">
                      Explore our handcrafted kurtas, sarees, and festive silhouettes.
                    </p>
                    <Link
                      to="/"
                      className="inline-block mt-4 px-6 py-2 bg-[#121212] text-white rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#0A0A0A] transition-colors"
                    >
                      Explore Collection
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userOrders.map((order) => (
                      <div 
                        key={order.id} 
                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DEC49E]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[#121212]">
                              {order.id}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                              {order.paymentStatus || 'Order Placed'}
                            </span>
                          </div>
                          <p className="text-xs text-[#71717A] mt-1">
                            {order.items?.length || 1} item(s) • ₹{(order.total || order.subtotal || 0).toLocaleString('en-IN')}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            {order.date} • {order.location || 'Pune Studio Dispatch'}
                          </p>
                        </div>

                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi Zubaida Sarees, inquiring about my order ${order.id}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DEC49E] text-xs font-medium text-[#121212] hover:bg-[#FAF8F5] transition-colors self-start sm:self-auto"
                        >
                          <span>Track WhatsApp</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Studio Concierge Assistance */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DEC49E]/70 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#121212] block">Need assistance with your account?</span>
                  <span className="text-[#71717A]">Our Pune studio team is available on WhatsApp</span>
                </div>
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Zubaida Sarees, I need help with my account.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#121212] text-white rounded-full text-xs font-bold shrink-0 hover:bg-[#0A0A0A] transition-colors"
                >
                  Contact
                </a>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Brand Footer */}
      <Footer />

    </div>
  );
};
