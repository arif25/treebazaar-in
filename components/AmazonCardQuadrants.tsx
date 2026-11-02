'use client';

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AMAZON_CARD_QUADRANTS } from '@/data/plants';
import { openAmazonPurchase } from '@/config/shopConfig';

interface AmazonCardQuadrantsProps {
  onSelectCategory?: (category: string) => void;
}

export default function AmazonCardQuadrants({
  onSelectCategory,
}: AmazonCardQuadrantsProps) {
  const categoryMap = ['outdoor', 'indoor', 'pots', 'fertilizer'];

  const handleCardClick = (index: number) => {
    if (onSelectCategory) {
      onSelectCategory(categoryMap[index % categoryMap.length]);
    }
    openAmazonPurchase();
  };

  return (
    <section className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5EBE4]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-7">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#103D2E] bg-[#E8F0E8] px-3 py-1 rounded-full mb-2 border border-[#8EB99A]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#087C50]" /> Curated Collections
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103D2E] tracking-tight">
            Curated Green Living Sets for Modern Spaces
          </h2>
          <p className="text-xs sm:text-sm text-[#758078] mt-1">
            Hand-selected plant pairings and gardening kits ready for your desk, living room, and balcony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {AMAZON_CARD_QUADRANTS.map((quad, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="bg-[#F7F8F3] rounded-3xl p-4 sm:p-5 border border-[#E5EBE4] hover:border-[#103D2E] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#103D2E] leading-snug mb-3.5 group-hover:text-[#087C50] transition-colors">
                  {quad.title}
                </h3>

                {/* 2x2 Image Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {quad.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group/item flex flex-col"
                    >
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#E5EBE4]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center group-hover/item:scale-106 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] mt-1.5 px-0.5">
                        <span className="font-semibold text-[#26352D] truncate group-hover/item:text-[#103D2E]">
                          {item.name}
                        </span>
                        <span className="font-bold text-[#103D2E] ml-1 shrink-0">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom "Shop on Amazon" link */}
              <div className="pt-3.5 mt-4 border-t border-[#E5EBE4] flex items-center justify-between">
                <span className="text-xs font-bold text-[#103D2E] group-hover:text-[#087C50] flex items-center gap-1">
                  <span>{quad.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#087C50]" />
                </span>
                <span className="text-[10px] font-bold text-[#103D2E] bg-[#E8F0E8] px-2 py-0.5 rounded-full border border-[#8EB99A]/40">
                  Amazon Prime
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
