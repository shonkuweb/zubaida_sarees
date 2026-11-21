import React from 'react';

// Elegant floral ornament for title dividers and accents
export const FloralOrnament = ({ className = "w-4 h-4 text-[#121212]" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    {/* 8-Petal Delicate Indian Floral Motif */}
    <circle cx="12" cy="12" r="2.2" fill="#C5A059" />
    <path d="M12 2 C13.5 6 13.5 8 12 9.5 C10.5 8 10.5 6 12 2 Z" opacity="0.9" />
    <path d="M12 22 C13.5 18 13.5 16 12 14.5 C10.5 16 10.5 18 12 22 Z" opacity="0.9" />
    <path d="M2 12 C6 13.5 8 13.5 9.5 12 C8 10.5 6 10.5 2 12 Z" opacity="0.9" />
    <path d="M22 12 C18 13.5 16 13.5 14.5 12 C16 10.5 18 10.5 22 12 Z" opacity="0.9" />
    <path d="M4.93 4.93 C8.5 7 9.5 8.5 9.5 10 C8 9.5 6.5 8.5 4.93 4.93 Z" opacity="0.8" />
    <path d="M19.07 19.07 C15.5 17 14.5 15.5 14.5 14 C16 14.5 17.5 15.5 19.07 19.07 Z" opacity="0.8" />
    <path d="M19.07 4.93 C17 8.5 15.5 9.5 14 9.5 C14.5 8 15.5 6.5 19.07 4.93 Z" opacity="0.8" />
    <path d="M4.93 19.07 C7 15.5 8.5 14.5 10 14.5 C9.5 16 8.5 17.5 4.93 19.07 Z" opacity="0.8" />
  </svg>
);

// Section Header with thin terracotta lines and floral ornaments on both sides
export const FloralDivider = ({ 
  title, 
  subtitle,
  className = "mb-6 sm:mb-8" 
}) => (
  <div className={`text-center ${className}`}>
    <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto px-4">
      {/* Left Hairline & Flourish */}
      <div className="flex-1 flex items-center justify-end">
        <span className="h-[1px] w-full max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent via-[#121212]/50 to-[#121212]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] ml-1.5 shrink-0" />
      </div>

      <FloralOrnament className="w-4 h-4 text-[#121212] shrink-0 transform rotate-12" />

      {/* Title */}
      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#18181B] font-normal tracking-wide shrink-0">
        {title}
      </h2>

      <FloralOrnament className="w-4 h-4 text-[#121212] shrink-0 transform -rotate-12" />

      {/* Right Hairline & Flourish */}
      <div className="flex-1 flex items-center justify-start">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mr-1.5 shrink-0" />
        <span className="h-[1px] w-full max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent via-[#121212]/50 to-[#121212]" />
      </div>
    </div>

    {subtitle && (
      <p className="mt-1 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#71717A]">
        {subtitle}
      </p>
    )}
  </div>
);

// Bougainvillea Corner Flower Sprig
export const BougainvilleaSprig = ({ className = "w-28 h-28", mirrored = false }) => (
  <svg 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${mirrored ? 'scale-x-[-1]' : ''} pointer-events-none`}
    aria-hidden="true"
  >
    {/* Stems */}
    <path d="M5 115 Q35 85 60 55 Q85 30 115 15" stroke="#7A583A" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M40 80 Q65 65 75 70" stroke="#7A583A" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M70 45 Q90 35 100 45" stroke="#7A583A" strokeWidth="1.2" strokeLinecap="round" />

    {/* Leaves */}
    <path d="M25 90 C20 80 32 75 40 82 C38 90 30 95 25 90 Z" fill="#6B8057" />
    <path d="M52 68 C48 58 60 55 68 62 C65 70 58 74 52 68 Z" fill="#7E9666" />
    <path d="M78 40 C74 30 86 26 94 34 C90 42 84 45 78 40 Z" fill="#6B8057" />
    <path d="M98 22 C95 14 105 12 112 18 C110 25 104 27 98 22 Z" fill="#7E9666" />

    {/* Bougainvillea Flower 1 */}
    <g transform="translate(45, 75)">
      <path d="M0 0 C-8 -12 8 -16 10 -4 C11 8 -4 9 0 0 Z" fill="#C5A059" />
      <path d="M4 -2 C14 -8 19 6 8 11 C-1 14 -3 3 4 -2 Z" fill="#C53963" />
      <path d="M-2 4 C-12 10 -4 20 6 15 C11 9 3 0 -2 4 Z" fill="#EA698F" />
      <circle cx="4" cy="4" r="1.8" fill="#FFFFFF" />
    </g>

    {/* Bougainvillea Flower 2 */}
    <g transform="translate(85, 42)">
      <path d="M0 0 C-9 -14 9 -18 11 -5 C12 9 -5 10 0 0 Z" fill="#C5A059" />
      <path d="M5 -2 C16 -9 22 7 9 13 C-1 16 -3 4 5 -2 Z" fill="#EA698F" />
      <path d="M-2 4 C-14 11 -5 23 7 17 C13 10 4 0 -2 4 Z" fill="#C53963" />
      <circle cx="5" cy="4" r="2" fill="#FFFFFF" />
    </g>

    {/* Bougainvillea Flower 3 (Small Bud at tip) */}
    <g transform="translate(108, 18)">
      <path d="M0 0 C-6 -9 6 -12 8 -3 C9 6 -3 7 0 0 Z" fill="#C5A059" />
      <path d="M3 -2 C11 -6 15 4 6 9 C-1 11 -2 2 3 -2 Z" fill="#C53963" />
      <circle cx="3" cy="2" r="1.4" fill="#FFFFFF" />
    </g>
  </svg>
);

// Soft organic torn paper top/bottom divider
export const TornPaperEdge = ({ flip = false, className = "h-4 w-full text-[#FAF8F5]" }) => (
  <svg 
    viewBox="0 0 1200 24" 
    preserveAspectRatio="none" 
    className={`${className} ${flip ? 'scale-y-[-1]' : ''}`}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M0 0 C40 14 80 8 120 16 C160 22 200 12 240 18 C280 23 320 10 360 17 C400 24 440 9 480 15 C520 22 560 11 600 19 C640 24 680 8 720 16 C760 22 800 12 840 18 C880 24 920 10 960 17 C1000 23 1040 9 1080 15 C1120 21 1160 11 1200 18 V24 H0 Z" />
  </svg>
);

// Reusable Instagram SVG Icon
export const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// Mughal / Maharashtrian Cusped Arch Frame for Category Cards
export const MughalArchCard = ({ 
  children, 
  className = "",
  onClick = () => {}
}) => (
  <div 
    onClick={onClick}
    className={`group relative overflow-hidden bg-[#FFFFFF] rounded-t-[40px] rounded-b-xl border border-[#121212]/35 shadow-sm hover:shadow-editorial hover:border-[#121212] transition-all duration-500 cursor-pointer ${className}`}
  >
    {/* Inner cusped arch shape SVG border accent */}
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 p-1 sm:p-1.5 opacity-60 group-hover:opacity-90 transition-opacity" 
      viewBox="0 0 200 260" 
      preserveAspectRatio="none"
      fill="none"
    >
      <path 
        d="M 6 254 L 6 85 C 6 48 26 28 55 35 C 70 20 85 10 100 5 C 115 10 130 20 145 35 C 174 28 194 48 194 85 L 194 254 Z" 
        stroke="#C5A059" 
        strokeWidth="1" 
        strokeDasharray="3 3"
      />
    </svg>
    {children}
  </div>
);
