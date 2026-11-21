import React from 'react';
import { FloralDivider } from './FloralDecorations';

// Star Rating Component (5 Gold Stars)
const StarRating = () => (
  <div className="flex items-center gap-1 text-[#C5A059]" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className="w-3.5 h-3.5 fill-current" 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Individual Regal Review Card
const ReviewCard = ({ review }) => {
  const initials = review.name
    ? review.name.split(' ').map(n => n[0]).join('').slice(0, 2)
    : 'ZS';

  return (
    <div className="relative w-[320px] sm:w-[370px] shrink-0 bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#DEC49E]/80 shadow-[0_4px_20px_-4px_rgba(18,18,18,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(18,18,18,0.15)] hover:border-[#121212]/50 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between cursor-default group/card hover:-translate-y-1 select-none overflow-hidden">
      
      {/* Delicate Corner Floral Line Art (Top Right) */}
      <svg 
        viewBox="0 0 70 70" 
        className="absolute -top-1 -right-1 w-12 h-12 text-[#DEC49E] opacity-35 pointer-events-none transform rotate-90" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.8"
      >
        <path d="M5 65 Q15 40 40 40 Q65 40 65 65" />
        <path d="M20 65 Q25 48 45 48 Q60 48 55 65" />
        <circle cx="40" cy="40" r="2.5" fill="#DEC49E" opacity="0.6" />
      </svg>

      {/* Top Row: Stars + Verified Badge */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <StarRating />
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#C5A059] bg-[#FAF5EC] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#DEC49E]/50">
          <span className="text-[#C5A059] text-[10px]">✓</span>
          <span>Verified Patron</span>
        </span>
      </div>

      {/* Review Quote */}
      <div className="relative z-10 mb-4">
        <p className="font-serif italic text-sm sm:text-[15px] text-[#18181B] leading-relaxed">
          "{review.text}"
        </p>
      </div>

      {/* Decorative Gold Hairline with Diamond */}
      <div className="relative flex items-center justify-center my-1 select-none">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#DEC49E]/70 to-transparent" />
        <span className="absolute bg-[#FFFFFF] px-2 text-[#C5A059] text-[9px]">✦</span>
      </div>

      {/* Patron Info & Product Tag */}
      <div className="flex items-center justify-between pt-2 relative z-10">
        <div className="flex items-center gap-2.5">
          {/* Monogram Crest */}
          <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#DEC49E] flex items-center justify-center font-serif text-xs font-bold text-[#121212] shadow-2xs">
            {initials}
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-[#18181B] leading-tight">
              {review.name}
            </h4>
            <span className="text-[10px] font-sans text-[#71717A] tracking-wide">
              {review.city}
            </span>
          </div>
        </div>

        {/* Piece Tag */}
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#121212] bg-[#FAF8F5] border border-[#DEC49E]/70 px-2.5 py-1 rounded-full whitespace-nowrap">
          {review.tag}
        </span>
      </div>

    </div>
  );
};

export const CustomerReviewsSection = () => {
  // Strip 1: Customer reviews (moving Left to Right)
  const strip1Reviews = [
    {
      id: 'rev_1',
      text: "The pure Katan silk Banarasi drape is sheer majesty! Real gold zari and breathtaking fall.",
      name: "Ananya Deshmukh",
      city: "Mumbai, India",
      tag: "Pure Katan Silk"
    },
    {
      id: 'rev_2',
      text: "Wore this bridal Banarasi for my wedding pheras. The Kadwa hand-weaving is poetry in silk.",
      name: "Rhea Sen",
      city: "Kolkata, India",
      tag: "Bridal Banarasi"
    },
    {
      id: 'rev_3',
      text: "Direct from Varanasi looms with certified silk purity. 60 years of master craftsmanship shows!",
      name: "Pooja Hegde",
      city: "Bengaluru, India",
      tag: "Rangkat Silk Saree"
    },
    {
      id: 'rev_4',
      text: "Flawless international delivery to California. Pristine silk packaging and authentic zari luster.",
      name: "Dr. Meenakshi Iyer",
      city: "San Jose, USA",
      tag: "Shikarghar Saree"
    },
    {
      id: 'rev_5',
      text: "The lightweight Kaddi Georgette Banarasi was effortless to carry for my daughter's reception.",
      name: "Sanya Malhotra",
      city: "New Delhi, India",
      tag: "Kaddi Georgette"
    },
    {
      id: 'rev_6',
      text: "Loom-direct pricing without retail markups. GST verified invoice and master weaver authenticity.",
      name: "Tanvi Kulkarni",
      city: "Varanasi, India",
      tag: "Zari Brocade"
    },
  ];

  // Strip 2: Customer reviews (moving Right to Left)
  const strip2Reviews = [
    {
      id: 'rev_7',
      text: "An heirloom saree I will proudly pass down to my daughter. The Meenakari motifs are divine.",
      name: "Radhika Sharma",
      city: "Lucknow, India",
      tag: "Meenakari Banarasi"
    },
    {
      id: 'rev_8',
      text: "Ordered via WhatsApp concierge directly with the loom studio. Impeccable service and guidance.",
      name: "Avantika Rao",
      city: "Hyderabad, India",
      tag: "Tissue Organza"
    },
    {
      id: 'rev_9',
      text: "The contrast rich pallu and heavy border drape so royally. The best Banarasi in my wardrobe.",
      name: "Kritika Joshi",
      city: "Ahmedabad, India",
      tag: "Jangla Silk Saree"
    },
    {
      id: 'rev_10',
      text: "True Varanasi heritage since 1965. No synthetic blends, only certified pure handloom silk.",
      name: "Sunita Bajaj",
      city: "Jaipur, India",
      tag: "Tanchoi Silk Saree"
    },
    {
      id: 'rev_11',
      text: "Shipped to Dubai in 4 days in a regal hard box with silk care instructions. Five stars!",
      name: "Bhavna Patel",
      city: "Dubai, UAE",
      tag: "Bridal Trousseau"
    },
    {
      id: 'rev_12',
      text: "You can feel the master artisan's heartbeat in every warp and weft. Zubaida Sarees is legendary.",
      name: "Gayatri Chitnis",
      city: "Varanasi, India",
      tag: "Handloom Brocade"
    },
  ];

  // Quadruple items so that marquee never exhibits gaps even on ultra-wide / 4K displays
  const duplicatedStrip1 = [
    ...strip1Reviews, 
    ...strip1Reviews, 
    ...strip1Reviews, 
    ...strip1Reviews
  ];
  const duplicatedStrip2 = [
    ...strip2Reviews, 
    ...strip2Reviews, 
    ...strip2Reviews, 
    ...strip2Reviews
  ];

  return (
    <section 
      id="reviews-section"
      aria-label="Customer Reviews" 
      className="py-14 sm:py-20 bg-[#FAF8F5] overflow-hidden relative select-none border-y border-[#DEC49E]/40"
    >
      {/* Subtle edge fade overlays for infinite smooth entrance/exit */}
      <div 
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto px-4 mb-8 sm:mb-10 text-center">
        {/* Section Heading & Subtitle using authentic brand FloralDivider */}
        <FloralDivider 
          title="Loved by Our Patrons"
          subtitle="PATRON STORIES • CHERISHED ACROSS INDIA & GLOBALLY"
          className="mb-2"
        />
        <p className="text-xs sm:text-sm font-serif italic text-[#71717A] max-w-md mx-auto mt-2">
          "Authentic Banarasi handloom sarees crafted directly on our Varanasi looms since 1965."
        </p>
      </div>

      {/* Dual Opposing Running Strips */}
      <div className="space-y-4 sm:space-y-6">
        
        {/* Strip 1: Left to Right */}
        <div className="relative overflow-hidden w-full">
          <div className="animate-marquee-ltr flex gap-4 sm:gap-6">
            {duplicatedStrip1.map((review, idx) => (
              <ReviewCard key={`strip1_${review.id}_${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Strip 2: Right to Left */}
        <div className="relative overflow-hidden w-full">
          <div className="animate-marquee-rtl flex gap-4 sm:gap-6">
            {duplicatedStrip2.map((review, idx) => (
              <ReviewCard key={`strip2_${review.id}_${idx}`} review={review} />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};