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

// Individual Regal Review Card (Elegant Rectangle with Soft Rounded Corners, No Oval)
const ReviewCard = ({ review }) => {
  // Extract initials for patron monogram
  const initials = review.name
    ? review.name.split(' ').map(n => n[0]).join('').slice(0, 2)
    : 'HT';

  return (
    <div className="relative w-[320px] sm:w-[370px] shrink-0 bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#DEC49E]/80 shadow-[0_4px_20px_-4px_rgba(56,32,23,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(92,6,28,0.15)] hover:border-[#121212]/50 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between cursor-default group/card hover:-translate-y-1 select-none overflow-hidden">
      
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
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#C5A059] bg-[#FCE7E6] px-2 py-0.5 rounded-full flex items-center gap-1">
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
              {review.city}, India
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
      text: "The Chanderi drape is sheer poetry! Subtle, majestic gold sheen.",
      name: "Ananya Deshmukh",
      city: "Pune",
      tag: "Chanderi Saree"
    },
    {
      id: 'rev_2',
      text: "Softest mulmul I have ever worn. Breathable, flattering fit.",
      name: "Rhea Sen",
      city: "Kolkata",
      tag: "Festive Kurta"
    },
    {
      id: 'rev_3',
      text: "Wore this for Diwali puja. Compliments simply didn't stop!",
      name: "Pooja Hegde",
      city: "Bangalore",
      tag: "Bandhani Silk"
    },
    {
      id: 'rev_4',
      text: "Bespoke tailoring, heirloom vibe & divine pure cotton comfort.",
      name: "Dr. Meenakshi Iyer",
      city: "Chennai",
      tag: "Zari Kaftan"
    },
    {
      id: 'rev_5',
      text: "The packaging with dried rose petals felt so thoughtful & luxe.",
      name: "Sanya Malhotra",
      city: "Mumbai",
      tag: "Handloom Edit"
    },
    {
      id: 'rev_6',
      text: "A true gem from Pune! Exceptional craftsmanship and finish.",
      name: "Tanvi Kulkarni",
      city: "Pune",
      tag: "Heirloom Weave"
    },
  ];

  // Strip 2: Customer reviews (moving Right to Left - vice versa)
  const strip2Reviews = [
    {
      id: 'rev_7',
      text: "Timeless silhouettes that bridge heirloom roots with modern grace.",
      name: "Radhika Sharma",
      city: "Delhi",
      tag: "Festive Edit"
    },
    {
      id: 'rev_8',
      text: "The Kashmiri yoke embroidery is delicate, neat, and stunning.",
      name: "Avantika Rao",
      city: "Hyderabad",
      tag: "Kashmiri Yoke"
    },
    {
      id: 'rev_9',
      text: "Felt so graceful at my best friend's sangeet. Gorgeous fall!",
      name: "Kritika Joshi",
      city: "Ahmedabad",
      tag: "Silk Co-ord"
    },
    {
      id: 'rev_10',
      text: "Quiet luxury that doesn't scream. Elegant in every single stitch.",
      name: "Sunita Bajaj",
      city: "Jaipur",
      tag: "Chanderi Kurta"
    },
    {
      id: 'rev_11',
      text: "Delivered in 3 days in pristine condition. Loved the handwritten note!",
      name: "Bhavna Patel",
      city: "Surat",
      tag: "Heritage Saree"
    },
    {
      id: 'rev_12',
      text: "You can truly feel the artisanal love and soul in every thread.",
      name: "Gayatri Chitnis",
      city: "Pune",
      tag: "Mulmul Set"
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
          subtitle="PATRON STORIES • CHERISHED ACROSS INDIA"
          className="mb-2"
        />
        <p className="text-xs sm:text-sm font-serif italic text-[#71717A] max-w-md mx-auto mt-2">
          "Heirloom textiles, thoughtful details, and heartfelt notes crafted with love."
        </p>
      </div>

      {/* Two Running Strips in Continuous Loop */}
      <div className="space-y-4 sm:space-y-6">
        
        {/* STRIP 1: Running Left to Right (LTR) */}
        <div className="w-full overflow-hidden marquee-track">
          <div className="animate-marquee-ltr gap-4 sm:gap-6 px-3">
            {duplicatedStrip1.map((review, index) => (
              <ReviewCard key={`s1-${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>

        {/* STRIP 2: Running Right to Left (RTL - Vice Versa) */}
        <div className="w-full overflow-hidden marquee-track">
          <div className="animate-marquee-rtl gap-4 sm:gap-6 px-3">
            {duplicatedStrip2.map((review, index) => (
              <ReviewCard key={`s2-${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
