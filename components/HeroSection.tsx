'use client';

import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import AmazonBuyButton from '@/components/AmazonBuyButton';

interface HeroSectionProps {
  onQuickView: (product: Product) => void;
  // Kept for backward compatibility
  onAddToCart?: (product: Product) => void;
}

export default function HeroSection({ onQuickView }: HeroSectionProps) {
  const spotlightProduct = PRODUCTS_DATA[0]; // Monstera Deliciosa

  return (
    <section className="bg-gradient-to-b from-[#F7F8F3] via-white to-[#F7F8F3] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5EBE4] relative overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#E8F0E8]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#8EB99A]/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Premium Brand Headline, Supporting Text, Trust Indicators, CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Subtle botanical pill */}
            <div className="inline-flex items-center gap-2 bg-[#E8F0E8] text-[#103D2E] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-[#8EB99A]/40">
              <Leaf className="w-3.5 h-3.5 text-[#28734D]" />
              <span>Handpicked Premium Indoor & Nursery Plants</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#103D2E] tracking-tight leading-[1.12]">
                Bring Nature Closer to Your Home
              </h1>
              <p className="text-base sm:text-lg text-[#758078] max-w-xl leading-relaxed font-normal">
                Discover beautiful indoor plants, thoughtfully selected to bring freshness, beauty and life into every corner of your home.
              </p>
            </div>

            {/* 4 Small Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-[#26352D] pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F0E8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087C50]" />
                </div>
                <span>Nursery Acclimated & Pest-Free</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F0E8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087C50]" />
                </div>
                <span>Shockproof Ventilated Transit Armor</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F0E8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087C50]" />
                </div>
                <span>Free WhatsApp Plant Doctor Support</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E8F0E8] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087C50]" />
                </div>
                <span>Fulfilled Safely via Amazon Prime</span>
              </div>
            </div>

            {/* CTAs (Primary: Deep Forest Green; Secondary: White with Green Border) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#103D2E] hover:bg-[#087C50] active:bg-[#0a271d] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Explore Plants</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#today-deals"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F8F3] active:bg-[#E8F0E8] text-[#103D2E] border-2 border-[#103D2E] font-bold text-sm tracking-wide transition-all shadow-2xs hover:scale-[1.01]"
              >
                <span>Discover Best Sellers</span>
              </a>
            </div>

            {/* Social proof rating */}
            <div className="pt-4 flex items-center gap-3 border-t border-[#E5EBE4]">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-emerald-700 text-sm font-bold"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#758078]">
                <strong className="text-[#103D2E] font-semibold">4.9 / 5 rating</strong> from over 12,000+ plant lovers across India
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): High-Quality Botanical Lifestyle Photography + Floating Spotlight Card */}
          <div className="lg:col-span-5 relative">
            {/* Lifestyle Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5EBE4] aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/4.5] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/plant-shop-shelf-1.jpg"
                alt="TreeBazaar Indoor Botanical Living"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103D2E]/50 via-transparent to-transparent" />

              {/* Floating Quality Assurance Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-[#E5EBE4] flex items-center gap-2 text-xs font-bold text-[#103D2E]">
                <ShieldCheck className="w-4 h-4 text-[#087C50]" />
                <span>100% Healthy Plant Arrival</span>
              </div>
            </div>

            {/* Floating Botanical Spotlight Card */}
            {spotlightProduct && (
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#E5EBE4] max-w-sm w-full animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={spotlightProduct.image}
                    alt={spotlightProduct.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E5EBE4]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#087C50]">
                      <Sparkles className="w-3 h-3 text-[#087C50]" />
                      <span>Featured Plant of the Week</span>
                    </div>
                    <p className="text-xs font-bold text-[#26352D] truncate">
                      {spotlightProduct.name}
                    </p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-sm font-extrabold text-[#103D2E]">
                        ₹{spotlightProduct.price}
                      </span>
                      {spotlightProduct.originalPrice && (
                        <span className="text-[11px] text-[#758078] line-through">
                          ₹{spotlightProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick actions on card */}
                <div className="mt-3 pt-2.5 border-t border-[#E5EBE4] flex items-center gap-2">
                  <button
                    onClick={() => onQuickView(spotlightProduct)}
                    className="flex-1 py-1.5 px-2 bg-[#F7F8F3] hover:bg-[#E8F0E8] text-[#103D2E] text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                  <AmazonBuyButton
                    product={spotlightProduct}
                    variant="compact"
                    className="flex-1 py-1.5!"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
