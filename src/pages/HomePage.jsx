import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ShopByCategory } from '../components/ShopByCategory';
import { ProductCatalog } from '../components/ProductCatalog';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { TrustFeaturesSection } from '../components/TrustFeaturesSection';
import { PuneHeritageSection } from '../components/PuneHeritageSection';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div className="w-full bg-[#FAF8F5] overflow-x-hidden">
      {/* 
        SECTION 3: HERO BANNER
        Edge-to-edge on mobile, 16:9 banner with accessible CTA overlay,
        3 carousel dots, swipe support.
      */}
      <HeroSection />

      {/* 
        SECTION 4: SHOP BY CATEGORY
        Centered heading with floral divider, 4 arch-shaped image category cards:
        1. Kurtas, 2. Sarees, 3. Co-ord Sets, 4. Festive Edit
      */}
      <ShopByCategory />

      {/* 
        SECTION 5: NEW & NOTEWORTHY
        Centered heading with floral divider, 2-column mobile grid,
        wishlist heart, INR prices, dynamic products.
      */}
      <ProductCatalog />

      {/* 
        SECTION 7: CUSTOMER REVIEWS (OVAL STRIPS IN DUAL OPPOSING LOOPS)
        Centered heading with floral divider,
        Two infinite running strips with oval patron reviews.
      */}
      <CustomerReviewsSection />

      {/* 
        SECTION 8: TRUST FEATURES
        Minimalist 3-column mobile row: Pan-India Shipping, Secure Payments, Friendly Support.
      */}
      <TrustFeaturesSection />

      {/* 
        SECTION 9: VARANASI HERITAGE FOOTER ARTWORK
        Hand-drawn watercolor artwork of the historic ghats and temples of Varanasi,
        sacred Ganges river, sunrise, and pink lotuses, "Rooted from Varanasi ♡".
      */}
      <PuneHeritageSection />

      {/* 
        SECTION 10: FUNCTIONAL FOOTER
        Brand logo, collections, story, care links, socials, newsletter.
      */}
      <Footer />
    </div>
  );
};
