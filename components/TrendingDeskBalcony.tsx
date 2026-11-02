'use client';

import React, { useState } from 'react';
import {
  Star,
  Eye,
  Heart,
  Truck,
  Sparkles,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import AmazonBuyButton from '@/components/AmazonBuyButton';
import { openAmazonPurchase } from '@/config/shopConfig';

interface TrendingDeskBalconyProps {
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  // Kept for backward compatibility
  onAddToCart?: (product: Product) => void;
}

export default function TrendingDeskBalcony({
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}: TrendingDeskBalconyProps) {
  const [filter, setFilter] = useState<'all' | 'desk' | 'balcony'>('all');

  const filtered = PRODUCTS_DATA.filter((p) => {
    if (filter === 'desk') return p.isDeskFavorite;
    if (filter === 'balcony') return p.isBalconyFavorite;
    return true;
  }).slice(0, 8);

  return (
    <section className="bg-[#F7F8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5EBE4]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header & Subtabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#103D2E] bg-[#E8F0E8] px-3 py-1 rounded-full mb-2 border border-[#8EB99A]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#087C50]" /> Urban Living Favorites
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103D2E] tracking-tight">
              Trending Plants for Your Desk & Balcony
            </h2>
            <p className="text-xs sm:text-sm text-[#758078] mt-1">
              Tested low-maintenance varieties proven to thrive in Indian homes, offices, and compact balconies.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E5EBE4] shadow-2xs self-start sm:self-auto shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#103D2E] text-white shadow-2xs'
                  : 'text-[#758078] hover:text-[#26352D]'
              }`}
            >
              All Trending
            </button>
            <button
              onClick={() => setFilter('desk')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'desk'
                  ? 'bg-[#103D2E] text-white shadow-2xs'
                  : 'text-[#758078] hover:text-[#26352D]'
              }`}
            >
              Desk Favorites
            </button>
            <button
              onClick={() => setFilter('balcony')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === 'balcony'
                  ? 'bg-[#103D2E] text-white shadow-2xs'
                  : 'text-[#758078] hover:text-[#26352D]'
              }`}
            >
              Balcony Favorites
            </button>
          </div>
        </div>

        {/* 4 columns on desktop, 2-3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                onClick={() => openAmazonPurchase(product)}
                className="bg-white rounded-2xl border border-[#E5EBE4] hover:border-[#103D2E] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-4 group relative cursor-pointer"
              >
                {/* Wishlist toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#758078] hover:text-[#103D2E] flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-[#E5EBE4]"
                  aria-label="Save to Wishlist"
                  title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 ${
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

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#103D2E] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-[#F7F8F3] text-[#103D2E] rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] font-bold text-[#087C50] uppercase tracking-wider block">
                      {product.categoryLabel}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-sm font-semibold text-[#26352D] group-hover:text-[#103D2E] transition-colors line-clamp-1 leading-snug mt-0.5"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Botanical Name */}
                    {product.botanicalName && (
                      <p className="text-[11px] text-[#758078] italic truncate">
                        {product.botanicalName}
                      </p>
                    )}

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-xs mt-1 text-[#758078]">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-[#26352D] ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span>({product.reviewsCount})</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base sm:text-lg font-bold text-[#103D2E]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-[#758078] line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-[#103D2E] bg-[#E8F0E8] px-1.5 py-0.5 rounded-md border border-[#8EB99A]/40">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Prime Shipping Notice */}
                    <p className="text-[11px] text-[#087C50] font-semibold mt-1.5 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#087C50]" />
                      <span>{product.deliveryEstimate || 'Prime Tomorrow'}</span>
                    </p>
                  </div>

                  {/* Buy on Amazon CTA */}
                  <div className="pt-2.5">
                    <AmazonBuyButton
                      product={product}
                      variant="primary"
                      className="w-full justify-center"
                      label="Buy on Amazon"
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
