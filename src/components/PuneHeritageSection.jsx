import React from 'react';

export const PuneHeritageSection = () => {
  return (
    <section 
      aria-label="Pune Heritage Artwork"
      className="w-full bg-[#FAF8F5] overflow-hidden py-0 md:pt-8 md:pb-6 relative select-none"
    >
      <div className="w-full md:max-w-4xl lg:max-w-6xl mx-auto px-0 md:px-4">
        
        {/* Responsive Shaniwar Wada Pune Heritage Artwork: Full-bleed edge-to-edge on mobile, elegantly framed on desktop */}
        <div className="w-full relative overflow-hidden bg-[#FAF8F5] rounded-none md:rounded-2xl border-0 md:border md:border-[#E8E2D8]/60 shadow-none md:shadow-xs p-0 md:p-3">
          <picture className="w-full block">
            {/* Mobile Artwork: covers 100% width and full height of the section */}
            <source media="(max-width: 767px)" srcSet="/pune-heritage-mobile.png" />
            {/* Desktop Artwork (To be updated later when desktop asset is provided) */}
            <source media="(min-width: 768px)" srcSet="/pune-heritage.svg" />
            <img 
              src="/pune-heritage-mobile.png"
              onError={(e) => {
                if (e.target.src !== window.location.origin + '/pune-heritage.png') {
                  e.target.src = '/pune-heritage.png';
                }
              }}
              alt="Hand-drawn architectural artwork of Shaniwar Wada in Pune, with surrounding hills, trees, Maratha saffron flag, and bougainvillea blossoms. Proudly rooted in Pune."
              className="w-full h-auto block object-cover md:object-contain transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </picture>
        </div>

      </div>
    </section>
  );
};
