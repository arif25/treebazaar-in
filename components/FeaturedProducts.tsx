'use client';

import React from 'react';
import {
  Star,
  Eye,
  Heart,
  Sun,
  Droplets,
  Truck,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import AmazonBuyButton from '@/components/AmazonBuyButton';
import { openAmazonPurchase } from '@/config/shopConfig';

interface FeaturedProductsProps {
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  // Kept for backward compatibility
  onAddToCart?: (product: Product) => void;
}

export default function FeaturedProducts({
  onQuickView,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
}: FeaturedProductsProps) {
  const filterTabs = [
    { id: 'all', label: 'All Plants & Supplies' },
    { id: 'indoor', label: 'Indoor Plants' },
    { id: 'outdoor', label: 'Balcony & Outdoor' },
    { id: 'pots', label: 'Pots & Planters' },
    { id: 'seeds', label: 'Organic Seeds' },
    { id: 'tools', label: 'Gardening Tools' },
    { id: 'fertilizer', label: 'Soil & Fertilizer' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-8 sm:py-14 bg-white border-b border-[#E5EEE5] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#278653] bg-[#EAF6EC] px-3 py-1 rounded-full border border-[#80C995]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#4CAF72]" /> Handpicked Nursery Flora
              </span>
              <span className="text-[11px] font-bold text-[#E85D5D] bg-[#FCEEEE] px-2.5 py-0.5 rounded-full border border-[#E85D5D]/20">
                Special Pricing
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#244C38] tracking-tight">
              Explore All Handpicked Greenery & Supplies
            </h2>
            <p className="text-xs sm:text-sm text-[#718078] mt-1">
              Showing {filteredProducts.length} healthy nursery-acclimated plants and essentials with live horticulturist care guidance
            </p>
          </div>

          <div className="text-xs font-semibold text-[#278653] bg-[#EAF6EC] border border-[#80C995]/40 px-3.5 py-1.5 rounded-full shrink-0 flex items-center gap-1.5 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#4CAF72]" />
            <span>Orders Dispatched via Amazon Prime</span>
          </div>
        </div>

        {/* Filter Pills with Fresh Green Active State */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-7 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#4CAF72] text-white shadow-xs border border-[#4CAF72]'
                    : 'bg-[#FAF9F5] text-[#718078] hover:text-[#244C38] hover:bg-[#EAF6EC] border border-[#E5EEE5]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Product Grid: 4 Desktop, 2-3 Tablet, 2 Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                onClick={() => openAmazonPurchase(product)}
                className="bg-white rounded-2xl border border-[#E5EEE5] hover:border-[#80C995] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-4 group relative cursor-pointer"
              >
                {/* Wishlist Button with Coral Red active state */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className={`absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-xs transition-colors cursor-pointer border border-[#E5EEE5] ${
                    isWishlisted ? 'text-[#E85D5D]' : 'text-[#718078] hover:text-[#E85D5D]'
                  }`}
                  aria-label="Save to Wishlist"
                  title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#E85D5D]' : ''
                    }`}
                  />
                </button>

                {/* Product Image Area */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF9F5] mb-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Badges: Green Tag + Coral Red Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                    {product.badge && (
                      <span className="bg-[#4CAF72] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                        {product.badge}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="bg-[#E85D5D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-2xs">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-[#FAF9F5] text-[#244C38] rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform transform hover:scale-105 cursor-pointer border border-[#E5EEE5]"
                    >
                      <Eye className="w-4 h-4 text-[#4CAF72]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label in Botanical Green */}
                    <span className="text-[10px] font-bold text-[#278653] uppercase tracking-wider block">
                      {product.categoryLabel}
                    </span>

                    {/* Product Name */}
                    <h3
                      className="text-sm font-semibold text-[#244C38] group-hover:text-[#278653] transition-colors line-clamp-2 leading-snug mt-0.5"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Botanical Name */}
                    {product.botanicalName && (
                      <p className="text-[11px] text-[#718078] italic truncate">
                        {product.botanicalName}
                      </p>
                    )}

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 text-xs mt-1 text-[#718078]">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-[#244C38] ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span>({product.reviewsCount})</span>
                    </div>

                    {/* Price and MRP */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base sm:text-lg font-bold text-[#244C38]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-[#718078] line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-[#E85D5D] bg-[#FCEEEE] px-1.5 py-0.5 rounded-md border border-[#E85D5D]/20">
                        Save ₹{product.originalPrice - product.price}
                      </span>
                    </div>

                    {/* Care Quick Pills */}
                    {product.care && (
                      <div className="flex items-center gap-2 pt-2 text-[10px] text-[#718078]">
                        <span className="flex items-center gap-1 bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#E5EEE5]">
                          <Sun className="w-3 h-3 text-[#4CAF72]" />
                          <span className="truncate max-w-[85px]">
                            {product.care.light.split(',')[0]}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#E5EEE5]">
                          <Droplets className="w-3 h-3 text-[#4CAF72]" />
                          <span>{product.care.difficulty} Care</span>
                        </span>
                      </div>
                    )}

                    {/* Prime badge */}
                    <p className="text-[11px] text-[#278653] font-semibold mt-2 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#4CAF72]" />
                      <span>{product.deliveryEstimate || 'Prime Delivery Available'}</span>
                    </p>
                  </div>

                  {/* Buy on Amazon Button in Fresh Green */}
                  <div className="pt-3">
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
