import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

// Intricate Golden Lotus Emblem
const LotusEmblem = ({ className = "w-6 h-6 text-[#C5A059]" }) => (
  <svg 
    viewBox="0 0 48 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path 
      d="M24 2C24 2 20 12 20 22C20 25.5 21.8 28 24 28C26.2 28 28 25.5 28 22C28 12 24 2 24 2Z" 
      stroke="currentColor" 
      strokeWidth="1.6" 
      fill="#FFFFFF" 
    />
    <path 
      d="M21 9C21 9 14 17 15 25C15.5 28 18 29.5 21 28.5C19 25 19 19 21 9Z" 
      stroke="currentColor" 
      strokeWidth="1.4" 
      fill="#FFFFFF" 
    />
    <path 
      d="M27 9C27 9 34 17 33 25C32.5 28 30 29.5 27 28.5C29 25 29 19 27 9Z" 
      stroke="currentColor" 
      strokeWidth="1.4" 
      fill="#FFFFFF" 
    />
    <path 
      d="M16 19C16 19 8 23 8 28C8 31 12 32 17 30C15 27 15.5 23 16 19Z" 
      stroke="currentColor" 
      strokeWidth="1.3" 
      fill="#FFFFFF" 
    />
    <path 
      d="M32 19C32 19 40 23 40 28C40 31 36 32 31 30C33 27 32.5 23 32 19Z" 
      stroke="currentColor" 
      strokeWidth="1.3" 
      fill="#FFFFFF" 
    />
    <path 
      d="M14 33C19 35 29 35 34 33" 
      stroke="currentColor" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
    />
  </svg>
);

// Category Card Component (Does NOT pick any default placeholder image)
const CategoryCard = ({ cat, isSelected, onClick }) => {
  const [imgFailed, setImgFailed] = React.useState(false);
  const catImg = (cat.imageUrl || cat.image || '').trim();
  const hasValidImage = Boolean(catImg) && !imgFailed;
  const subtitle = cat.subtitle || '';

  return (
    <div
      onClick={onClick}
      className="group flex flex-col cursor-pointer select-none relative"
    >
      {/* 
        Mughal Arched Card Frame:
        - Scaled compact arch curvature
        - Apex finial ✦
        - Outer gold rim + inner gold hairline
        - Overlapping cusped arch cream panel with lotus crest
      */}
      <div 
        className={`w-full relative flex flex-col bg-[#FFFFFF] rounded-t-[28px] sm:rounded-t-[50px] md:rounded-t-[70px] lg:rounded-t-[84px] rounded-b-[14px] sm:rounded-b-[20px] md:rounded-b-[26px] overflow-hidden border-[1.5px] sm:border-[2px] transition-all duration-400 shadow-[0_4px_16px_-3px_rgba(92,6,28,0.08)] sm:shadow-[0_8px_24px_-4px_rgba(92,6,28,0.12)] group-hover:shadow-[0_12px_32px_-4px_rgba(92,6,28,0.22)] group-hover:-translate-y-1 ${
          isSelected 
            ? 'border-[#121212] ring-2 ring-[#121212]/30' 
            : 'border-[#DEC49E] group-hover:border-[#C5A059]'
        }`}
      >
        
        {/* Top Apex Golden Diamond Star Finial */}
        <div className="absolute top-0.5 sm:top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <span className="text-[#C5A059] text-[7.5px] sm:text-[9px] md:text-[10px] drop-shadow-xs leading-none">
            ✦
          </span>
        </div>

        {/* Inner Inset Gold Hairline Border */}
        <div className="absolute inset-0.5 sm:inset-1 rounded-t-[25px] sm:rounded-t-[46px] md:rounded-t-[66px] lg:rounded-t-[80px] rounded-b-[12px] sm:rounded-b-[17px] md:rounded-b-[23px] border border-[#DEC49E]/70 pointer-events-none z-20" />

        {/* Compact Image Box (Bespoke art when no image provided - never default photo) */}
        <div className="relative w-full aspect-[4/3.8] sm:aspect-[4/3.9] overflow-hidden bg-[#FAF8F5]">
          {hasValidImage ? (
            <>
              <img
                src={catImg}
                alt={cat.name}
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/25 via-transparent to-transparent opacity-25 group-hover:opacity-10 transition-opacity" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#E8E2D8] p-3 relative overflow-hidden group-hover:bg-[#FAF8F5] transition-colors">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border border-[#DEC49E]/70 flex items-center justify-center bg-[#FFFFFF]/85 shadow-2xs group-hover:scale-105 transition-transform duration-500">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 rounded-full border border-dashed border-[#C5A059]/40 flex items-center justify-center">
                  <LotusEmblem className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-[#C5A059]" />
                </div>
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-serif uppercase tracking-[0.2em] text-[#C5A059] mt-2 font-medium opacity-80">
                Zubaida Sarees
              </span>
            </div>
          )}
        </div>

        {/* Overlapping Mughal Cusped Bottom Panel */}
        <div className="-mt-2.5 sm:-mt-3.5 md:-mt-4 relative z-20 flex flex-col flex-1">
          
          {/* Cusped Arch Top Boundary */}
          <div className="relative w-full overflow-hidden -mb-[1px]">
            <svg 
              viewBox="0 0 400 36" 
              className="w-full h-2 sm:h-2.5 md:h-3.5 block text-[#FFFFFF]" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0 36 C60 36 120 15 175 15 C188 15 194 6 200 6 C206 6 212 15 225 15 C280 15 340 36 400 36 V36 H0 Z" 
                fill="currentColor" 
              />
              <path 
                d="M0 36 C60 36 120 15 175 15 C188 15 194 6 200 6 C206 6 212 15 225 15 C280 15 340 36 400 36" 
                fill="none" 
                stroke="#DEC49E" 
                strokeWidth="1.3" 
              />
            </svg>
            
            {/* Centered Golden Lotus Crest */}
            <div className="absolute left-1/2 -top-0.5 sm:-top-1 -translate-x-1/2 flex items-center justify-center z-30 pointer-events-none">
              <svg viewBox="0 0 24 24" className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#C5A059]" fill="none" stroke="currentColor">
                <path d="M12 4 C12 4 9.5 8.5 9.5 12.5 C9.5 15 10.7 16.5 12 16.5 C13.3 16.5 14.5 15 14.5 12.5 C14.5 8.5 12 4 12 4 Z" strokeWidth="1.2" fill="#FFFFFF" />
                <path d="M9.5 12.5 C7.5 10 5 11 5 13.5 C5 16 7.5 16.5 9.5 16" strokeWidth="1.2" />
                <path d="M14.5 12.5 C16.5 10 19 11 19 13.5 C19 16 16.5 16.5 14.5 16" strokeWidth="1.2" />
              </svg>
            </div>
          </div>

          {/* Cream Info Card Box */}
          <div className="bg-[#FFFFFF] px-1 sm:px-2 md:px-3 pt-0 pb-1.5 sm:pb-2.5 md:pb-3 flex flex-col items-center justify-between text-center flex-1">
            
            <div className="w-full">
              {/* Category Title */}
              <h3 className="font-serif text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-[#18181B] group-hover:text-[#121212] transition-colors leading-tight truncate">
                {cat.name}
              </h3>

              {/* Subtitle / Poetical Description (High-contrast and readable) */}
              <p className="font-serif italic text-[8px] sm:text-[10px] md:text-[11.5px] text-[#18181B] font-semibold mt-0.5 leading-tight line-clamp-1">
                {subtitle}
              </p>
            </div>

            {/* Circular Wine Arrow Button */}
            <div className="mt-1 sm:mt-1.5 md:mt-2 flex items-center justify-center">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-[#121212] group-hover:bg-[#262626] text-[#FFFFFF] flex items-center justify-center shadow-2xs transition-all duration-300 transform group-hover:scale-110 active:scale-90">
                <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[2.5]" />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export const ShopByCategory = ({ onSelectCategory }) => {
  const { categories, activeCategory, setActiveCategory } = useStore();
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    navigate(`/category/${slug}`);
  };

  // Only display categories configured from the admin panel (top-level categories if nested)
  const allCategories = Array.isArray(categories) ? categories : [];
  const parentCategories = allCategories.filter(c => !c.parentId);
  const displayCategories = parentCategories.length > 0 ? parentCategories : allCategories;

  // If no categories are configured in the admin panel, do not render hardcoded fallbacks
  if (displayCategories.length === 0) {
    return null;
  }

  // Dynamic grid column class based on number of configured categories
  const getGridColsClass = (count) => {
    if (count === 1) return 'grid grid-cols-1 max-w-xs mx-auto';
    if (count === 2) return 'grid grid-cols-2 max-w-lg mx-auto gap-3 sm:gap-5';
    if (count === 3) return 'grid grid-cols-3 max-w-3xl mx-auto gap-2.5 sm:gap-4';
    if (count === 4) return 'grid grid-cols-4 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5';
    return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3.5 md:gap-4 lg:gap-5';
  };

  return (
    <section 
      id="category-section" 
      aria-label="Shop by Category"
      className="py-6 sm:py-8 lg:py-10 bg-[#FAF8F5] relative overflow-hidden transition-all select-none border-b border-[#DEC49E]/40"
    >
      
      {/* ========================================================
          BACKGROUND FLOURISHES (Golden Floral Engraved Corners)
         ======================================================== */}
      
      {/* TOP-RIGHT CORNER: Botanical Golden Flower from user mockup */}
      <div className="absolute -top-1 -right-1 w-28 sm:w-40 md:w-52 h-auto pointer-events-none select-none z-0 opacity-80">
        <img 
          src="/golden-floral-corner.png" 
          alt="" 
          className="w-full h-auto object-contain transform -scale-x-100" 
        />
      </div>

      {/* TOP-LEFT CORNER: Botanical Golden Flower */}
      <div className="absolute -top-1 -left-1 w-24 sm:w-32 md:w-44 h-auto pointer-events-none select-none z-0 opacity-65">
        <img 
          src="/golden-floral-corner.png" 
          alt="" 
          className="w-full h-auto object-contain" 
        />
      </div>

      {/* ========================================================
          MAIN CONTENT CONTAINER
         ======================================================== */}
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-7 flex flex-col items-center select-none">
          {/* Top Golden Lotus & Horizontal Lines Artwork */}
          <img 
            src="/golden-lotus-divider.png" 
            alt="" 
            className="w-full max-w-[220px] sm:max-w-[320px] md:max-w-[420px] h-auto object-contain mx-auto pointer-events-none mb-1.5 sm:mb-2 drop-shadow-2xs" 
          />

          {/* Heading with Elegant Gold Dots & Hairlines */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="w-5 sm:w-10 md:w-14 h-px bg-[#C5A059]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#18181B] font-medium tracking-tight leading-none px-1">
              Shop by Category
            </h2>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="w-5 sm:w-10 md:w-14 h-px bg-[#C5A059]" />
            </div>
          </div>

          {/* Subtitle Under Shop by Category (High Contrast & Crisply Visible) */}
          <p className="text-[10px] sm:text-xs md:text-[12.5px] font-sans font-extrabold uppercase tracking-[0.24em] text-[#121212] mt-2 sm:mt-2.5">
            TIMELESS SILHOUETTES • THOUGHTFUL DETAILS
          </p>
        </div>

        {/* ================= ADMIN-CONFIGURED MUGHAL ARCH CATEGORY CARDS ================= */}
        <div className={`${getGridColsClass(displayCategories.length)} items-stretch`}>
          {displayCategories.map((cat) => (
            <CategoryCard
              key={cat.id || cat.slug}
              cat={cat}
              isSelected={activeCategory === cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
            />
          ))}
        </div>

        {/* ================= BOTTOM ACTION: EXPLORE ALL CATEGORIES ================= */}
        <div className="mt-5 sm:mt-7 lg:mt-8 flex items-center justify-center gap-2 sm:gap-4">
          {/* Left Hairline with Diamond */}
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <span className="h-px w-8 sm:w-16 bg-[#DEC49E]" />
            <span className="text-[#C5A059] text-[10px]">✦</span>
          </div>

          {/* Centered Explore Pill Button */}
          <button
            type="button"
            onClick={() => handleCategoryClick('all')}
            className="px-5 sm:px-7 py-2 sm:py-2.5 bg-gradient-to-r from-[#121212] via-[#262626] to-[#121212] hover:from-[#262626] hover:to-[#262626] text-[#FFFFFF] rounded-full border border-[#DEC49E] shadow-xs hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <LotusEmblem className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F3D7AB]" />
            <span className="font-serif text-xs sm:text-sm font-medium tracking-wide">
              Explore All Categories
            </span>
            <span className="text-[#F3D7AB] text-xs">→</span>
          </button>

          {/* Right Hairline with Diamond */}
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <span className="text-[#C5A059] text-[10px]">✦</span>
            <span className="h-px w-8 sm:w-16 bg-[#DEC49E]" />
          </div>
        </div>

      </div>

    </section>
  );
};
