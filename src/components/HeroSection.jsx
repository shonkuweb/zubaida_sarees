import React, { useState, useRef, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroBannerImg from '../assets/hero-banner.jpg';

export const HeroSection = () => {
  const { storeConfig } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);

  // Dynamic Banners from Admin Panel (supports both hero and heroBanners schema)
  const desktopBanners = useMemo(() => {
    const list = storeConfig?.hero?.desktopBanners ?? storeConfig?.heroBanners?.desktop ?? [];
    return Array.isArray(list) ? list.filter(b => typeof b === 'string' && b.trim()) : [];
  }, [storeConfig]);

  const mobileBanners = useMemo(() => {
    const list = storeConfig?.hero?.mobileBanners ?? storeConfig?.heroBanners?.mobile ?? [];
    return Array.isArray(list) ? list.filter(b => typeof b === 'string' && b.trim()) : [];
  }, [storeConfig]);

  const hasCustomBanners = desktopBanners.length > 0 || mobileBanners.length > 0;
  const totalSlides = hasCustomBanners ? Math.max(desktopBanners.length, mobileBanners.length, 1) : 1;

  // Clamp activeSlide if banners were deleted
  useEffect(() => {
    if (activeSlide >= totalSlides) {
      setActiveSlide(0);
    }
  }, [totalSlides, activeSlide]);

  // Current Slide Image resolution
  const currentDesktopBanner = hasCustomBanners
    ? (desktopBanners[activeSlide] || desktopBanners[0] || mobileBanners[activeSlide] || mobileBanners[0])
    : heroBannerImg;

  const currentMobileBanner = hasCustomBanners
    ? (mobileBanners[activeSlide] || mobileBanners[0] || desktopBanners[activeSlide] || desktopBanners[0])
    : heroBannerImg;

  const handleScrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog-section') || document.getElementById('category-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || totalSlides <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    } else if (diff < -50) {
      // Swiped right
      setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    }
    touchStartX.current = null;
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (totalSlides <= 1) return;
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (totalSlides <= 1) return;
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section 
      aria-label="Hero Showcase" 
      className="w-full bg-[#FAF8F5] overflow-hidden pt-0"
    >
      {/* 
        Hero Banner: Edge-to-edge full width across mobile and desktop.
        Fits 100% of the screen width seamlessly, preserving the composition.
      */}
      <div 
        className="w-full relative select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#FAF8F5] cursor-pointer group">
          
          <picture className="w-full h-full block">
            {currentMobileBanner && currentMobileBanner !== currentDesktopBanner && (
              <source media="(max-width: 767px)" srcSet={currentMobileBanner} />
            )}
            <source media="(min-width: 768px)" srcSet={currentDesktopBanner} />
            <img 
              src={currentDesktopBanner}
              onError={(e) => {
                if (!hasCustomBanners && e.target.src !== window.location.origin + '/hero-banner.jpg') {
                  e.target.src = '/hero-banner.jpg';
                }
              }}
              alt="Zubaida Sarees — Manufacturing Since 1965. Master Weavers of Authentic Banarasi Sarees." 
              className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-[1.01]"
              loading="eager"
              fetchPriority="high"
            />
          </picture>

          {/* 
            Clickable overlay button aligned with Explore Collection
          */}
          <button
            onClick={handleScrollToCatalog}
            type="button"
            className="absolute left-[8.8%] top-[78.1%] w-[22.5%] h-[7.2%] rounded-md cursor-pointer opacity-0 focus:opacity-100 focus:outline-2 focus:outline-white focus:bg-white/20 transition-opacity z-10"
            aria-label="Explore Zubaida Sarees Collection"
            title="Explore Collection"
          />

          {/* Desktop Hover Navigation Arrows (Only shown when multiple slides exist) */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="hidden lg:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#18181B] items-center justify-center shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-90 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 z-20 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>

              <button
                onClick={handleNext}
                className="hidden lg:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#18181B] items-center justify-center shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-90 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-20 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              </button>
            </>
          )}

          {/* Full Banner Click Area Fallback */}
          <div 
            onClick={handleScrollToCatalog}
            className="absolute inset-0 cursor-pointer -z-0"
            role="presentation"
          />
        </div>

        {/* 
          Carousel indicators (Rendered dynamically based on number of slides)
        */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-2 py-3 sm:py-4 bg-[#FAF8F5]">
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'w-6 h-1.5 bg-[#121212] rounded-full shadow-xs' 
                      : 'w-1.5 h-1.5 bg-[#E8E2D8] hover:bg-[#121212]/50 rounded-full'
                  }`}
                  aria-label={`Go to banner slide ${idx + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
