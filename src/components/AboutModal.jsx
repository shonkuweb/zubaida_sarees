import React from 'react';
import { X, Sparkles, ArrowRight, MapPin, Globe, ShieldCheck, CheckCircle2, Phone, Instagram } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BougainvilleaSprig } from './FloralDecorations';

export const AboutModal = () => {
  const { isAboutOpen, setIsAboutOpen, setActiveCategory } = useStore();

  if (!isAboutOpen) return null;

  const handleShopNow = () => {
    setIsAboutOpen(false);
    setActiveCategory('all');
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#18181B]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] shadow-2xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#18181B] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          aria-label="Close story modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Decorative Corner Flowers */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <BougainvilleaSprig className="w-20 h-20 opacity-80" />
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Badge & Title */}
          <div className="text-center space-y-2 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#C5A059]/60 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#C5A059] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Manufacturing Since 1965 • GST Verified</span>
            </div>

            <h3 id="about-modal-title" className="font-serif text-2xl sm:text-3xl text-[#18181B] font-medium leading-tight">
              The Heritage of <span className="italic text-[#C5A059]">Zubaida Sarees</span>
            </h3>
            <p className="text-xs font-sans text-[#71717A] uppercase tracking-widest">
              Authentic Handcrafted Banarasi Looms
            </p>
          </div>

          {/* Core Trust Pillars Grid (from the shared brand specs) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8E2D8] shadow-2xs text-left">
            <div className="flex items-start gap-2.5">
              <span className="text-lg">📍</span>
              <div>
                <p className="font-sans text-xs font-bold text-[#18181B]">Since 1965</p>
                <p className="text-[10px] text-[#71717A] leading-tight">60 years of master loom manufacturing</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-lg">🥻</span>
              <div>
                <p className="font-sans text-xs font-bold text-[#18181B]">Banarasi Sarees</p>
                <p className="text-[10px] text-[#71717A] leading-tight">Katan silk, georgette & pure zari brocades</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-lg">🌍</span>
              <div>
                <p className="font-sans text-xs font-bold text-[#18181B]">Worldwide Shipping</p>
                <p className="text-[10px] text-[#71717A] leading-tight">Pan-India & international express delivery</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="font-sans text-xs font-bold text-[#18181B]">GST Verified</p>
                <p className="text-[10px] text-[#71717A] leading-tight">Direct manufacturer with certified purity</p>
              </div>
            </div>
          </div>

          {/* Professional Narrative */}
          <div className="space-y-3 font-serif text-xs sm:text-sm text-[#3F3F46] leading-relaxed text-justify sm:text-left">
            <p>
              For nearly six decades, <strong className="text-[#18181B]">Zubaida Sarees</strong> has stood at the confluence of sacred textile tradition and enduring royal grace. Founded in 1965 in the storied weaving heartlands, our family enterprise has nurtured three generations of master weavers dedicated exclusively to authentic Banarasi handlooms.
            </p>
            <p>
              Every saree in our collection is an ode to patience and artistry. From regal bridal Katan silks embellished with intricate Kadwa zari motifs, to feather-light organzas and breezy kaddi georgettes, each piece is spun from ethically sourced pure silk threads and woven on traditional pit looms.
            </p>
            <p>
              As a certified GST-verified manufacturing house, we eliminate middlemen and bring genuine loom-crafted heritage directly to your doorstep with insured worldwide delivery.
            </p>
          </div>

          {/* Verified Contact Details Strip */}
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-2 text-xs">
            <a 
              href="https://wa.me/916392531412" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[#18181B] hover:text-[#C5A059] font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp / Call: +91 63925 31412</span>
            </a>

            <a 
              href="https://www.instagram.com/zubaida_sarees63/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[#18181B] hover:text-[#C5A059] font-medium"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>@zubaida_sarees63</span>
            </a>
          </div>

          {/* Modal Actions */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShopNow}
              className="w-full sm:w-auto px-7 py-3 bg-[#121212] hover:bg-[#262626] text-white rounded-full text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A059]/40"
            >
              <span>Explore Banarasi Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsAboutOpen(false)}
              className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-white text-[#18181B] border border-[#E8E2D8] rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};