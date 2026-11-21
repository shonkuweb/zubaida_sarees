import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Trash2,
  Truck,
  Copy,
  MessageCircle,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FashionPlaceholder } from '../components/Placeholders';
import { INDIAN_STATES, checkProductDeliverability } from '../data/indianStates';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    updateCartQuantity, 
    removeFromCart, 
    createOrder,
    clearCart, 
    showToast,
    storeConfig,
    currentUser
  } = useStore();

  const [formData, setFormData] = useState({
    name: currentUser?.fullName || '',
    phone: currentUser?.mobile || '',
    address: '',
    city: 'Pune',
    state: currentUser?.state || 'Maharashtra',
    pincode: currentUser?.pincode || '',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Check deliverability restrictions against cart items
  const deliveryViolations = cart.map(item => {
    const prod = item.product || item;
    const check = checkProductDeliverability(prod, {
      state: formData.state,
      pincode: formData.pincode
    });
    return {
      item,
      title: prod.title || prod.name || 'Artisanal Piece',
      ...check
    };
  }).filter(res => !res.isDeliverable);

  const boutiquePhone = storeConfig?.whatsappNumber || '+91 63925 31412';
  const cleanPhone = boutiquePhone.replace(/[^0-9]/g, '');
  const waTarget = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Please enter your contact phone number', 'error');
      return;
    }
    if (!formData.address.trim()) {
      showToast('Please enter your delivery street address', 'error');
      return;
    }
    if (cart.length === 0) {
      showToast('Your shopping bag is empty', 'error');
      return;
    }
    if (deliveryViolations.length > 0) {
      showToast(deliveryViolations[0].message || 'Some items cannot be delivered to your address', 'error');
      return;
    }

    setIsProcessing(true);

    const combinedLocation = `${formData.address.trim()}, ${formData.city.trim()}, ${formData.state.trim()}${formData.pincode ? ` - ${formData.pincode.trim()}` : ''}`;
    const newOrderId = `HT-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const orderPayload = {
        id: newOrderId,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: combinedLocation,
        items: [...cart],
        subtotal: cartSubtotal,
        total: cartSubtotal,
        totalPrice: cartSubtotal,
        paymentMethod: 'Direct Studio Order (Pay on Delivery)',
        paymentStatus: 'Pending Confirmation',
        notes: formData.notes?.trim() || '',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      const created = await createOrder(orderPayload);
      clearCart();
      setIsProcessing(false);
      setCompletedOrder(created || orderPayload);
      setOrderCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setIsProcessing(false);
      showToast('Could not place order. Please try again or reach us on WhatsApp.', 'error');
    }
  };

  const copyOrderId = () => {
    if (!completedOrder?.id) return;
    navigator.clipboard.writeText(completedOrder.id);
    setCopiedId(true);
    showToast('Order ID copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(false), 2500);
  };

  // ==========================================
  // VIEW: ORDER CONFIRMATION / RECEIPT SCREEN
  // ==========================================
  if (orderCompleted && completedOrder) {
    return (
      <div className="bg-[#FAF8F5] min-h-[90vh] py-8 sm:py-12 animate-fadeIn">
        <div className="max-w-2xl mx-auto px-4">
          
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#DEC49E]/80 p-6 sm:p-9 shadow-xl relative overflow-hidden">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#121212] via-[#C5A059] to-[#121212]" />

            {/* Success Icon & Heading */}
            <div className="text-center space-y-3 pt-2">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-60" />
                <div className="relative w-16 h-16 bg-[#121212] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#121212]/30">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
              </div>

              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-1.5">
                  Order Received & Confirmed
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#18181B] font-medium tracking-tight">
                  Thank You for Your Order!
                </h1>
                <p className="text-xs sm:text-sm text-[#71717A] max-w-md mx-auto mt-1 font-light">
                  Your order has been recorded in the <strong>Zubaida Sarees</strong> studio system. Our team is preparing your handcrafted pieces.
                </p>
              </div>
            </div>

            {/* Order Reference Box */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#DEC49E]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold block">
                  Order Tracking Reference
                </span>
                <span className="font-mono text-xl font-bold text-[#121212] tracking-wide">
                  #{completedOrder.id}
                </span>
              </div>
              <button
                type="button"
                onClick={copyOrderId}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-white border border-[#DEC49E] hover:bg-[#FAF8F5] text-[#18181B] transition-colors cursor-pointer"
              >
                {copiedId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#71717A]" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>

            {/* Transaction & Delivery Metadata */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DEC49E]/60">
                <span className="text-[10px] text-[#71717A] block uppercase font-medium">Order Status</span>
                <span className="font-semibold text-emerald-800 mt-0.5 block truncate">
                  Confirmed
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DEC49E]/60">
                <span className="text-[10px] text-[#71717A] block uppercase font-medium">Payment Mode</span>
                <span className="font-semibold text-[#18181B] mt-0.5 block truncate">
                  Pay on Delivery
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DEC49E]/60 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#71717A] block uppercase font-medium">Amount</span>
                <span className="font-sans font-bold text-sm text-[#121212] mt-0.5 block tabular-nums">
                  ₹{(completedOrder.total || completedOrder.subtotal || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Delivery Address Review */}
            <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#DEC49E]/60 text-xs text-[#71717A] space-y-1">
              <span className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold block">
                Deliver To
              </span>
              <p className="font-semibold text-[#18181B]">{completedOrder.name} ({completedOrder.phone})</p>
              <p className="leading-relaxed">{completedOrder.location}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-[#DEC49E]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#121212] hover:bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Continue Shopping</span>
              </Link>

              <a
                href={`https://wa.me/${waTarget}?text=${encodeURIComponent(
                  `Hello Zubaida Sarees! I just placed order #${completedOrder.id} for ₹${(completedOrder.total || completedOrder.subtotal || 0).toLocaleString('en-IN')}. Name: ${completedOrder.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/15 text-emerald-900 border border-[#25D366]/40 text-xs font-bold hover:bg-[#25D366]/25 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: DIRECT CHECKOUT FORM (NO DUMMY GATEWAY)
  // ==========================================
  return (
    <div className="bg-[#FAF8F5] min-h-[85vh] py-6 sm:py-10 animate-fadeIn">
      
      {/* PROCESSING OVERLAY */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-[#18181B]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#DEC49E] p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 bg-[#121212]/10 text-[#121212] rounded-full flex items-center justify-center mx-auto relative">
              <span className="absolute inset-0 rounded-full border-3 border-[#121212] border-t-transparent animate-spin" />
              <ShoppingBag className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-xl font-medium text-[#18181B]">
                Confirming Order
              </h3>
              <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                Recording your order with Zubaida Sarees studio...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md md:max-w-4xl lg:max-w-5xl mx-auto px-4">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#71717A] mb-6">
          <Link to="/" className="hover:text-[#121212] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <span className="text-[#C5A059]">/</span>
          <span className="text-[#18181B] font-medium font-serif italic">Checkout</span>
        </div>

        {/* Page Title */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DEC49E]/60 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Zubaida Sarees</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#18181B] font-medium tracking-tight">
              Delivery & Order Confirmation
            </h1>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-[#71717A] block">Pune Studio Desk</span>
            <p className="font-mono text-xs font-semibold text-[#121212]">{boutiquePhone}</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-16 text-center bg-[#FFFFFF] rounded-2xl border border-dashed border-[#DEC49E] p-6 space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#DEC49E] mx-auto" />
            <div>
              <p className="font-serif text-lg text-[#18181B] mb-1">Your bag is currently empty</p>
              <p className="text-xs text-[#71717A] max-w-xs mx-auto">
                Select your favorite handcrafted piece from our collection to proceed.
              </p>
            </div>
            <Link
              to="/"
              className="inline-block px-7 py-3 bg-[#121212] hover:bg-[#0A0A0A] text-white rounded-full text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Delivery Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DEC49E]/80 p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <h2 className="font-serif text-lg font-medium text-[#18181B] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#121212] text-white text-xs flex items-center justify-center font-bold">1</span>
                    <span>Delivery Address & Contact</span>
                  </h2>
                  <span className="text-[11px] text-[#C5A059] font-sans font-medium">
                    ✦ Pan-India Express Delivery
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[#18181B] font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-[#18181B] font-medium mb-1.5">
                      Contact Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 6392531412"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                    />
                    <p className="text-[10px] text-[#71717A] mt-1">
                      Our studio concierge will share dispatch updates and live tracking on this number.
                    </p>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-[#18181B] font-medium mb-1.5">
                      Street Address / House No / Landmark *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      placeholder="Flat, House no., Building, Street, Landmark"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                    />
                  </div>

                  {/* City, State & Pincode Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#18181B] font-medium mb-1.5 text-xs">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Pune"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2.5 sm:p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#18181B] font-medium mb-1.5 text-xs">
                        State / UT *
                      </label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-2.5 sm:p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                      >
                        {INDIAN_STATES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#18181B] font-medium mb-1.5 text-xs">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        placeholder="e.g. 411001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-2.5 sm:p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                      />
                    </div>
                  </div>

                  {/* Delivery Violations Warning Alert */}
                  {deliveryViolations.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#FFF3CD] border border-[#FFEEBA] text-[#856404] text-xs space-y-1 animate-in fade-in duration-200">
                      <div className="font-bold flex items-center gap-1.5 text-sm text-[#856404]">
                        <span>⚠️</span>
                        <span>Delivery Restriction Notice</span>
                      </div>
                      <p>
                        The following item(s) in your bag cannot be delivered to {formData.city}, {formData.state} ({formData.pincode || 'pincode not specified'}):
                      </p>
                      <ul className="list-disc pl-5 space-y-0.5">
                        {deliveryViolations.map((v, i) => (
                          <li key={i}>
                            <strong>{v.title}</strong>: {v.message}
                          </li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-[#856404]/80 pt-1">
                        Please update your delivery location or contact studio concierge on WhatsApp for bespoke shipping.
                      </p>
                    </div>
                  )}

                  {/* Special Sizing or Delivery Notes */}
                  <div>
                    <label className="block text-[#18181B] font-medium mb-1.5">
                      Special Sizing or Delivery Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Preferred delivery time, custom sleeve length notes..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-white border border-[#DEC49E] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#121212] text-[#18181B]"
                    />
                  </div>
                </div>
              </div>

              {/* Trust & Guarantee Banner */}
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#DEC49E]/70 p-4 flex items-center gap-3 text-xs text-[#71717A]">
                <ShieldCheck className="w-5 h-5 text-[#121212] shrink-0" />
                <div>
                  <span className="font-semibold text-[#18181B] block">Zubaida Sarees Guarantee</span>
                  <span className="text-[11px] text-[#71717A]">
                    Artisanal craftsmanship • Pan-India Studio Delivery • Thoughtful details & premium quality.
                  </span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order CTA */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DEC49E]/80 p-5 sm:p-6 shadow-xs space-y-4 sticky top-24">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <h2 className="font-serif text-lg font-medium text-[#18181B]">
                    Order Summary
                  </h2>
                  <span className="text-xs text-[#71717A] font-medium">
                    {cart.length} {cart.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-none">
                  {cart.map((item, idx) => {
                    const product = item?.product || item || {};
                    const pid = product.id || item?.id || `checkout-item-${idx}`;
                    const title = product.title || product.name || 'Handcrafted Apparel';
                    const price = Number(product.price) || 0;
                    const quantity = Number(item?.quantity) || 1;
                    const itemTotal = price * quantity;
                    const imageUrl = (Array.isArray(product.images) && product.images[0]) || product.imageUrl;
                    const selectedSize = item?.selectedSize || product.selectedSize;

                    return (
                      <div 
                        key={`${pid}-${idx}`}
                        className="flex gap-3 pb-3 border-b border-[#E8E2D8]/40 last:border-b-0"
                      >
                        {/* Image Thumbnail */}
                        <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-[#FAF8F5] border border-[#DEC49E]/70">
                          <FashionPlaceholder 
                            type={product.placeholderKey || 'kurta'} 
                            imageUrl={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover object-top" 
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-xs font-semibold text-[#18181B] line-clamp-1">
                              {title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#71717A]">
                              <span className="font-sans tabular-nums font-bold text-[#121212]">₹{price.toLocaleString('en-IN')}</span>
                              {selectedSize && (
                                <span className="bg-[#FAF8F5] px-1.5 py-0.2 rounded border border-[#DEC49E]/60 text-[10px]">
                                  Size: {selectedSize}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="inline-flex items-center bg-[#FAF8F5] border border-[#DEC49E]/80 rounded-full px-1.5 py-0.5 text-xs">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(pid, -1)}
                                className="p-0.5 text-[#18181B] hover:text-[#121212] cursor-pointer"
                                title="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-5 text-center font-semibold text-[#18181B] select-none tabular-nums">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(pid, 1)}
                                className="p-0.5 text-[#18181B] hover:text-[#121212] cursor-pointer"
                                title="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-sans font-bold text-xs text-[#121212] tabular-nums">
                                ₹{itemTotal.toLocaleString('en-IN')}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFromCart(pid)}
                                className="text-[#71717A] hover:text-[#121212] p-0.5 cursor-pointer transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-[#E8E2D8] space-y-2 text-xs text-[#71717A]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-sans font-bold text-[#18181B] tabular-nums">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#71717A]">
                    <span>Delivery</span>
                    <span className="font-medium text-emerald-800">Free Pan-India Delivery</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#18181B] pt-2 border-t border-[#E8E2D8]">
                    <span>Total Amount</span>
                    <span className="font-sans text-xl font-bold text-[#121212] tabular-nums">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-5 bg-[#121212] hover:bg-[#0A0A0A] active:scale-98 text-[#FFFFFF] rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-[#121212]/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>Place Order (₹{cartSubtotal.toLocaleString('en-IN')})</span>
                  </button>

                  <p className="text-[10px] text-center text-[#71717A] mt-2.5 flex items-center justify-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Pay on Delivery / Direct Studio Confirmation</span>
                  </p>
                </div>

                {/* Studio Help Box */}
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DEC49E]/70 text-[11px] text-[#71717A] space-y-1">
                  <p className="font-semibold text-[#18181B]">Need styling or order assistance?</p>
                  <p>WhatsApp our Pune Studio: <strong className="text-[#121212]">{boutiquePhone}</strong></p>
                </div>

              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
