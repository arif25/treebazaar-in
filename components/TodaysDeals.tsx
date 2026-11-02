'use client';

import React from 'react';
import {
  Star,
  Eye,
  Heart,
  Clock,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import AmazonBuyButton from '@/components/AmazonBuyButton';
import { openAmazonPurchase } from '@/config/shopConfig';

interface TodaysDealsProps {
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  // Kept for backward compatibility
  onAddToCart?: (product: Product) => void;
}

export default function TodaysDeals({
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}: TodaysDealsProps) {
  // 6 top deal products
  const dealProducts = PRODUCTS_DATA.slice(0, 6);

  return (
    <section id="today-deals" className="bg-[#F7F8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5EBE4]">
      <div className="max-w-[1440px] mx-auto">
        {/* Deal Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5EBE4] shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="bg-[#103D2E] text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
              FLASH DEALS
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#103D2E] leading-none">
                Today&apos;s Deals & Best Sellers
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#758078] mt-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#087C50]" />
                <span>
                  Limited Time Offers • Dispatched safely via TreeBazaar Amazon Store
                </span>
              </div>
            </div>
          </div>

          <a
            href="#products"
            className="text-xs font-semibold text-[#087C50] hover:text-[#103D2E] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>Explore All 40+ Deals &rarr;</span>
          </a>
        </div>

        {/* Product Grid: 6 columns on lg, 3 on md, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
          {dealProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                onClick={() => openAmazonPurchase(product)}
                className="bg-white rounded-2xl border border-[#E5EBE4] hover:border-[#103D2E] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-3 sm:p-3.5 group relative cursor-pointer"
              >
                {/* Wishlist toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full bg-white/95 hover:bg-white text-[#758078] hover:text-[#103D2E] flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-[#E5EBE4]"
                  aria-label="Toggle Wishlist"
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isWishlisted ? 'fill-[#103D2E] text-[#103D2E]' : ''
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F8F3] mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Discount Tag (Subtle Green) */}
                  <span className="absolute top-2 left-2 bg-[#E8F0E8] text-[#103D2E] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#8EB99A]/50 shadow-2xs">
                    {discountPercent}% OFF
                  </span>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-[#F7F8F3] text-[#103D2E] rounded-xl text-xs font-bold shadow-md flex items-center gap-1 transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Deal tag text in Emerald */}
                    <span className="text-[10px] font-bold text-[#087C50] uppercase tracking-wide block truncate">
                      {product.dealTag || 'Limited time deal'}
                    </span>

                    {/* Product Name */}
                    <h3
                      className="text-xs font-bold text-[#26352D] group-hover:text-[#103D2E] transition-colors line-clamp-2 leading-snug mt-0.5"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1 text-[11px] mt-1 text-[#758078]">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold text-[#26352D] ml-0.5">
                          {product.rating}
                        </span>
                      </div>
                      <span>({product.reviewsCount})</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-sm sm:text-base font-extrabold text-[#103D2E]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#758078] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amazon Purchase CTA (Forest Green) */}
                  <div className="pt-2 mt-1">
                    <AmazonBuyButton
                      product={product}
                      variant="compact"
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
