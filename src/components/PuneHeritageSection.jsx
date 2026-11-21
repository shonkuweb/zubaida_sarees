import React from 'react';

export const PuneHeritageSection = () => {
  return (
    <section 
      id="varanasi-heritage-section"
      data-legacy-id="pune-heritage-section"
      aria-label="Varanasi Heritage Artwork"
      className="w-full bg-[#FAF8F5] overflow-hidden py-0 md:pt-8 md:pb-6 relative select-none"
    >
      <div className="w-full md:max-w-4xl lg:max-w-6xl mx-auto px-0 md:px-4">
        
        {/* Responsive Varanasi Heritage Artwork: Full-bleed edge-to-edge on mobile, elegantly framed on desktop */}
        <div className="w-full relative overflow-hidden bg-[#FAF8F5] rounded-none md:rounded-2xl border-0 md:border md:border-[#E8E2D8]/60 shadow-none md:shadow-xs p-0 md:p-3">
          <picture className="w-full block">
            <source media="(max-width: 767px)" srcSet="/varanasi-heritage.jpg" />
            <source media="(min-width: 768px)" srcSet="/varanasi-heritage.jpg" />
            <img 
              src="/varanasi-heritage.jpg"
              onError={(e) => {
                if (e.target.src !== window.location.origin + '/varanasi-heritage.png') {
                  e.target.src = '/varanasi-heritage.png';
                }
              }}
              alt="Watercolor artwork of the historic ghats and temples of Varanasi on the sacred Ganges river with sunrise, wooden boats, and pink lotuses. Rooted from Varanasi ♡"
              className="w-full h-auto block object-cover md:object-contain transition-transform duration-700 hover:scale-[1.01]"
              loading="lazy"
            />
          </picture>
        </div>

      </div>
    </section>
  );
};

export const VaranasiHeritageSection = PuneHeritageSection;
export default PuneHeritageSection;
