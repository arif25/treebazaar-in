'use client';

import React from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { AMAZON_CARD_QUADRANTS } from '@/data/plants';
import { openAmazonPurchase } from '@/config/shopConfig';

interface AmazonGatewayCardsRow2Props {
  onSelectCategory?: (category: string) => void;
}

export default function AmazonGatewayCardsRow2({
  onSelectCategory,
}: AmazonGatewayCardsRow2Props) {
  // Use existing curated collections from plants.ts
  const quadPots = AMAZON_CARD_QUADRANTS[2]; // Pots & Planters
  const quadSoil = AMAZON_CARD_QUADRANTS[3]; // Soil & Nutrition
  const quadBalcony = AMAZON_CARD_QUADRANTS[0]; // Balcony Garden

  const handleCategoryNav = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="curated-sets" className="max-w-[1440px] mx-auto px-3 sm:px-6 mb-6 sm:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Handmade Planters & Pots */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-3">
              {quadPots.title}
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {quadPots.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openAmazonPurchase()}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#E5EEE5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#244C38] group-hover:text-[#278653] truncate mt-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#244C38] font-bold">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5]">
            <button
              onClick={() => handleCategoryNav('pots')}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all pots & planters &rarr;</span>
            </button>
          </div>
        </div>

        {/* Card 2: Plant Health & Soil Boosters */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-3">
              {quadSoil.title}
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {quadSoil.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openAmazonPurchase()}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#E5EEE5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#244C38] group-hover:text-[#278653] truncate mt-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#244C38] font-bold">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5]">
            <button
              onClick={() => handleCategoryNav('fertilizer')}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Shop organic soil & nutrition &rarr;</span>
            </button>
          </div>
        </div>

        {/* Card 3: Balcony Garden Sets */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-3">
              {quadBalcony.title}
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {quadBalcony.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openAmazonPurchase()}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#E5EEE5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#244C38] group-hover:text-[#278653] truncate mt-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#244C38] font-bold">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5]">
            <button
              onClick={() => handleCategoryNav('outdoor')}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View balcony garden sets &rarr;</span>
            </button>
          </div>
        </div>

        {/* Card 4: TreeBazaar Plant Doctor & Freshness Guarantee (Soft Mint #EAF6EC, NOT dark green!) */}
        <div className="bg-[#EAF6EC] text-[#244C38] rounded-2xl p-5 shadow-xs border border-[#80C995]/50 flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-[#4CAF72] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                Free Lifetime Support
              </span>
              <span className="text-[10px] font-bold bg-[#FCEEEE] text-[#E85D5D] px-2 py-0.5 rounded-full border border-[#E85D5D]/20">
                Guaranteed
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug">
              Have a Sick Plant? Free WhatsApp Doctor
            </h3>

            <p className="text-xs text-[#718078] leading-relaxed">
              Every TreeBazaar order includes complimentary horticulturist consultation. Send a photo of your leaf anytime for expert diagnosis.
            </p>

            <div className="p-3 rounded-xl bg-white border border-[#E5EEE5] space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#244C38]">
                <ShieldCheck className="w-4 h-4 text-[#4CAF72] shrink-0" />
                <span className="font-bold">7-Day Live Arrival Guarantee</span>
              </div>
              <p className="text-[11px] text-[#718078]">
                Arrives healthy or free nursery replacement.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#80C995]/30">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#4CAF72] hover:bg-[#278653] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat with Plant Doctor</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
