'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
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
    image: '/images/plant-shop-shelf-1.jpg',
    alt: 'TreeBazaar Bustling Indoor Plant Boutique with Tiered Wooden Shelves of Lucky Bamboo, Jade, and Monsteras',
    badge: '🌿 Live Retail Plant Nursery',
    dealTag: '⚡ Prime 1-2 Day Delivery',
    headline: "Step Into India's Freshest Plant Boutique",
    highlightText: 'Nursery-Packed Shelves Ready for Your Home',
    description:
      'Explore bustling aisles packed with potted Lucky Bamboo, Jade, Money Plants, and Monsteras in artisanal terracotta with handwritten care tags.',
    primaryCta: 'Explore Plant Shop',
    secondaryCta: "Today's Green Deals",
  },
  {
    id: 2,
    image: '/images/plant-shop-shelf-2.jpg',
    alt: 'TreeBazaar Retail Nursery Shelf featuring Golden Money Plants on Moss Sticks and Trailing Vines',
    badge: "🌱 India's Bestselling Vines",
    dealTag: '🔥 Up to 35% OFF Today',
    headline: 'Cascading Money Plants on Moss Poles',
    highlightText: 'Fast-Growing Trailing Foliage Ready for Sale',
    description:
      'Lustrous variegated vines climbing natural coco-coir poles, displayed on rustic nursery crates with retail plant care stakes and terracotta saucers.',
    primaryCta: 'Shop Money Plants',
    secondaryCta: 'View Air Purifiers',
  },
  {
    id: 3,
    image: '/images/plant-shop-shelf-3.jpg',
    alt: 'TreeBazaar Vastu Prosperity Display Table with Lucky Bamboo, Jade Bonsai, and Golden Pothos',
    badge: '🎋 Vastu & Feng Shui Collection',
    dealTag: '⭐ 4.9/5 Customer Rated',
    headline: 'Prosperity Tables: Lucky Bamboo & Jade',
    highlightText: 'Living Good Fortune for Home & Work Desks',
    description:
      'Tiered spiral bamboo in ceramic dishes with polished river pebbles, alongside bonsai Jade succulents on solid timber retail display tables.',
    primaryCta: 'Shop Prosperity Plants',
    secondaryCta: 'Shop Desk Plants',
  },
  {
    id: 4,
    image: '/images/plant-shop-shelf-4.jpg',
    alt: 'TreeBazaar Tropical Showroom with Giant Split-Leaf Monsteras and Fiddle Leaf Figs',
    badge: '🪴 Tropical Statement Greenery',
    dealTag: '🛡️ 100% Guaranteed Healthy Arrival',
    headline: 'Lush Monsteras & Architectural Trees',
    highlightText: 'Showroom-Ready Statement Houseplants',
    description:
      'Deeply fenestrated split-leaf Monsteras and tall Fiddle Leaf Figs in ribbed terracotta planters, acclimatized for modern Indian living spaces.',
    primaryCta: 'Shop Statement Plants',
    secondaryCta: 'View Best Sellers',
  },
  {
    id: 5,
    image: '/images/plant-shop-shelf-5.jpg',
    alt: 'TreeBazaar Artisanal Ceramic Planters and Tiered Wooden Plant Stands Retail Wall',
    badge: '🏺 Handcrafted Pots & Plant Stands',
    dealTag: '🎉 Code: PLANTJOY',
    headline: 'Artisanal Pottery & Wooden Stands',
    highlightText: 'Glazed Stoneware & Tiered Teak Racks',
    description:
      'Browse packed shelves of fluted terracotta and speckled ceramic pots potted with live succulents and trailing vines, paired with tiered wooden stands.',
    primaryCta: 'Shop Planters & Pots',
    secondaryCta: 'View Plant Stands',
  },
  {
    id: 6,
    image: '/images/plant-shop-shelf-6.jpg',
    alt: 'TreeBazaar Commercial Greenhouse Nursery Bench packed with Snake Plants, Peace Lilies, and ZZ Plants',
    badge: '🍃 24/7 Oxygen Releasing Benches',
    dealTag: '📦 Express Prime Fulfilled',
    headline: 'NASA Air-Purifiers Fresh from the Bench',
    highlightText: 'Snake Plants, Peace Lilies & Glossy ZZ',
    description:
      'Bustling greenhouse nursery benches packed with air-purifying Variegated Snake Plants, flowering Peace Lilies, and resilient ZZ Plants ready for doorstep delivery.',
    primaryCta: 'Shop Air Purifiers',
    secondaryCta: 'All Indoor Plants',
  },
];

// Variants for horizontal sliding only (right-to-left for next, left-to-right for prev)
// No opacity fading on the background image
const imageSlideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
  }),
  center: {
    x: '0%',
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
  }),
};

const imageSlideTransition: Transition = {
  x: {
    type: 'tween',
    ease: [0.25, 1, 0.5, 1],
    duration: 0.65,
  },
};

export default function HeroCarousel({
  onExplorePlants,
  onShopDeals,
}: HeroCarouselProps) {
  const [[currentSlideIndex, direction], setSlideState] = useState<[number, number]>([0, 1]);
  const [isPlaying, setIsPlaying] = useState(true);

  const totalSlides = CAROUSEL_SLIDES.length;

  // Preload all carousel slide images on mount for instant, flicker-free sliding
  useEffect(() => {
    CAROUSEL_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);

  const goToSlide = useCallback((targetIndex: number) => {
    setSlideState(([currentIndex]) => {
      if (targetIndex === currentIndex) return [currentIndex, 1];
      const newDirection = targetIndex > currentIndex ? 1 : -1;
      return [targetIndex, newDirection];
    });
  }, []);

  const nextSlide = useCallback(() => {
    setSlideState(([currentIndex]) => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      return [nextIndex, 1];
    });
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideState(([currentIndex]) => {
      const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      return [prevIndex, -1];
    });
  }, [totalSlides]);

  // Auto-play timer: 5.5 seconds per slide (slides right to left)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Touch swipe gestures for mobile
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

  const currentSlide = CAROUSEL_SLIDES[currentSlideIndex];

  return (
    <section
      aria-label="TreeBazaar Indoor Plant Collections Hero Banner"
      className="relative w-full bg-[#FAF9F5] select-none pt-3 sm:pt-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        Central Container Bounds:
        Strictly matches the main container width of the website (max-w-[1440px] mx-auto px-3 sm:px-6).
        Ensures the hero banner is NOT edge-to-edge full width, aligning neatly with the navbar and cards below.
      */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="relative w-full h-[300px] sm:h-[320px] md:h-[340px] lg:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[#E5EEE5] select-none isolate">
        {/* 
          1. BACKGROUND IMAGES: PURE HORIZONTAL SLIDE (RIGHT TO LEFT)
          No opacity fade on the image; strictly bounded within the hero section viewport with overflow-hidden.
        */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#FAF9F5]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              variants={imageSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={imageSlideTransition}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CAROUSEL_SLIDES[currentSlideIndex].image}
                alt={CAROUSEL_SLIDES[currentSlideIndex].alt}
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                decoding="async"
              />

              {/* Subtle gradient scrim on left ensuring text contrast without washing out the photo */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 
          2. PERMANENT WHITE CONTENT BOX (NEVER HIDES / NEVER DISAPPEARS)
          The box container stays fixed, solid, and visible at 100% opacity at all times.
          Only the inner text and content smoothly crossfades/replaces when changing slides.
        */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <div className="w-full px-4 sm:px-8 lg:px-10">
            <div className="max-w-sm sm:max-w-md md:max-w-lg pointer-events-auto space-y-2 sm:space-y-2.5">
              {/* Permanent Solid White Content Box */}
              <div className="bg-white/95 sm:bg-white/92 backdrop-blur-md p-3 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl border border-white/85 shadow-lg min-h-[125px] sm:min-h-[135px] flex flex-col justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`slide-text-${currentSlideIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="space-y-2"
                  >
                    {/* Pill Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#EAF6EC] text-[#278653] border border-[#80C995]/50 shadow-2xs">
                        <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#4CAF72]" />
                        <span>{currentSlide.badge}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-xs">
                        <Zap className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-300 fill-amber-300 animate-pulse" />
                        <span>{currentSlide.dealTag}</span>
                      </span>
                    </div>

                    {/* Headline & Subhead */}
                    <div className="space-y-0.5">
                      <h2 className="text-sm sm:text-base md:text-lg lg:text-[20px] font-black tracking-tight leading-[1.16] text-[#183628]">
                        {currentSlide.headline}
                      </h2>
                      <p className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#278653] flex items-center gap-1.5">
                        <Leaf className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#4CAF72]" />
                        <span>{currentSlide.highlightText}</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-[#718078] font-medium leading-relaxed line-clamp-2">
                      {currentSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 
                3. Action Buttons: Positioned neatly BELOW the main content box inside the banner.
                Always visible and stable.
              */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pl-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => handlePrimaryClick(currentSlideIndex)}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#278653] to-[#4CAF72] hover:from-[#1e6a42] hover:to-[#278653] text-white text-[11px] sm:text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition-all cursor-pointer border border-[#4CAF72]"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`btn-primary-${currentSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                    >
                      {currentSlide.primaryCta}
                    </motion.span>
                  </AnimatePresence>
                  {currentSlideIndex === 5 ? (
                    <ExternalLink className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleSecondaryClick}
                  className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-white/95 hover:bg-[#EAF6EC] backdrop-blur-md text-[#244C38] text-[11px] sm:text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer border border-[#4CAF72]/70"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`btn-secondary-${currentSlideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                    >
                      {currentSlide.secondaryCta}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* 
          4. Left Navigation Arrow Button: Fixed in place with micro-interactions
        */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-40 w-7 sm:w-8 h-12 sm:h-14 bg-white/85 hover:bg-white text-[#244C38] rounded-xl shadow-md hover:shadow-xl flex items-center justify-center transition-shadow cursor-pointer border border-[#E5EEE5] pointer-events-auto"
          aria-label="Previous Slide"
          title="Previous Banner"
        >
          <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
        </motion.button>

        {/* Right Navigation Arrow Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-40 w-7 sm:w-8 h-12 sm:h-14 bg-white/85 hover:bg-white text-[#244C38] rounded-xl shadow-md hover:shadow-xl flex items-center justify-center transition-shadow cursor-pointer border border-[#E5EEE5] pointer-events-auto"
          aria-label="Next Slide"
          title="Next Banner"
        >
          <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
        </motion.button>

        {/* 
          5. Top-Right Slide Indicators (Dots + Counter + Play/Pause):
          Fixed in place in the upper right corner.
        */}
        <div className="absolute top-3 right-3 sm:top-3.5 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-[#E5EEE5] shadow-xs pointer-events-auto">
          {CAROUSEL_SLIDES.map((item, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                type="button"
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`transition-all duration-300 cursor-pointer rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-5 sm:w-6 h-2 bg-[#278653]'
                    : 'w-2 h-2 bg-[#80C995]/50 hover:bg-[#4CAF72]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                title={`Slide ${idx + 1}: ${item.headline}`}
              />
            );
          })}

          <div className="w-px h-3 bg-[#E5EEE5] mx-0.5" />

          {/* Slide counter */}
          <span className="text-[9px] sm:text-[10px] font-bold text-[#718078] px-0.5">
            {currentSlideIndex + 1} / {totalSlides}
          </span>

          <div className="w-px h-3 bg-[#E5EEE5] mx-0.5" />

          {/* Pause / Play Indicator */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="text-[9px] sm:text-[10px] font-bold text-[#718078] hover:text-[#278653] flex items-center gap-1 cursor-pointer px-1 py-0.5 rounded hover:bg-[#EAF6EC] transition-colors"
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
    </section>
  );
}
