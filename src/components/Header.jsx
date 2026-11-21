import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  X, 
  User, 
  ShoppingBag, 
  Sparkles, 
  Phone, 
  FileText, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  Home,
  LayoutGrid,
  Info,
  Mail,
  Shirt,
  Gift
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FloralOrnament, InstagramIcon } from './FloralDecorations';

const InstagramOutlineIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WhatsAppOutlineIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

export const LotusIcon = ({ className = "w-6 h-6", color = "#C5A059" }) => (
  <svg 
    viewBox="0 0 48 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M24 2C24 2 20 12 20 22C20 25.5 21.8 28 24 28C26.2 28 28 25.5 28 22C28 12 24 2 24 2Z" 
      stroke={color} 
      strokeWidth="1.8" 
      fill="#FAF8F5" 
    />
    <path 
      d="M21 9C21 9 14 17 15 25C15.5 28 18 29.5 21 28.5C19 25 19 19 21 9Z" 
      stroke={color} 
      strokeWidth="1.6" 
      fill="#FAF8F5" 
    />
    <path 
      d="M27 9C27 9 34 17 33 25C32.5 28 30 29.5 27 28.5C29 25 29 19 27 9Z" 
      stroke={color} 
      strokeWidth="1.6" 
      fill="#FAF8F5" 
    />
    <path 
      d="M16 19C16 19 8 23 8 28C8 31 12 32 17 30C15 27 15.5 23 16 19Z" 
      stroke={color} 
      strokeWidth="1.4" 
      fill="#FAF8F5" 
    />
    <path 
      d="M32 19C32 19 40 23 40 28C40 31 36 32 31 30C33 27 32.5 23 32 19Z" 
      stroke={color} 
      strokeWidth="1.4" 
      fill="#FAF8F5" 
    />
    <path 
      d="M14 33C19 35 29 35 34 33" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
  </svg>
);

export const Header = () => {
  const navigate = useNavigate();
  const { 
    storeConfig, 
    categories,
    activeCategory,
    searchQuery, 
    setSearchQuery, 
    setActiveCategory, 
    setIsAdminOpen, 
    setIsContactOpen,
    setIsAboutOpen,
    wishlist,
    cartCount,
    cartSubtotal,
    setIsCartOpen
  } = useStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionExpanded, setIsCollectionExpanded] = useState(false);

  const scrollToStory = () => {
    setIsDrawerOpen(false);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('our-story-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const scrollToContact = () => {
    setIsDrawerOpen(false);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('pune-heritage-section') || document.getElementById('footer-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const phone = storeConfig?.whatsappNumber || '+91 63925 31412';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const handleCategoryNav = (slug) => {
    setActiveCategory(slug);
    setIsDrawerOpen(false);
    if (slug === 'all') {
      navigate('/category/all');
    } else {
      navigate(`/category/${slug}`);
    }
  };

  const scrollToSection = (id) => {
    setIsDrawerOpen(false);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* ========================================================
          SECTION 1: ANNOUNCEMENT BAR
          Narrow terracotta bar at the very top.
          Centered text: "A little tradition, a lot of love"
          Ivory italic typography and small decorative floral ornaments on both sides.
          Desktop enhancement: Side boutique notes
         ======================================================== */}
      {storeConfig?.offers?.showAnnouncement !== false && (
        <aside aria-label="Announcement" className="w-full bg-[#121212] text-[#FFFFFF] py-2 px-4 relative z-50 select-none shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
            
            {/* Desktop Left Note */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-sans font-medium text-[#FFFFFF]/90 tracking-wide">
              <Truck className="w-3.5 h-3.5 text-[#E8D3AA]" />
              <span>Worldwide & Pan-India Shipping</span>
            </div>

            {/* Centered Main Announcement */}
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3">
              <FloralOrnament className="w-3.5 h-3.5 text-[#E8D3AA] shrink-0 opacity-90" />
              <span className="font-serif italic font-normal tracking-wider text-xs sm:text-sm text-center">
                {storeConfig?.offers?.announcementMessage || storeConfig?.announcement || 'Manufacturing Since 1965 · Authentic Banarasi Sarees · GST Verified'}
              </span>
              <FloralOrnament className="w-3.5 h-3.5 text-[#E8D3AA] shrink-0 opacity-90" />
            </div>

            {/* Desktop Right Note */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-sans font-medium text-[#FFFFFF]/90 tracking-wide">
              <a 
                href={`https://wa.me/${cleanPhone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#E8D3AA] transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#E8D3AA]" />
                <span>Studio: {phone}</span>
              </a>
            </div>

          </div>
        </aside>
      )}

      {/* ========================================================
          SECTION 2: HEADER (Sticky)
          Warm ivory background.
          Layout: Logo on LEFT, Search bar in MIDDLE, Actions on RIGHT.
          No sub-navigation options under the navbar.
         ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all shadow-xs">
        
        {/* Main Header Row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Mobile Drawer Trigger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 -ml-1 text-[#18181B] hover:text-[#121212] hover:bg-[#FAF8F5] rounded-full transition-colors cursor-pointer lg:hidden"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>

            <div 
              onClick={() => {
                setActiveCategory('all');
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center cursor-pointer select-none group py-0.5"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('/');
              }}
              aria-label="Zubaida Sarees Home"
            >
              <img 
                src="/logo-transparent.png" 
                alt="Zubaida Sarees" 
                className="h-8 sm:h-10 lg:h-12 w-auto max-w-[130px] sm:max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Middle: Prominent Centered Search Bar */}
          <div className="flex-1 max-w-sm sm:max-w-md lg:max-w-xl mx-1 sm:mx-4 lg:mx-8 flex items-center justify-center">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#71717A] absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Banarasi sarees, Katan silk, bridal weaves..."
                className="w-full pl-8 sm:pl-10 pr-8 py-1.5 sm:py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-full text-xs sm:text-sm text-[#18181B] placeholder:text-[#71717A]/70 focus:outline-none focus:ring-1.5 focus:ring-[#121212] focus:bg-white focus:border-[#121212] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181B] p-1 cursor-pointer"
                  aria-label="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
            
            {/* Wishlist Link */}
            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 p-1.5 sm:p-2 text-[#18181B] hover:text-[#121212] hover:bg-[#FAF8F5] rounded-full transition-colors cursor-pointer text-xs font-sans"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <div className="relative">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="font-medium hidden xl:inline">Wishlist</span>
            </button>

            {/* Patron Account Portal */}
            <button
              onClick={() => navigate('/account')}
              className="p-1.5 sm:p-2 text-[#18181B] hover:text-[#121212] hover:bg-[#FAF8F5] rounded-full transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans"
              aria-label="Patron Account"
              title="My Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              <span className="font-medium hidden xl:inline">Account</span>
            </button>

            {/* Shopping Bag Icon with Quantity Badge & Subtotal Preview */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 lg:px-3 lg:py-1.5 text-[#18181B] hover:text-[#121212] hover:bg-[#FAF8F5] rounded-full transition-all cursor-pointer touch-manipulation flex items-center gap-2"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#121212] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs select-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-sans font-medium text-[#18181B]">
                Bag {cartCount > 0 && `(₹${cartSubtotal.toLocaleString('en-IN')})`}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Live Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-[#E8E2D8] bg-[#FFFFFF] px-4 py-3 shadow-inner animate-in fade-in slide-in-from-top-1 duration-200 lg:hidden">
            <div className="max-w-md mx-auto relative flex items-center">
              <Search className="w-4 h-4 text-[#71717A] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kurtas, sarees, co-ord sets..."
                autoFocus
                className="w-full pl-9 pr-9 py-2 bg-white border border-[#E8E2D8] rounded-full text-xs text-[#18181B] placeholder:text-[#71717A]/70 focus:outline-none focus:ring-1 focus:ring-[#121212] focus:border-[#121212]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-[#71717A] hover:text-[#18181B]"
                  aria-label="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER (Royal Boutique Aesthetic)
         ======================================================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-[#18181B]/60 backdrop-blur-xs transition-opacity duration-300"
          />

          <div className="absolute inset-y-0 left-0 max-w-[340px] w-full bg-[#FAF8F5] shadow-2xl flex flex-col border-r border-[#E8E2D8] h-full overflow-hidden">
            
            {/* Top Brand Header with Faint Floral Watermark (Sticky Locked Header) */}
            <div className="relative pt-5 pb-3.5 px-6 border-b border-[#E8E2D8] bg-[#FAF8F5] shrink-0 z-20">
              {/* Corner Watermark */}
              <img 
                src="/yellow-floral.png" 
                alt="" 
                className="absolute -top-6 -right-6 w-32 h-32 object-contain opacity-25 pointer-events-none filter saturate-75"
              />

              <div className="relative z-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center text-left cursor-pointer group py-1"
                  aria-label="Zubaida Sarees Home"
                >
                  <img 
                    src="/logo-transparent.png" 
                    alt="Zubaida Sarees" 
                    className="h-9 sm:h-10 w-auto max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </button>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-[#18181B] hover:text-[#121212] hover:bg-[#18181B]/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Drawer Body Items (Scrollable Container) */}
            <div className="px-6 py-5 flex-1 space-y-5 overflow-y-auto">
              
              {/* ================= SECTION 1: DISCOVER ================= */}
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#C5A059]">
                    DISCOVER
                  </span>
                  <div className="flex-1 h-px bg-[#E8E2D8]" />
                </div>

                <nav className="space-y-3.5">
                  {/* Home */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate('/');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-between group py-1 text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <Home className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        Home
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Shop */}
                  <button
                    onClick={() => handleCategoryNav('all')}
                    className="w-full flex items-center justify-between group py-1 text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <ShoppingBag className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        Shop
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Collection (Expandable) */}
                  <div>
                    <button
                      onClick={() => setIsCollectionExpanded(!isCollectionExpanded)}
                      className="w-full flex items-center justify-between group py-1 text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <LayoutGrid className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                        <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                          Collection
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-[#C5A059] transition-transform duration-200 ${isCollectionExpanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                    </button>

                    {/* Subcategories list */}
                    {isCollectionExpanded && (
                      <div className="mt-2 ml-8 pl-3 border-l border-[#C5A059]/30 space-y-2 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <button
                          onClick={() => handleCategoryNav('all')}
                          className="block text-left text-sm font-serif text-[#18181B] hover:underline"
                        >
                          All Collections
                        </button>
                        {Array.isArray(categories) && categories.map((cat) => (
                          <button
                            key={cat.id || cat.slug}
                            onClick={() => handleCategoryNav(cat.slug)}
                            className="block text-left text-sm font-serif text-[#71717A] hover:text-[#18181B] hover:underline"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* About us (Smooth scroll to Our Story without modal) */}
                  <button
                    onClick={scrollToStory}
                    className="w-full flex items-center justify-between group py-1 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <Info className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        About us
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Contact (Smooth scroll to Studio Contact without modal) */}
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-between group py-1 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <Mail className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        Contact
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </nav>
              </div>

              {/* Ornamental Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="w-full h-px bg-[#E8E2D8]" />
                <span className="absolute bg-[#FAF8F5] px-2 text-[#C5A059] text-[10px]">✦</span>
              </div>

              {/* ================= SECTION 2: MORE TO EXPLORE ================= */}
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#C5A059]">
                    MORE TO EXPLORE
                  </span>
                  <div className="flex-1 h-px bg-[#E8E2D8]" />
                </div>

                <nav className="space-y-3.5">
                  {/* Our Story (Smooth scroll without modal) */}
                  <button
                    onClick={scrollToStory}
                    className="w-full flex items-center justify-between group py-1 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <Sparkles className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        Our Story
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Style Guide */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      handleCategoryNav('all');
                    }}
                    className="w-full flex items-center justify-between group py-1 text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <Shirt className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        Style Guide
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Offers & More */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      handleCategoryNav('all');
                    }}
                    className="w-full flex items-center justify-between group py-1 text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <Gift className="w-5 h-5 text-[#18181B] stroke-[1.8] group-hover:scale-105 transition-transform" />
                      <span className="font-serif text-[17px] text-[#18181B] group-hover:text-[#18181B] transition-colors">
                        Offers & More
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </nav>
              </div>

              {/* Ornamental Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="w-full h-px bg-[#E8E2D8]" />
                <span className="absolute bg-[#FAF8F5] px-2 text-[#C5A059] text-[10px]">✦</span>
              </div>

              {/* Promo Card: Tradition meets Elegance */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F5] to-[#F5E2DA] p-4 border border-[#EACEC1] shadow-xs">
                {/* Haveli/Palace Silhouette Backdrop */}
                <div className="absolute right-0 bottom-0 w-36 h-28 opacity-20 pointer-events-none text-[#C5A059]">
                  <svg viewBox="0 0 160 120" fill="currentColor" className="w-full h-full">
                    <path d="M120,120 L120,60 C120,40 100,20 80,10 C60,20 40,40 40,60 L40,120 Z" opacity="0.3" />
                    <path d="M70,120 L70,80 C70,72 90,72 90,80 L90,120 Z" fill="#FFF" opacity="0.6" />
                    <path d="M140,120 L140,75 C140,60 130,45 115,40 C125,50 125,70 125,120 Z" opacity="0.4" />
                    <path d="M20,120 L20,75 C20,60 30,45 45,40 C35,50 35,70 35,120 Z" opacity="0.4" />
                    <circle cx="80" cy="10" r="3" />
                    <line x1="80" y1="2" x2="80" y2="10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                <div className="relative z-10 max-w-[70%]">
                  <p className="font-serif italic text-lg leading-tight text-[#18181B]">
                    Tradition<br />meets Elegance
                  </p>
                  <button 
                    onClick={() => handleCategoryNav('all')}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-[9.5px] font-sans font-bold uppercase tracking-[0.18em] text-[#C5A059] hover:text-[#121212] transition-colors"
                  >
                    <span>EXPLORE OUR COLLECTION</span>
                    <span className="text-xs">→</span>
                  </button>
                </div>
              </div>

              {/* Ornamental Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="w-full h-px bg-[#E8E2D8]" />
                <span className="absolute bg-[#FAF8F5] px-2 text-[#C5A059] text-[10px]">✦</span>
              </div>

              {/* Social Channels & Heritage Creed */}
              <div className="text-center pt-1 pb-2">
                <div className="flex items-center justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/zubaida_sarees63/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all shadow-xs"
                    aria-label="Instagram"
                  >
                    <InstagramOutlineIcon />
                  </a>
                  <a 
                    href={`https://wa.me/${cleanPhone}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all shadow-xs"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppOutlineIcon />
                  </a>
                </div>

                <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-[#18181B] font-semibold text-center mt-3">
                  WEAR THE HERITAGE
                </p>
              </div>

            </div>

            {/* Bottom Royal Burgundy Wave Banner */}
            <div className="relative w-full overflow-hidden shrink-0 mt-auto select-none">
              <svg 
                viewBox="0 0 340 70" 
                fill="none" 
                className="w-full h-16 block -mb-px" 
                preserveAspectRatio="none"
              >
                {/* Wave Arch with gold contour */}
                <path 
                  d="M0,40 C90,65 190,10 270,30 C300,38 325,48 340,50 L340,70 L0,70 Z" 
                  fill="#121212" 
                />
                <path 
                  d="M0,40 C90,65 190,10 270,30 C300,38 325,48 340,50" 
                  stroke="#C5A059" 
                  strokeWidth="1.5" 
                  fill="none" 
                  opacity="0.8"
                />
              </svg>
              <div className="bg-[#121212] h-6 w-full relative">
                {/* Gold floral line art watermark in corner */}
                <div className="absolute right-1 -top-6 w-16 h-16 opacity-30 pointer-events-none">
                  <img 
                    src="/yellow-floral.png" 
                    alt="" 
                    className="w-full h-full object-contain filter brightness-200" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
