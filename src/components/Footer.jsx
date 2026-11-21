import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Check, 
  Sparkles,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FloralOrnament, InstagramIcon } from './FloralDecorations';

export const Footer = () => {
  const navigate = useNavigate();
  const { 
    categories,
    storeConfig, 
    setActiveCategory, 
    setIsContactOpen, 
    setIsAboutOpen, 
    showToast 
  } = useStore();

  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const phone = storeConfig?.whatsappNumber || '+91 63925 31412';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const email = storeConfig?.supportEmail || 'contact@zubaidasarees.com';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Zubaida Sarees family ♡');
    setEmailInput('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      aria-label="Zubaida Sarees Footer"
      className="w-full relative select-none overflow-hidden"
    >
      {/* 
        Curvy Sea Waves Top Border:
        Dramatic, high rolling oceanic wave crests transitioning seamlessly from the section above into the terracotta footer
      */}
      <div className="w-full overflow-hidden leading-none pointer-events-none -mb-px">
        <svg 
          className="w-full h-16 sm:h-24 md:h-32 lg:h-40 block -mb-px" 
          viewBox="0 0 1440 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Sea Wave Layer 1: High rolling ocean swell */}
          <path 
            d="M0,45 C220,120 420,15 640,75 C860,135 1060,20 1260,80 C1360,110 1410,50 1440,65 L1440,180 L0,180 Z" 
            fill="#121212" 
            fillOpacity="0.25"
          />
          {/* Sea Wave Layer 2: Mid-crest with dramatic height */}
          <path 
            d="M0,85 C200,20 380,125 580,60 C780,10 960,110 1160,45 C1280,15 1380,85 1440,50 L1440,180 L0,180 Z" 
            fill="#121212" 
            fillOpacity="0.45"
          />
          {/* Sea Wave Layer 3: Main high rolling sea wave crest leading into solid footer body */}
          <path 
            d="M0,95 C150,25 300,135 480,75 C660,15 820,120 1000,60 C1180,10 1320,115 1440,55 L1440,180 L0,180 Z" 
            fill="#121212"
          />
        </svg>
      </div>

      {/* Footer Main Body with Terracotta (#121212) Background & Modern White Typography */}
      <div className="w-full bg-[#121212] text-white pt-5 sm:pt-7 pb-0 overflow-hidden">
        <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4">
          
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pb-5 border-b border-white/20">
            
            {/* Col 1: Brand Info & Story (5 cols) */}
            <div className="md:col-span-5 space-y-2.5">
              <div 
                onClick={() => {
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block cursor-pointer group"
              >
                <img 
                  src="/logo-white.png" 
                  onError={(e) => {
                    if (e.target.src !== window.location.origin + '/logo-transparent.png') {
                      e.target.src = '/logo-transparent.png';
                      e.target.classList.add('brightness-0', 'invert');
                    }
                  }}
                  alt="Zubaida Sarees" 
                  className="h-8 w-auto object-contain opacity-95 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <p className="font-serif italic text-sm text-white/90 leading-relaxed max-w-sm font-normal">
                "Manufacturing authentic Banarasi sarees since 1965. Dedicated to preserving centuries-old handloom artistry with pure silk, genuine zari, and direct-from-loom transparency."
              </p>

              <div className="space-y-1.5 pt-0.5 text-xs text-white/85 font-normal font-sans">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/80 shrink-0" />
                  <span>Varanasi, Uttar Pradesh, India • Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white/80 shrink-0" />
                  <a href={`mailto:${email}`} className="text-white/90 hover:text-white transition-colors">
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-white/80 shrink-0" />
                  <a 
                    href={`https://wa.me/${cleanPhone}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    +91 63925 31412 (WhatsApp Concierge)
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 pt-1">
                <a 
                  href="https://www.instagram.com/zubaida_sarees63/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#121212] flex items-center justify-center transition-all duration-300 shadow-xs border border-white/25"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={`https://wa.me/${cleanPhone}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#121212] flex items-center justify-center transition-all duration-300 shadow-xs border border-white/25"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 2: Shop Collections (2 cols) */}
            <div className="md:col-span-2 space-y-2">
              <h4 className="font-sans font-semibold text-xs uppercase tracking-[0.16em] text-white">
                Collections
              </h4>
              <ul className="space-y-1.5 text-xs font-serif font-normal text-white/80">
                <li>
                  <button onClick={() => handleCategoryClick('all')} className="hover:text-white transition-colors cursor-pointer text-left">
                    All Pieces
                  </button>
                </li>
                {Array.isArray(categories) && categories.map((cat) => (
                  <li key={cat.id || cat.slug}>
                    <button onClick={() => handleCategoryClick(cat.slug)} className="hover:text-white transition-colors cursor-pointer text-left">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: About & Care (2 cols) */}
            <div className="md:col-span-2 space-y-2">
              <h4 className="font-sans font-semibold text-xs uppercase tracking-[0.16em] text-white">
                About & Care
              </h4>
              <ul className="space-y-1.5 text-xs font-sans font-normal text-white/80">
                <li>
                  <button 
                    onClick={() => setIsAboutOpen(true)} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <a 
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Zubaida Sarees, I would like to get in touch with your Varanasi studio.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    Contact Studio
                  </a>
                </li>
                <li>
                  <button onClick={() => navigate('/order')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Track Order
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/admin')} className="text-white/70 hover:text-white transition-colors cursor-pointer text-left">
                    Admin Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Newsletter Signup (3 cols) */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="font-sans font-semibold text-xs uppercase tracking-[0.16em] text-white">
                The Zubaida Letter
              </h4>
              <p className="text-xs text-white/80 font-sans font-normal leading-relaxed">
                Receive gentle notes on new heirloom drops, textile stories, and private studio previews.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-1.5 pt-0.5">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-1.5 text-xs bg-white text-[#18181B] rounded-full placeholder:text-[#71717A]/70 focus:outline-none focus:ring-2 focus:ring-white shadow-xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-3 py-1 bg-[#121212] hover:bg-[#262626] text-white rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase transition-colors shadow-2xs cursor-pointer"
                    aria-label="Subscribe"
                  >
                    {isSubscribed ? <Check className="w-3.5 h-3.5" /> : 'Join'}
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Policies */}
          <div className="pt-3.5 pb-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-white/75 font-sans font-normal">
            <div className="flex items-center gap-1.5 text-center sm:text-left">
              <span>© 2026 Zubaida Sarees. Manufacturing Since 1965 • GST Verified • Worldwide Shipping</span>
              <FloralOrnament className="w-3 h-3 text-white/80 inline-block" />
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <button 
                onClick={() => showToast('Zubaida Sarees respects your privacy. Your data is encrypted.')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-white/40">•</span>
              <button 
                onClick={() => showToast('Terms of service available upon request via concierge.')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span className="text-white/40">•</span>
              <button 
                onClick={() => showToast('Pan-India delivery in 3-5 business days.')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Shipping Policy
              </button>
            </div>
          </div>

        </div>

        {/* 
          Artistically Beautiful Half-Logo Seal at Footer Bottom:
          Delicately scaled (w-44 to w-64), gracefully framed with subtle hairlines & floral motif,
          peeking as an exquisite luxury watermark seal out of the bottom edge.
        */}
        <div className="w-full overflow-hidden flex flex-col items-center justify-end pt-3 sm:pt-4 select-none leading-none pointer-events-none">
          
          {/* Subtle Heritage Hairline Flourish */}
          <div className="flex items-center justify-center gap-2.5 w-full max-w-[200px] sm:max-w-[260px] mx-auto mb-1 opacity-50">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-white/70" />
            <FloralOrnament className="w-2.5 h-2.5 text-white/80" />
            <span className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-white/70" />
          </div>

          {/* Half-Submerged Brandmark */}
          <div 
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-40 sm:w-52 md:w-60 overflow-hidden aspect-[2.65/1] flex items-start justify-center cursor-pointer pointer-events-auto group"
            title="Zubaida Sarees — Return to Top"
          >
            <img 
              src="/logo-white.png" 
              onError={(e) => {
                if (e.target.src !== window.location.origin + '/logo-transparent.png') {
                  e.target.src = '/logo-transparent.png';
                  e.target.classList.add('brightness-0', 'invert');
                }
              }}
              alt="Zubaida Sarees" 
              className="w-full h-auto object-cover object-top block opacity-60 group-hover:opacity-95 transition-all duration-500 transform group-hover:-translate-y-0.5"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};
