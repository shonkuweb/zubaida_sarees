import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Minus, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Camera,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  Sparkles,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FashionPlaceholder } from '../components/Placeholders';
import { Footer } from '../components/Footer';

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    products, 
    addToCart, 
    setIsCartOpen, 
    isWishlisted, 
    toggleWishlist,
    storeConfig,
    showToast 
  } = useStore();

  const product = products.find(p => p.id === id || p.slug === id);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Available product sizes (empty by default unless set by admin)
  const availableSizes = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes.filter(s => typeof s === 'string' && s.trim());
    }
    if (typeof product.sizes === 'string' && product.sizes.trim()) {
      return product.sizes.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    } else {
      setSelectedSize(null);
    }
  }, [availableSizes]);

  const phone = storeConfig?.whatsappNumber || '+91 63925 31412';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  // Scroll to top and reset gallery when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [id]);

  // Extract all available images uploaded for this product
  const allImages = useMemo(() => {
    if (!product) return [];
    const set = new Set();
    if (Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (img && typeof img === 'string' && img.trim()) {
          set.add(img.trim());
        }
      });
    }
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach(img => {
        if (img && typeof img === 'string' && img.trim()) {
          set.add(img.trim());
        }
      });
    }
    if (product.imageUrl && typeof product.imageUrl === 'string' && product.imageUrl.trim()) {
      set.add(product.imageUrl.trim());
    }
    return Array.from(set);
  }, [product]);

  const hasMultipleImages = allImages.length > 1;
  const currentImage = (allImages.length > 0 && allImages[activeImageIndex])
    ? allImages[activeImageIndex]
    : (product ? product.imageUrl : null);

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (!hasMultipleImages) return;
    setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (!hasMultipleImages) return;
    setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for image switching and lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasMultipleImages) {
        if (e.key === 'ArrowLeft') {
          setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
        }
      }
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultipleImages, isLightboxOpen, allImages.length]);

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-serif text-2xl text-[#241F1C] mb-2">Product Not Found</h2>
          <p className="text-xs text-neutral-500 max-w-sm mb-6">
            The item you are looking for is not available or has been removed.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 bg-[#121212] text-white rounded-full text-xs uppercase tracking-wider font-medium"
          >
            Return to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isSoldOut = (product.stock !== undefined && Number(product.stock) <= 0) || product.inStock === false;
  const currentStock = product.stock !== undefined ? Number(product.stock) : (product.inStock === false ? 0 : 10);
  const wishlisted = isWishlisted ? isWishlisted(product.id) : false;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 22;

  // Other products for "You May Also Like"
  const otherProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isSoldOut) return;
    const itemToAdd = {
      ...product,
      ...(selectedSize ? { selectedSize } : {})
    };
    addToCart(itemToAdd, quantity);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    if (isSoldOut) return;
    const itemToAdd = {
      ...product,
      ...(selectedSize ? { selectedSize } : {})
    };
    addToCart(itemToAdd, quantity);
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      if (showToast) showToast('Product link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppInquiry = () => {
    const sizePart = selectedSize ? `, Size/Variant: ${selectedSize}` : '';
    const text = encodeURIComponent(
      `Hello Zubaida Sarees, I am interested in: ${product.title} (₹${product.price.toLocaleString('en-IN')}${sizePart}). Could you share more details? Link: ${window.location.href}`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen flex flex-col justify-between animate-fadeIn">
      
      <div className="flex-1 pt-4 pb-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <ol className="flex items-center gap-1.5 text-xs text-[#71717A] flex-wrap">
          <li>
            <Link to="/" className="hover:text-[#121212] transition-colors">Home</Link>
          </li>
          <li className="text-[#C5A059]">/</li>
          <li>
            <Link to="/" className="hover:text-[#121212] transition-colors">Collections</Link>
          </li>
          <li className="text-[#C5A059]">/</li>
          <li className="text-[#121212] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.category || 'Kurtas'}
          </li>
          <li className="text-[#C5A059]">/</li>
          <li className="text-[#18181B] font-medium truncate max-w-[160px] sm:max-w-none">
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main Product Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 bg-[#FFFFFF] p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-[#DEC49E]/70 shadow-xs">
          
          {/* =========================================================
              LEFT COLUMN: PRODUCT GALLERY (md:col-span-6)
             ========================================================= */}
          <div className="md:col-span-6 flex flex-col space-y-3">
            
            {/* Featured Photo Display */}
            <div className="relative aspect-[4/4.8] w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#DEC49E]/80 group shadow-xs select-none">
              {currentImage ? (
                <img 
                  key={currentImage}
                  src={currentImage} 
                  alt={`${product.title} - View ${activeImageIndex + 1}`} 
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 cursor-zoom-in hover:scale-102"
                />
              ) : (
                <FashionPlaceholder 
                  type={product.placeholderKey || 'kurta'}
                  imageUrl={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover object-top"
                />
              )}

              {/* Bestseller Badge */}
              <span className="absolute top-3 left-3 bg-[#121212] text-[#FFFFFF] text-[9.5px] font-sans font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                <span className="text-[#F3D7AB] text-xs leading-none">✦</span>
                <span>{product.tag || 'BESTSELLER'}</span>
              </span>

              {/* Circular Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist && toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FFFFFF]/95 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-md border border-[#DEC49E]/60 cursor-pointer z-10"
                aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart 
                  className={`w-4 h-4 transition-colors ${
                    wishlisted 
                      ? 'fill-[#121212] text-[#121212]' 
                      : 'text-[#121212] stroke-[2]'
                  }`} 
                />
              </button>

              {/* Lightbox / Fullscreen Icon */}
              {currentImage && (
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="View fullscreen photo"
                  title="Click to view full photo"
                  className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-[#18181B]/70 hover:bg-[#18181B]/90 text-white backdrop-blur-xs transition-all shadow-md hover:scale-105 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}

              {/* Prev / Next Image Navigation (if multiple) */}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous photo"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#121212] backdrop-blur-xs shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 -ml-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next photo"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#121212] backdrop-blur-xs shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 -mr-0.5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip (Proper fixed dimensions, no blowing up) */}
            {hasMultipleImages && (
              <div className="pt-1">
                <div className="flex items-center justify-between text-[11px] text-[#71717A] font-medium px-0.5 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Available Photos ({allImages.length})</span>
                  </span>
                  <span className="text-[10px] text-[#71717A]/70">Tap thumbnail to view</span>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#FAF8F5] ${
                        activeImageIndex === idx
                          ? 'border-[#121212] ring-2 ring-[#121212]/25 shadow-md scale-102 opacity-100'
                          : 'border-[#DEC49E]/50 opacity-70 hover:opacity-100 hover:border-[#121212]'
                      }`}
                      title={`View photo ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} angle ${idx + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.2 bg-[#18181B]/70 text-white text-[9px] font-medium rounded-full">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* =========================================================
              RIGHT COLUMN: PRODUCT DETAILS & SPECIFICATIONS
             ========================================================= */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category, Title & Subtitle */}
              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#C5A059] block mb-1">
                  {product.category || 'Handcrafted Kurtas'}
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-[#18181B] font-medium leading-tight">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm text-[#71717A] font-serif italic mt-1">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Pricing Row with Clean Sans Lining Numerals */}
              <div className="pb-3 border-b border-[#E8E2D8]">
                <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-[#121212] tracking-tight tabular-nums">
                    ₹{(product.price || 0).toLocaleString('en-IN')}
                  </span>
                  {(product.originalPrice || hasDiscount) && (
                    <span className="font-sans text-sm sm:text-base text-neutral-400 line-through font-normal tabular-nums">
                      ₹{(product.originalPrice || Math.round(product.price * 1.25)).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-sans font-bold text-[#C5A059] bg-[#FCE7E6] px-2.5 py-0.5 rounded-full tabular-nums">
                    {discountPercent}% OFF
                  </span>
                </div>
                <p className="text-[11px] text-[#71717A] mt-1 font-sans">
                  Inclusive of all taxes • Handcrafted in Varanasi, Uttar Pradesh
                </p>
                {/* Stock Indicator */}
                {isSoldOut ? (
                  <span className="inline-block mt-2 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                    Sold Out / Out of Stock
                  </span>
                ) : currentStock <= 5 ? (
                  <span className="inline-block mt-2 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    Limited Loom Stock: Only {currentStock} piece{currentStock > 1 ? 's' : ''} left
                  </span>
                ) : (
                  <span className="inline-block mt-2 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    In Stock • Ready to Dispatch
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#18181B] uppercase tracking-wider block">
                  Description
                </span>
                <p className="text-sm text-[#71717A] leading-relaxed">
                  {product.description || 'Artisan handcrafted ensemble tailored with pure breathable textiles, intricate detailing, and timeless heritage charm.'}
                </p>
              </div>

              {/* Size Selector (Only shown if sizes are explicitly defined by admin) */}
              {availableSizes.length > 0 ? (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#18181B] uppercase tracking-wider">
                      Select Size / Variant
                    </span>
                    <span className="text-[11px] text-[#71717A] italic">
                      Artisan Cut
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {availableSizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 h-10 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#121212] text-[#FFFFFF] shadow-sm ring-2 ring-[#121212]/30'
                            : 'bg-[#FAF8F5] text-[#18181B] border border-[#DEC49E]/70 hover:border-[#121212]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="pt-1">
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DEC49E]/60 flex items-center justify-between text-xs text-[#71717A]">
                    <span className="font-medium text-[#18181B]">Authentic Banarasi Cut</span>
                    <span className="text-[11px]">5.5m Handloom Saree + 0.8m Blouse Piece</span>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="pt-1">
                <span className="text-xs font-semibold text-[#18181B] uppercase tracking-wider block mb-1.5">
                  Quantity
                </span>
                <div className="inline-flex items-center bg-[#FAF8F5] border border-[#DEC49E]/80 rounded-full p-1">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-semibold text-[#18181B] select-none tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B] hover:bg-white cursor-pointer transition-colors"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Instant Checkout */}
              <div className="space-y-2.5 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Add to Bag */}
                  <button
                    type="button"
                    disabled={isSoldOut}
                    onClick={handleAddToCart}
                    className="py-3.5 px-4 bg-white hover:bg-[#FAF8F5] text-[#121212] border border-[#121212] rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#121212]" />
                    <span>{isSoldOut ? 'Sold Out' : 'Add to Bag'}</span>
                  </button>

                  {/* Checkout */}
                  <button
                    type="button"
                    disabled={isSoldOut}
                    onClick={handleCheckout}
                    className="py-3.5 px-4 bg-[#121212] hover:bg-[#0A0A0A] text-[#FFFFFF] rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#121212]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{isSoldOut ? 'Unavailable' : 'Buy Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* WhatsApp Concierge Assistance */}
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2.5 px-4 bg-[#FAF8F5] hover:bg-[#F3EBE1] text-[#18181B] border border-[#DEC49E]/70 rounded-full text-xs font-sans font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#121212]" />
                  <span>Have questions on sizing or styling? Chat on WhatsApp</span>
                </button>
              </div>

              {/* Heritage Trust Marks */}
              <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-2 gap-3 text-xs text-[#71717A]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>100% Handcrafted Artisanal Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Pan-India Studio Express Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Direct from Varanasi Master Weavers</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-[#121212] hover:underline"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied Link!' : 'Share Product'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            YOU MAY ALSO LIKE: Royal Heritage Product Grid
           ========================================================= */}
        {otherProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#DEC49E]/60">
            <div className="mb-6 text-center">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
                CURATED COMPANIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#18181B] font-medium">
                You May Also Like
              </h3>
              <p className="text-xs text-[#71717A] font-serif italic mt-0.5">
                Explore more handcrafted timeless pieces from our collection
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6">
              {otherProducts.map((item) => {
                const itemHasDiscount = item.originalPrice && item.originalPrice > item.price;
                const itemDiscount = itemHasDiscount 
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
                  : 22;

                return (
                  <article
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group flex flex-col bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#DEC49E]/80 shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer select-none relative"
                  >
                    <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#FAF8F5]">
                      <FashionPlaceholder 
                        imageUrl={item.imageUrl || (item.images && item.images[0]) || ''}
                        alt={item.title}
                        type="ethnic_featured"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-[#121212] text-[#FFFFFF] text-[8.5px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md">
                        ✦ {item.tag || 'BESTSELLER'}
                      </span>
                    </div>

                    <div className="-mt-3.5 relative z-10 flex flex-col flex-1">
                      <div className="relative w-full overflow-hidden -mb-[1px]">
                        <svg viewBox="0 0 400 32" className="w-full h-3.5 block text-[#FFFFFF]" preserveAspectRatio="none">
                          <path d="M0 32 C60 32 120 14 175 14 C188 14 194 6 200 6 C206 6 212 14 225 14 C280 14 340 32 400 32 V32 H0 Z" fill="currentColor" />
                          <path d="M0 32 C60 32 120 14 175 14 C188 14 194 6 200 6 C206 6 212 14 225 14 C280 14 340 32 400 32" fill="none" stroke="#DEC49E" strokeWidth="1.2" />
                        </svg>
                      </div>

                      <div className="bg-[#FFFFFF] px-3 pt-0.5 pb-2.5 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[8.5px] font-sans font-bold tracking-[0.18em] text-[#C5A059] uppercase block">
                            {item.category || 'BANARASI SAREES'}
                          </span>
                          <h4 className="font-serif text-[13px] font-medium text-[#18181B] group-hover:text-[#121212] transition-colors truncate mt-0.5 leading-tight">
                            {item.title}
                          </h4>
                        </div>

                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="font-sans font-bold text-[15px] text-[#121212] tabular-nums">
                            ₹{(item.price || 0).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[8.5px] font-sans font-bold text-[#C5A059] bg-[#FCE7E6] px-1.5 py-0.2 rounded-full tabular-nums">
                            {itemDiscount}% OFF
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

      </div>
      </div>

      {/* Brand Footer */}
      <Footer />

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isLightboxOpen && currentImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Header Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white/90 pt-2 pb-3 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-serif font-medium text-white">
                {product.title}
              </span>
              {hasMultipleImages && (
                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-xs rounded-full text-xs font-medium text-white">
                  {activeImageIndex + 1} of {allImages.length}
                </span>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close full view (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container with Previous & Next Navigation */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden my-auto select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {hasMultipleImages && (
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 -ml-0.5" />
              </button>
            )}

            <img
              src={currentImage}
              alt={`${product.title} photo ${activeImageIndex + 1}`}
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl transition-all"
            />

            {hasMultipleImages && (
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-6 h-6 -mr-0.5" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip inside Lightbox */}
          {hasMultipleImages && (
            <div 
              className="flex items-center gap-2.5 pb-2 pt-2 overflow-x-auto max-w-full scrollbar-none select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-neutral-900 ${
                    activeImageIndex === idx
                      ? 'border-[#121212] scale-105 ring-2 ring-[#121212]/40 opacity-100'
                      : 'border-white/20 opacity-40 hover:opacity-90'
                  }`}
                  title={`View photo ${idx + 1}`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
