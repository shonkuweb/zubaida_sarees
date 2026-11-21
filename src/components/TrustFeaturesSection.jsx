import React from 'react';
import { Truck, ShieldCheck, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustFeaturesSection = () => {
  const { storeConfig } = useStore();

  const phone = storeConfig?.whatsappNumber || '+91 63925 31412';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const features = [
    {
      id: 'shipping',
      icon: Truck,
      title: 'Worldwide Shipping',
      subtitle: 'Express delivery pan-India & globally',
      onClick: null,
    },
    {
      id: 'gst',
      icon: ShieldCheck,
      title: 'GST Verified Since 1965',
      subtitle: 'Certified pure Banarasi handlooms',
      onClick: null,
    },
    {
      id: 'support',
      icon: MessageCircle,
      title: 'WhatsApp Concierge',
      subtitle: '+91 63925 31412 (Loom Direct)',
      onClick: () => {
        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Zubaida Sarees, I need assistance with an authentic Banarasi saree.')}`, '_blank');
      },
    },
  ];

  return (
    <section 
      aria-label="Zubaida Sarees Services"
      className="border-y border-[#E8E2D8] bg-[#FFFFFF] py-5 sm:py-6"
    >
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-2 sm:px-4">
        
        {/* Minimalist 3-column row separated with subtle vertical dividers */}
        <div className="grid grid-cols-3 divide-x divide-[#E8E2D8]">
          {features.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={feat.onClick || undefined}
                className={`flex flex-col items-center text-center px-1.5 sm:px-4 group ${
                  feat.onClick ? 'cursor-pointer' : ''
                }`}
              >
                {/* Thin, premium line icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#121212] group-hover:scale-110 transition-transform duration-300 mb-1.5 sm:mb-2 shadow-2xs border border-[#E8E2D8]">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5] text-[#C5A059]" />
                </div>

                <h4 className="font-serif text-xs sm:text-sm font-medium text-[#18181B] tracking-tight leading-snug">
                  {feat.title}
                </h4>

                <p className="text-[9.5px] sm:text-[11px] font-sans font-light text-[#71717A] mt-0.5 line-clamp-1">
                  {feat.subtitle}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};