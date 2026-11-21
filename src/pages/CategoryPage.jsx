import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { TrustFeaturesSection } from '../components/TrustFeaturesSection';
import { PuneHeritageSection } from '../components/PuneHeritageSection';
import { Footer } from '../components/Footer';

export const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { 
    products, 
    categories, 
    activeCategory, 
    setActiveCategory, 
    addToCart, 
    wishlist = [], 
    toggleWishlist,
    setIsCartOpen 
  } = useStore();

  // Keep StoreContext activeCategory in sync with URL slug
  useEffect(() => {
    if (slug && activeCategory !== slug) {
      setActiveCategory(slug);
    }
    // Scroll to top on category change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find category metadata
  const currentCategory = useMemo(() => {
    if (!slug || slug === 'all') {
      return {
        id: 'all',
        slug: 'all',
        name: 'Complete Collection',
        subtitle: 'TIMELESS SILHOUETTES • THOUGHTFUL DETAILS'
      };
    }
    const found = categories.find(c => c.slug === slug || c.id === slug);
    if (found) return found;
    // Format slug into readable title if category not in list yet
    const fallbackName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      id: slug,
      slug,
      name: fallbackName,
      subtitle: 'HANDCRAFTED IN OUR PUNE STUDIO'
    };
  }, [categories, slug]);

  // Filter products matching this category
  const categoryProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!slug || slug === 'all') return products;

    const target = slug.toLowerCase().trim();
    return products.filter((p) => {
      if (!p) return false;
      const prodSlug = (p.categorySlug || '').toLowerCase().trim();
      const prodCat = (p.category || '').toLowerCase().trim();
      const prodCatIds = Array.isArray(p.categoryIds) 
        ? p.categoryIds.map(id => String(id).toLowerCase().trim())
        : [];

      return (
        prodSlug === target ||
        prodCat === target ||
        prodCat.includes(target) ||
        prodSlug.includes(target) ||
        prodCatIds.includes(target)
      );
    });
  }, [products, slug]);

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleWishlistClick = (e, productId) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen flex flex-col justify-between">
      
      {/* ========================================================
          CATEGORY PAGE HEADER & BREADCRUMBS
         ======================================================== */}
      <div className="bg-[#FAF8F5] border-b border-[#DEC49E]/50 relative overflow-hidden select-none">
        
        {/* Botanical Golden Flower Accents in corners */}
        <div className="absolute -top-1 -right-1 w-24 sm:w-36 md:w-48 pointer-events-none opacity-60 z-0">
          <img 
            src="/golden-floral-corner.png" 
            alt="" 
            className="w-full h-auto object-contain transform -scale-x-100" 
          />
        </div>
        <div className="absolute -top-1 -left-1 w-20 sm:w-28 md:w-40 pointer-events-none opacity-50 z-0">
          <img 
            src="/golden-floral-corner.png" 
            alt="" 
            className="w-full h-auto object-contain" 
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-7 sm:pb-9 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#C5A059] mb-4 sm:mb-6">
            <Link to="/" className="hover:text-[#121212] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5 inline sm:hidden" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-[#DEC49E]" />
            <Link to="/" className="hover:text-[#121212] transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3 h-3 text-[#DEC49E]" />
            <span className="font-semibold text-[#121212] truncate max-w-[150px] sm:max-w-none">
              {currentCategory.name}
            </span>
          </nav>

          {/* Centered Golden Lotus Crest & Title */}
          <div className="text-center flex flex-col items-center">
            <img 
              src="/golden-lotus-divider.png" 
              alt="" 
              className="w-full max-w-[200px] sm:max-w-[300px] h-auto object-contain mx-auto pointer-events-none mb-2 drop-shadow-2xs" 
            />

            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#18181B] font-medium tracking-tight leading-tight">
              {currentCategory.name}
            </h1>

            {/* Subtitle / Poetical Statement */}
            <p className="text-[10px] sm:text-xs md:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#121212] mt-2">
              {currentCategory.subtitle || 'TIMELESS SILHOUETTES • THOUGHTFUL DETAILS'}
            </p>

            {/* Piece Count Pill */}
            <div className="mt-3.5 inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#FFFFFF] border border-[#DEC49E] text-[11px] sm:text-xs font-serif text-[#262626] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>
                {categoryProducts.length} {categoryProducts.length === 1 ? 'Handcrafted Piece' : 'Handcrafted Pieces'}
              </span>
            </div>
          </div>

          {/* Quick Category Switcher Tabs */}
          {categories.length > 0 && (
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto py-1 scrollbar-none no-scrollbar">
              <button
                type="button"
                onClick={() => navigate('/category/all')}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer whitespace-nowrap ${
                  slug === 'all' || !slug
                    ? 'bg-[#121212] text-[#FFFFFF] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-white border border-[#DEC49E]'
                }`}
              >
                All Pieces
              </button>
              {categories.map((c) => {
                const isSelected = slug === c.slug;
                return (
                  <button
                    key={c.id || c.slug}
                    type="button"
                    onClick={() => navigate(`/category/${c.slug}`)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#121212] text-[#FFFFFF] shadow-xs'
                        : 'bg-[#FFFFFF] text-[#18181B] hover:bg-white border border-[#DEC49E]'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* ========================================================
          PRODUCTS GRID
         ======================================================== */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-12 flex-1 w-full">
        {categoryProducts.length === 0 ? (
          <div className="py-16 text-center bg-white/70 rounded-3xl border border-[#DEC49E] p-8 max-w-md mx-auto space-y-4 my-8 shadow-xs">
            <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto opacity-80" />
            <h3 className="font-serif text-xl text-[#18181B] font-medium">
              No pieces in {currentCategory.name} yet
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
              New artisanal pieces are crafted in limited studio batches. Browse our complete collection or other categories.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#121212] to-[#262626] hover:from-[#262626] hover:to-[#262626] text-[#FFFFFF] rounded-full text-xs font-serif tracking-wider uppercase font-semibold shadow-xs transition-all cursor-pointer"
              >
                Explore Complete Studio Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {categoryProducts.map((product) => {
              const wishlisted = wishlist.includes(product.id);
              const discountPercent = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 20;
              const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

              return (
                <article
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group relative flex flex-col rounded-t-[28px] sm:rounded-t-[40px] md:rounded-t-[48px] rounded-b-[16px] sm:rounded-b-[20px] bg-[#FFFFFF] border-[1.5px] border-[#DEC49E] hover:border-[#C5A059] transition-all duration-300 shadow-[0_4px_16px_-3px_rgba(92,6,28,0.06)] hover:shadow-[0_10px_28px_-4px_rgba(92,6,28,0.18)] hover:-translate-y-1 cursor-pointer overflow-hidden select-none"
                >
                  {/* Top Finial ✦ */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <span className="text-[#C5A059] text-[8px] sm:text-[9px] drop-shadow-xs leading-none">✦</span>
                  </div>

                  {/* Inner Inset Gold Hairline Border */}
                  <div className="absolute inset-0.5 sm:inset-1 rounded-t-[26px] sm:rounded-t-[37px] md:rounded-t-[45px] rounded-b-[14px] sm:rounded-b-[18px] border border-[#DEC49E]/70 pointer-events-none z-10" />

                  {/* Product Image Frame */}
                  <div className="relative w-full aspect-[3/3.8] overflow-hidden bg-[#FAF8F5]">
                    <img 
                      src={product.imageUrl || (product.images && product.images[0]) || '/category-kurtas.jpg'} 
                      alt={product.title || product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-106"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/25 via-transparent to-transparent opacity-20 group-hover:opacity-10 transition-opacity" />

                    {/* Tag Badge */}
                    {product.tag && (
                      <span className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#121212] shadow-xs z-10">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => handleWishlistClick(e, product.id)}
                      className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFFFF]/95 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 shadow-md border border-[#E8E2D8]/70 cursor-pointer z-10"
                      aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 transition-colors ${
                          wishlisted 
                            ? 'fill-[#121212] text-[#121212]' 
                            : 'text-[#121212] stroke-[2]'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Mughal Cusped Arch Bottom Panel */}
                  <div className="-mt-3.5 sm:-mt-4 relative z-10 flex flex-col flex-1">
                    <div className="relative w-full overflow-hidden -mb-[1px]">
                      <svg 
                        viewBox="0 0 400 32" 
                        className="w-full h-3.5 sm:h-4 block text-[#FFFFFF]" 
                        preserveAspectRatio="none"
                      >
                        <path 
                          d="M0 32 C60 32 120 14 175 14 C188 14 194 6 200 6 C206 6 212 14 225 14 C280 14 340 32 400 32 V32 H0 Z" 
                          fill="currentColor" 
                        />
                        <path 
                          d="M0 32 C60 32 120 14 175 14 C188 14 194 6 200 6 C206 6 212 14 225 14 C280 14 340 32 400 32" 
                          fill="none" 
                          stroke="#DEC49E" 
                          strokeWidth="1.2" 
                        />
                      </svg>
                      
                      {/* Centered Lotus Crest on Peak */}
                      <div className="absolute left-1/2 -top-1 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" fill="none" stroke="currentColor">
                          <path d="M12 4 C12 4 9.5 8.5 9.5 12.5 C9.5 15 10.7 16.5 12 16.5 C13.3 16.5 14.5 15 14.5 12.5 C14.5 8.5 12 4 12 4 Z" strokeWidth="1.2" fill="#FFFFFF" />
                          <path d="M9.5 12.5 C7.5 10 5 11 5 13.5 C5 16 7.5 16.5 9.5 16" strokeWidth="1.2" />
                          <path d="M14.5 12.5 C16.5 10 19 11 19 13.5 C19 16 16.5 16.5 14.5 16" strokeWidth="1.2" />
                        </svg>
                      </div>
                    </div>

                    {/* Cream Info Box */}
                    <div className="bg-[#FFFFFF] px-3 sm:px-3.5 pt-0.5 pb-2.5 sm:pb-3 flex flex-col flex-1 justify-between relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="text-[8.5px] sm:text-[9.5px] font-sans font-bold tracking-[0.18em] text-[#C5A059] uppercase block">
                          {product.category || currentCategory.name}
                        </span>
                        <h3 className="font-serif text-[13px] sm:text-[14px] font-medium text-[#18181B] group-hover:text-[#121212] transition-colors truncate mt-0.5 leading-tight">
                          {product.title}
                        </h3>
                      </div>

                      {/* Pricing Row */}
                      <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2 relative z-10 flex-wrap">
                        <span className="font-sans font-bold text-base sm:text-[17px] text-[#121212] tracking-tight tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {(product.originalPrice || hasDiscount) && (
                          <span className="font-sans text-[11px] sm:text-xs text-[#9E9E9E] line-through font-normal tabular-nums">
                            ₹{(product.originalPrice || Math.round(product.price * 1.25)).toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[8.5px] sm:text-[9px] font-sans font-bold text-[#C5A059] bg-[#FCE7E6] px-1.5 py-0.5 rounded-full tabular-nums">
                          {discountPercent}% OFF
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="mt-2 sm:mt-2.5 flex items-center gap-1.5 sm:gap-2 relative z-10">
                        <span className="h-[1px] flex-1 bg-[#DEC49E]/70" />
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="px-3 sm:px-4 py-1.5 bg-[#121212] hover:bg-[#262626] text-[#FFFFFF] rounded-full text-[9px] sm:text-[9.5px] font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-1 shadow-xs transition-all duration-200 transform active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>ADD TO CART</span>
                        </button>
                        <span className="h-[1px] flex-1 bg-[#DEC49E]/70" />
                      </div>

                    </div>

                  </div>

                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================
          BOTTOM HERITAGE & TRUST FEATURES & FOOTER
         ======================================================== */}
      <div>
        <TrustFeaturesSection />
        <PuneHeritageSection />
        <Footer />
      </div>

    </div>
  );
};
