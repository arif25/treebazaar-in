'use client';

import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import AmazonBuyButton from '@/components/AmazonBuyButton';
import { openAmazonPurchase } from '@/config/shopConfig';

interface AmazonGatewayCardsProps {
  onSelectCategory?: (category: string) => void;
  onQuickView?: (product: Product) => void;
}

export default function AmazonGatewayCards({
  onSelectCategory,
  onQuickView,
}: AmazonGatewayCardsProps) {
  // Products for Quadrant 1: Best Plants for Your Home
  const homePlants = [
    PRODUCTS_DATA[0], // Monstera
    PRODUCTS_DATA[1], // Snake Plant
    PRODUCTS_DATA[2], // Fiddle Leaf Fig
    PRODUCTS_DATA[4], // Areca Palm
  ].filter(Boolean);

  // Products for Quadrant 2: Easy-Care Air Purifying Plants
  const airPurifiers = [
    PRODUCTS_DATA[3], // Peace Lily
    PRODUCTS_DATA[5], // ZZ Plant
    PRODUCTS_DATA[6], // Spider Plant
    PRODUCTS_DATA[8], // Golden Pothos
  ].filter(Boolean);

  // Products for Quadrant 3: Desk & Balcony Favorites
  const deskBalcony = [
    PRODUCTS_DATA[11], // 3-Layer Bamboo
    PRODUCTS_DATA[9],  // Zebra Haworthia
    PRODUCTS_DATA[7],  // Jade Plant
    PRODUCTS_DATA[10], // Anthurium
  ].filter(Boolean);

  // Featured Spotlight Product for Card 4
  const featuredProduct = PRODUCTS_DATA[0]; // Monstera Deliciosa

  const handleCardCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-20 max-w-[1440px] mx-auto px-3 sm:px-6 -mt-24 sm:-mt-36 md:-mt-48 lg:-mt-64 mb-6 sm:mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: 2x2 Best Plants for Your Home */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-3">
              Best Plants for Your Home
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {homePlants.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onQuickView ? onQuickView(item) : openAmazonPurchase(item)}
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
                    {item.name.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-[#244C38] font-bold">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5]">
            <button
              onClick={() => handleCardCategoryClick('indoor')}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>See more indoor plants &rarr;</span>
            </button>
          </div>
        </div>

        {/* Card 2: 2x2 Easy-Care Air Purifying Plants */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-3">
              Easy-Care Air Purifiers
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {airPurifiers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onQuickView ? onQuickView(item) : openAmazonPurchase(item)}
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
                    {item.name.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-[#244C38] font-bold">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5]">
            <button
              onClick={() => handleCardCategoryClick('indoor')}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all air purifiers &rarr;</span>
            </button>
          </div>
        </div>

        {/* Card 3: 2x2 Trending for Desk & Balcony */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-3">
              Desk & Balcony Favorites
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {deskBalcony.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onQuickView ? onQuickView(item) : openAmazonPurchase(item)}
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
                    {item.name.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-[#244C38] font-bold">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5]">
            <button
              onClick={() => {
                const el = document.getElementById('today-deals');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>See all deals &rarr;</span>
            </button>
          </div>
        </div>

        {/* Card 4: Single Featured Plant Spotlight (Amazon Featured Promotion Card) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E5EEE5] flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D5D] bg-[#FCEEEE] px-2.5 py-0.5 rounded-full border border-[#E85D5D]/20">
                Deal of the Week
              </span>
              <span className="text-[10px] text-[#278653] font-bold">
                Amazon Prime
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#244C38] leading-snug mb-2 truncate">
              {featuredProduct.name.split('(')[0].trim()}
            </h3>

            {/* Featured Image */}
            <div
              onClick={() => openAmazonPurchase(featuredProduct)}
              className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#E5EEE5] group cursor-pointer mb-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 bg-[#E85D5D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                33% OFF
              </span>
            </div>

            {/* Price & Rating */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-[#244C38]">
                ₹{featuredProduct.price}
              </span>
              <span className="text-xs text-[#718078] line-through">
                ₹{featuredProduct.originalPrice}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#718078] mt-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-[#244C38] ml-0.5">
                  {featuredProduct.rating}
                </span>
              </div>
              <span>({featuredProduct.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#E5EEE5] space-y-2">
            <AmazonBuyButton
              product={featuredProduct}
              variant="primary"
              className="w-full justify-center"
              label="Buy on Amazon"
            />
            <button
              onClick={() => openAmazonPurchase()}
              className="w-full text-center text-[11px] text-[#278653] hover:underline font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Visit Official Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
