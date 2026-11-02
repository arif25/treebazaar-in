'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
  Leaf,
  Play,
  Pause,
} from 'lucide-react';
import { Product } from '@/types';
import { openAmazonPurchase } from '@/config/shopConfig';

interface HeroCarouselProps {
  onExplorePlants?: () => void;
  onShopDeals?: () => void;
  onSelectProduct?: (product: Product) => void;
}

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: '/images/hero-slide-1.jpg',
    alt: 'TreeBazaar Living Room Indoor Jungle with Monsteras and Ferns',
    badge: '🌿 50+ Nursery-Grown Indoor Varieties',
    dealTag: '⚡ Prime 1-2 Day Delivery',
    headline: 'Bring Nature Closer to Your Home',
    highlightText: "India's Hand-Nurtured Indoor Jungle Collection",
    description:
      'Lush Monsteras, 24/7 air-purifying Snake Plants, architectural Fiddle Leaf Figs, and trailing Pothos acclimatized for modern Indian apartments.',
    primaryCta: 'Explore Indoor Plants',
    secondaryCta: "Today's Flash Deals",
  },
  {
    id: 2,
    image: '/images/banner-05.jpg',
    alt: 'TreeBazaar Indoor Plants Collection on Multi-Tier Wooden Stands',
    badge: '🪴 Curated Living Greens for Desks & Living Rooms',
    dealTag: '🔥 Up to 40% OFF Deals',
    headline: 'Create Your Personal Indoor Oasis',
    highlightText: 'Living Oxygen & Tranquil Home Aesthetics',
    description:
      'Over 50 hardy indoor varieties grown in breathable organic coco-peat mix. Every plant is nursery inspected before shockproof delivery.',
    primaryCta: 'Shop Indoor Plants',
    secondaryCta: 'View Best Sellers',
  },
  {
    id: 3,
    image: '/images/hero-slide-3.jpg',
    alt: 'Bohemian Indoor Plant Sanctuary with Hanging Vines and Monstera',
    badge: '✨ Stress-Relieving Botanical Decor',
    dealTag: '⭐ 4.9/5 Rated on Amazon',
    headline: 'Breathe Pure, Live Green Every Day',
    highlightText: 'NASA-Certified Air Purifiers for Indian Homes',
    description:
      'Filter harmful indoor toxins, benzene, and formaldehyde naturally while beautifying your bedroom, study desk, or living room corner.',
    primaryCta: 'Explore Air Purifiers',
    secondaryCta: 'Shop Ceramic Pots',
  },
  {
    id: 4,
    image: '/images/banner-06.jpg',
    alt: 'Top Indoor Plants Row: Monstera, Calathea, Philodendron, Ficus',
    badge: '🛡️ 100% Guaranteed Live Arrival',
    dealTag: '🌱 Beginner & Pet Friendly',
    headline: 'Curated Low-Maintenance Botanicals',
    highlightText: 'Thriving Indoor Flora with Minimal Care',
    description:
      'Resilient houseplants requiring watering only once a week. Shipped safely in custom 5-ply shockproof ventilated transit cartons.',
    primaryCta: 'Shop Desk Plants',
    secondaryCta: "Today's Green Deals",
  },
  {
    id: 5,
    image: '/images/banner-04.jpg',
    alt: 'Upgrade Your Interiors with Stylish Planters and Wooden Stands',
    badge: '🏺 Handcrafted Ceramic & Wooden Stands',
    dealTag: '🎉 Code: PLANTJOY',
    headline: 'Upgrade Interiors with Stylish Planters',
    highlightText: 'Artisanal Terracotta & Glazed Ceramics',
    description:
      'Complement your greenery with handcrafted pots engineered with precision bottom drainage to keep indoor roots vibrant and healthy.',
    primaryCta: 'Shop Planters',
    secondaryCta: 'View Plant Stands',
  },
  {
    id: 6,
    image: '/images/banner-02.jpg',
    alt: 'De-stress and Grow with Indoor Plants Botanical Shelf',
    badge: '🧘 Plant Parenting & Wellness',
    dealTag: '📦 Express Prime Fulfilled',
    headline: 'De-Stress & Grow With Indoor Plants',
    highlightText: 'Natural Calming Green Spaces',
    description:
      'Studies prove indoor greenery reduces stress by 37% and sharpens daily focus. Includes free lifetime WhatsApp horticulturist guidance.',
    primaryCta: 'Shop on Amazon',
    secondaryCta: 'All Indoor Plants',
  },
];

export default function HeroCarousel({
  onExplorePlants,
  onShopDeals,
}: HeroCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalSlides = CAROUSEL_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
  };

  // Continuous auto-play timer: advances every 5 seconds (5000ms)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrimaryClick = (idx: number) => {
    if (idx === 5) {
      openAmazonPurchase();
    } else if (onExplorePlants) {
      onExplorePlants();
    } else {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryClick = () => {
    if (onShopDeals) {
      onShopDeals();
    } else {
      const el = document.getElementById('today-deals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#FAF9F5] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        Amazon-Style Viewport:
        Height calibrated so the upper 340px-420px is dedicated to the banner visuals & headline,
        and the bottom area blends smoothly under the overlapping Amazon Gateway Cards.
      */}
      <div className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] lg:h-[680px] overflow-hidden">
        {/* Horizontal Sliding Track (Real Amazon-Style Carousel) */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {CAROUSEL_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="min-w-full w-full h-full relative shrink-0 overflow-hidden"
            >
              {/* Slide Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* 
                Refined Gradient Scrim:
                Soft white gradient on the left ensures text legibility while keeping the center and right
                indoor plants 100% vibrant, colorful, and clearly visible.
              */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 sm:via-white/50 md:via-white/20 to-transparent pointer-events-none" />

              {/* Bottom Fade into #FAF9F5 for seamless Amazon Gateway Cards overlap */}
              <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/90 to-transparent pointer-events-none" />

              {/* Slide Text & Action Content Container (positioned in upper visible area) */}
              <div className="absolute inset-0 z-10 flex items-start pt-8 sm:pt-10 md:pt-14 pointer-events-none">
                <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12">
                  <div className="max-w-md sm:max-w-lg md:max-w-xl bg-white/92 sm:bg-white/85 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-white/80 shadow-xl space-y-2.5 sm:space-y-3.5 pointer-events-auto">
                    {/* Pill Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#EAF6EC] text-[#278653] border border-[#80C995]/50 shadow-2xs">
                        <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#4CAF72]" />
                        <span>{slide.badge}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-xs">
                        <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                        <span>{slide.dealTag}</span>
                      </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-0.5 sm:space-y-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black tracking-tight leading-[1.16] text-[#183628]">
                        {slide.headline}
                      </h2>
                      <p className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#278653] flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-[#4CAF72]" />
                        <span>{slide.highlightText}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#718078] font-medium leading-relaxed line-clamp-2">
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => handlePrimaryClick(idx)}
                        className="px-5 sm:px-7 py-2 sm:py-2.5 bg-gradient-to-r from-[#278653] to-[#4CAF72] hover:from-[#1e6a42] hover:to-[#278653] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/25 flex items-center gap-2 transition-all cursor-pointer border border-[#4CAF72] hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>{slide.primaryCta}</span>
                        {idx === 5 ? (
                          <ExternalLink className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleSecondaryClick}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-[#EAF6EC] text-[#244C38] text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer border-2 border-[#4CAF72]/80 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {slide.secondaryCta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          Amazon-Style Left Navigation Arrow Button:
          Positioned vertically in the clear visible area (top-[32%] sm:top-[35%]),
          with high z-index (z-40) and explicit pointer-events so it is ALWAYS clickable.
        */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-2 sm:left-4 top-[30%] sm:top-[35%] -translate-y-1/2 z-40 w-10 sm:w-12 h-18 sm:h-24 bg-white/85 hover:bg-white text-[#244C38] rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center transition-all cursor-pointer border border-[#E5EEE5] hover:scale-105 active:scale-95 pointer-events-auto"
          aria-label="Previous Slide"
          title="Previous Banner"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Amazon-Style Right Navigation Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-2 sm:right-4 top-[30%] sm:top-[35%] -translate-y-1/2 z-40 w-10 sm:w-12 h-18 sm:h-24 bg-white/85 hover:bg-white text-[#244C38] rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center transition-all cursor-pointer border border-[#E5EEE5] hover:scale-105 active:scale-95 pointer-events-auto"
          aria-label="Next Slide"
          title="Next Banner"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* 
          Slide Indicators (Dots + Slide Counter + Play/Pause):
          Positioned in the upper right corner (top-4 right-4 sm:top-6 sm:right-8),
          where it is NEVER obscured or collided by the overlapping Amazon Gateway Cards!
        */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-[#E5EEE5] shadow-md pointer-events-auto">
          {CAROUSEL_SLIDES.map((item, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                type="button"
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`transition-all cursor-pointer rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-6 sm:w-7 h-2.5 bg-[#278653]'
                    : 'w-2.5 h-2.5 bg-[#80C995]/50 hover:bg-[#4CAF72]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                title={`Slide ${idx + 1}: ${item.headline}`}
              />
            );
          })}

          <div className="w-px h-3.5 bg-[#E5EEE5] mx-1" />

          {/* Slide counter */}
          <span className="text-[10px] sm:text-xs font-bold text-[#718078] px-0.5">
            {currentIdx + 1} / {totalSlides}
          </span>

          <div className="w-px h-3.5 bg-[#E5EEE5] mx-1" />

          {/* Pause / Play Indicator */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="text-[10px] sm:text-xs font-bold text-[#718078] hover:text-[#278653] flex items-center gap-1 cursor-pointer px-1 py-0.5 rounded hover:bg-[#EAF6EC]"
            title={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-2.5 h-2.5 fill-current text-[#718078]" />
                <span className="hidden sm:inline">Auto</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 fill-current text-[#278653]" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
