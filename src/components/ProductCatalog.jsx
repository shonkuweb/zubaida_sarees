import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FloralDivider } from './FloralDecorations';
import { FashionPlaceholder } from './Placeholders';

export const ProductCatalog = () => {
  const navigate = useNavigate();
  const { 
    products, 
    categories, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    addToCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen 
  } = useStore();

  // Filter products dynamically by category and search
  const filteredProducts = products.filter((product) => {
    if (!product) return false;
    const title = product.title || product.name || '';
    const desc = product.description || '';
    const cat = (product.categorySlug || product.category || '').toLowerCase();

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchTitle = title.toLowerCase().includes(q);
      const matchDesc = desc.toLowerCase().includes(q);
      const matchCat = cat.includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    if (activeCategory === 'all') return true;
    const target = activeCategory.toLowerCase();
    return cat === target || cat.includes(target);
  });

  const handleOpenProductPage = (product) => {
    navigate(`/product/${product.id}`);
  };

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
    <section 
      id="catalog-section" 
      aria-label="New & Noteworthy Collection" 
      className="py-10 sm:py-16 bg-[#FAF8F5]"
    >
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4">
        
        {/* Section Heading with floral divider */}
        <div className="mb-6 sm:mb-10">
          <FloralDivider 
            title="Featured Banarasi Sarees" 
            subtitle="FRESH FROM OUR VARANASI LOOMS • MASTER WEAVERS SINCE 1965"
          />
        </div>

        {/* 
          Mobile Product Grid:
          - Two products per row on mobile (grid-cols-2)
          - Consistent portrait image ratio (aspect-[3/4])
          - Rounded image corners (rounded-2xl)
          - Wishlist heart icon
          - Product name
          - Price in INR, sale price and original price
          - Product detail navigation
        */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white/70 rounded-3xl border border-[#E8E2D8] p-8 max-w-md mx-auto space-y-3">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto opacity-80" />
            <h3 className="font-serif text-lg text-[#18181B] font-medium">
              No pieces match this filter
            </h3>
            <p className="text-xs text-[#71717A]">
              Try choosing another collection or view all handcrafted pieces.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-2 px-5 py-2 bg-[#121212] text-white rounded-full text-xs uppercase tracking-wider font-medium hover:bg-[#262626] transition-colors"
            >
              View Complete Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => {
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discountPercent = hasDiscount 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 22;
              const wishlisted = isWishlisted(product.id);

              return (
                <article
                  key={product.id}
                  onClick={() => handleOpenProductPage(product)}
                  className="group flex flex-col bg-[#FAF8F5] rounded-2xl sm:rounded-[22px] overflow-hidden border border-[#DEC49E]/80 shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer select-none relative"
                >
                  {/* Compact Portrait Product Image Card */}
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#FAF8F5]">
                    <FashionPlaceholder
                      imageUrl={product.imageUrl || (product.images && product.images[0]) || ''}
                      alt={product.title}
                      type="ethnic_featured"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top-Left Bestseller / Tag Badge */}
                    <span className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 bg-[#121212] text-[#FFFFFF] text-[8.5px] sm:text-[9.5px] font-sans font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-10">
                      <span className="text-[#F3D7AB] text-[10px] leading-none">✦</span>
                      <span>{product.tag || 'BESTSELLER'}</span>
                    </span>

                    {/* Top-Right Circular Wishlist Button */}
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

                  {/* Bottom Mughal Arch Info Panel Overlapping Image */}
                  <div className="-mt-3.5 sm:-mt-4 relative z-10 flex flex-col flex-1">
                    {/* Curved Arch Line with Lotus Crest */}
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
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor">
                          <path d="M12 4 C12 4 9.5 8.5 9.5 12.5 C9.5 15 10.7 16.5 12 16.5 C13.3 16.5 14.5 15 14.5 12.5 C14.5 8.5 12 4 12 4 Z" strokeWidth="1.2" fill="#FFFFFF" />
                          <path d="M9.5 12.5 C7.5 10 5 11 5 13.5 C5 16 7.5 16.5 9.5 16" strokeWidth="1.2" />
                          <path d="M14.5 12.5 C16.5 10 19 11 19 13.5 C19 16 16.5 16.5 14.5 16" strokeWidth="1.2" />
                        </svg>
                      </div>
                    </div>

                    {/* Cream Info Box with Corner Floral Accents */}
                    <div className="bg-[#FFFFFF] px-3 sm:px-3.5 pt-0.5 pb-2.5 sm:pb-3 flex flex-col flex-1 justify-between relative overflow-hidden">
                      {/* Subtle Corner Floral Line Art (Left & Right) */}
                      <svg 
                        viewBox="0 0 70 70" 
                        className="absolute -bottom-1 -left-1 w-10 h-10 text-[#DEC49E] opacity-40 pointer-events-none" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="0.8"
                      >
                        <path d="M5 65 Q15 40 40 40 Q65 40 65 65" />
                        <path d="M20 65 Q25 48 45 48 Q60 48 55 65" />
                        <circle cx="40" cy="40" r="2.5" fill="#DEC49E" opacity="0.6" />
                        <path d="M12 52 C15 45 22 43 28 47" />
                        <path d="M50 47 C56 43 62 45 65 52" />
                      </svg>

                      <svg 
                        viewBox="0 0 70 70" 
                        className="absolute -bottom-1 -right-1 w-10 h-10 text-[#DEC49E] opacity-40 pointer-events-none transform -scale-x-100" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="0.8"
                      >
                        <path d="M5 65 Q15 40 40 40 Q65 40 65 65" />
                        <path d="M20 65 Q25 48 45 48 Q60 48 55 65" />
                        <circle cx="40" cy="40" r="2.5" fill="#DEC49E" opacity="0.6" />
                        <path d="M12 52 C15 45 22 43 28 47" />
                        <path d="M50 47 C56 43 62 45 65 52" />
                      </svg>

                      {/* Category & Title */}
                      <div className="relative z-10">
                        <span className="text-[8.5px] sm:text-[9.5px] font-sans font-bold tracking-[0.18em] text-[#C5A059] uppercase block">
                          {product.category || 'KURTAS'}
                        </span>
                        <h3 className="font-serif text-[13px] sm:text-[14px] font-medium text-[#18181B] group-hover:text-[#121212] transition-colors truncate mt-0.5 leading-tight">
                          {product.title}
                        </h3>
                      </div>

                      {/* Pricing Row with Clean Modern Sans Lining Numerals */}
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

                      {/* Add to Cart Button flanked by thin decorative hairlines */}
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
    </section>
  );
};
