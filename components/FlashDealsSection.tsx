'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Zap,
  Star,
  Eye,
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import { openAmazonPurchase } from '@/config/shopConfig';

interface FlashDealsSectionProps {
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
}

export default function FlashDealsSection({
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}: FlashDealsSectionProps) {
  // Real-time Countdown Timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 11, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Top 6 deal products
  const dealProducts = PRODUCTS_DATA.slice(0, 6).map((product, idx) => {
    const leftInStock = [3, 4, 2, 5, 3, 2][idx % 6];
    const percentClaimed = [86, 78, 92, 70, 88, 95][idx % 6];
    return {
      ...product,
      leftInStock,
      percentClaimed,
    };
  });

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="today-deals" className="py-10 sm:py-14 bg-[#F3FAF4] border-b border-[#E5EEE5] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Deals Banner Header */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E5EEE5] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30 shrink-0">
              <Zap className="w-6 h-6 fill-amber-300 text-amber-300 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                  ⚡ Flash Green Deals
                </span>
                <span className="text-xs text-[#278653] font-bold hidden sm:inline-block">
                  Verified Amazon Prime Deals
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#244C38] tracking-tight">
                Today&apos;s Limited-Time Nursery Steals
              </h2>
              <p className="text-xs sm:text-sm text-[#718078]">
                Healthy hand-selected potted plants with special limited-quantity pricing.
              </p>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto bg-[#FAF9F5] p-3 sm:p-3.5 rounded-2xl border border-[#E5EEE5]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#718078] mr-1">
              <Clock className="w-4 h-4 text-[#E85D5D] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="uppercase tracking-wider">Ends In:</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <div className="bg-[#244C38] text-white px-2.5 py-1.5 rounded-xl text-center min-w-[42px] shadow-xs">
                <span className="text-sm sm:text-base font-extrabold block leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-emerald-200 uppercase block mt-0.5">Hours</span>
              </div>
              <span className="text-sm font-bold text-[#244C38]">:</span>
              <div className="bg-[#244C38] text-white px-2.5 py-1.5 rounded-xl text-center min-w-[42px] shadow-xs">
                <span className="text-sm sm:text-base font-extrabold block leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-emerald-200 uppercase block mt-0.5">Mins</span>
              </div>
              <span className="text-sm font-bold text-[#244C38]">:</span>
              <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white px-2.5 py-1.5 rounded-xl text-center min-w-[42px] shadow-xs shadow-rose-500/20">
                <span className="text-sm sm:text-base font-extrabold block leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-rose-100 uppercase block mt-0.5">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Controls */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#718078] font-medium flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#278653]" />
            <span>High demand items — claim before stocks replenish</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-xl bg-white border border-[#E5EEE5] hover:border-[#278653] hover:bg-[#EAF6EC] text-[#244C38] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll deals left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-xl bg-white border border-[#E5EEE5] hover:border-[#278653] hover:bg-[#EAF6EC] text-[#244C38] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll deals right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Cards Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-3 scroll-smooth"
        >
          {dealProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => openAmazonPurchase(product)}
                className="w-68 sm:w-76 shrink-0 bg-white rounded-3xl p-4 border border-[#E5EEE5] hover:border-[#4CAF72] shadow-xs hover:shadow-xl hover:shadow-emerald-950/10 transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
              >
                {/* Top Badge & Wishlist Heart */}
                <div className="relative">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF9F5] mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                    />

                    {/* Flash Deal Pill */}
                    <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md shadow-rose-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{discountPercent}% OFF</span>
                    </div>

                    {/* Quick View Trigger on Image Hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl bg-white/95 hover:bg-white text-[#244C38] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-[#E5EEE5]"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Wishlist Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#718078] hover:text-rose-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-[#E5EEE5]"
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Content Area */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating Pill & Category */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[11px] font-bold text-[#278653] uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#E5EEE5] text-[11px] font-bold text-[#244C38]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[10px] text-[#718078] font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Plant Title */}
                    <h3 className="text-sm font-bold text-[#244C38] group-hover:text-[#278653] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#718078] italic truncate">
                      {product.botanicalName || 'Living indoor houseplant'}
                    </p>
                  </div>

                  {/* Pricing Hierarchy */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-[#244C38]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-[#718078] line-through font-normal">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded-md">
                        Save ₹{product.originalPrice - product.price}
                      </span>
                    </div>

                    {/* Live Stock Progress Bar ("Only X left!") */}
                    <div className="pt-2.5 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-extrabold text-rose-600 flex items-center gap-1">
                          ⚡ Only {product.leftInStock} left in stock!
                        </span>
                        <span className="text-[#718078] text-[10px] font-medium">
                          {product.percentClaimed}% claimed
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E5EEE5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${product.percentClaimed}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Slide-up CTA Button */}
                  <div className="pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAmazonPurchase(product);
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-[#278653] to-[#4CAF72] hover:from-[#1d6b42] hover:to-[#278653] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                    >
                      <span>Buy on Amazon</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

