import React from 'react';
import { ArrowRight, Sparkles, MapPin, Globe, ShieldCheck, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

// Intricate Golden Lotus Emblem
const LotusEmblem = ({ className = "w-5 h-5 text-[#C5A059]" }) => (
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

export const OurStorySection = () => {
  const { setIsAboutOpen } = useStore();

  return (
    <section 
      id="our-story-section"
      aria-label="Our Story" 
      className="relative w-full bg-[#FAF8F5] overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20 select-none border-b border-[#DEC49E]/40"
    >
      
      {/* Background Soft Grain & Texture Accent */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* ========================================================
            HERITAGE WEAVER VISUAL SHOWCASE
           ======================================================== */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] mx-auto mb-6 sm:mb-8">
          <div className="relative p-2.5 sm:p-3 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#DEC49E]/70 transform hover:scale-[1.01] transition-transform duration-500">
            <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden relative bg-[#121212]">
              <img 
                src="/category-sarees.jpg" 
                alt="Zubaida Sarees — Master Handloom Weavers Since 1965" 
                className="w-full h-full object-cover object-top filter brightness-[0.98]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                <span className="text-[10px] font-sans font-bold tracking-[0.22em] uppercase text-[#E8D3AA]">
                  ESTABLISHED 1965
                </span>
                <p className="font-serif text-lg sm:text-xl text-white font-medium">
                  Zubaida Sarees • Authentic Banarasi Looms
                </p>
              </div>
            </div>

            {/* Brass Corner Seal */}
            <div className="absolute -top-3 -right-3 bg-[#121212] text-[#C5A059] border border-[#C5A059] rounded-full px-3 py-1 text-[10px] font-sans font-bold tracking-wider shadow-md">
              SINCE 1965
            </div>
          </div>
        </div>

        {/* ========================================================
            ESTABLISHED BADGE
           ======================================================== */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#C5A059]/70 shadow-2xs mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#C5A059]">
            MANUFACTURING SINCE 1965 • GST VERIFIED
          </span>
        </div>

        {/* ========================================================
            SIX DECADES OF PURE BANARASI SILK HEADLINE
           ======================================================== */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#18181B] font-medium leading-tight">
          Six Decades of Pure
          <span className="block font-serif italic text-3xl sm:text-4xl lg:text-[44px] text-[#18181B] font-normal leading-tight mt-0.5">
            Banarasi Silk Heritage.
          </span>
        </h2>

        {/* ========================================================
            CENTERED GOLD LOTUS EMBLEM DIVIDER
           ======================================================== */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 my-3 sm:my-3.5">
          <span className="h-px w-8 sm:w-16 bg-[#DEC49E]" />
          <LotusEmblem className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059]" />
          <span className="h-px w-8 sm:w-16 bg-[#DEC49E]" />
        </div>

        {/* ========================================================
            HERITAGE HIGHLIGHTS BADGE ROW
           ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto my-5 text-left">
          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E8E2D8] flex items-center gap-2 shadow-2xs">
            <span className="text-base sm:text-lg">📍</span>
            <div>
              <p className="text-[10px] font-sans font-bold text-[#18181B] uppercase tracking-wider">Since 1965</p>
              <p className="text-[9px] text-[#71717A]">60 Years of Heritage</p>
            </div>
          </div>

          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E8E2D8] flex items-center gap-2 shadow-2xs">
            <span className="text-base sm:text-lg">🥻</span>
            <div>
              <p className="text-[10px] font-sans font-bold text-[#18181B] uppercase tracking-wider">Banarasi Sarees</p>
              <p className="text-[9px] text-[#71717A]">Pure Handloom Silks</p>
            </div>
          </div>

          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E8E2D8] flex items-center gap-2 shadow-2xs">
            <span className="text-base sm:text-lg">🌍</span>
            <div>
              <p className="text-[10px] font-sans font-bold text-[#18181B] uppercase tracking-wider">Worldwide</p>
              <p className="text-[9px] text-[#71717A]">Insured Global Shipping</p>
            </div>
          </div>

          <div className="bg-white/80 p-2.5 sm:p-3 rounded-xl border border-[#E8E2D8] flex items-center gap-2 shadow-2xs">
            <span className="text-base sm:text-lg">🛡️</span>
            <div>
              <p className="text-[10px] font-sans font-bold text-[#18181B] uppercase tracking-wider">GST Verified</p>
              <p className="text-[9px] text-[#71717A]">Trusted Manufacturer</p>
            </div>
          </div>
        </div>

        {/* ========================================================
            STORY NARRATIVE PARAGRAPH
           ======================================================== */}
        <p className="font-serif text-sm sm:text-base text-[#71717A] leading-relaxed max-w-2xl mx-auto px-4">
          Established in 1965, <strong className="text-[#18181B] font-semibold">Zubaida Sarees</strong> has stood as a bastion of authentic Banarasi weaving excellence for nearly six decades. From the historic weaving heartlands, our master artisans weave heirloom Katan silks, intricate zari brocades, and gossamer georgettes that drape life’s most celebrated milestones. As a certified GST-verified manufacturer shipping worldwide, we connect saree lovers across the globe directly with our looms—guaranteeing pure authenticity, generational devotion, and timeless royal grace.
        </p>

        {/* ========================================================
            CTA BUTTONS
           ======================================================== */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('catalog-section') || document.getElementById('category-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#121212] hover:bg-[#262626] text-[#FFFFFF] rounded-full text-xs font-sans font-bold uppercase tracking-[0.18em] shadow-lg shadow-[#121212]/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-[#C5A059]/40"
          >
            <span>EXPLORE BANARASI EDITS</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <a
            href="https://wa.me/916392531412?text=Hello%20Zubaida%20Sarees,%20I%20would%20like%20to%20learn%20more%20about%20your%20authentic%20Banarasi%20sarees."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#FAF8F5] text-[#18181B] border border-[#E8E2D8] hover:border-[#C5A059] rounded-full text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-xs transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WHATSAPP CONCIERGE: 63925 31412</span>
          </a>
        </div>

      </div>

    </section>
  );
};