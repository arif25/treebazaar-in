'use client';

import React from 'react';
import {
  X,
  Star,
  Sun,
  Droplets,
  Heart,
  Truck,
} from 'lucide-react';
import { Product } from '@/types';
import AmazonBuyButton from '@/components/AmazonBuyButton';
import { openAmazonPurchase } from '@/config/shopConfig';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  // Kept for backward compatibility
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
}: QuickViewModalProps) {
  if (!product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E5EEE5] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-[#718078] hover:text-[#244C38] shadow-md flex items-center justify-center transition-colors cursor-pointer border border-[#E5EEE5]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div
              onClick={() => openAmazonPurchase(product)}
              className="relative aspect-square md:aspect-auto h-72 md:h-full bg-[#FAF9F5] overflow-hidden cursor-pointer group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#244C38] text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-sm">
                  {product.badge}
                </div>
              )}

              {discountPercent > 0 && (
                <div className="absolute bottom-4 left-4 bg-[#FCEEEE] text-[#E85D5D] text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-xs border border-[#E85D5D]/30">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Right: Product Details & Amazon CTA */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                {/* Category & Botanical */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#278653] uppercase tracking-wider block">
                    {product.categoryLabel}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#244C38] leading-tight">
                    {product.name}
                  </h2>
                  {product.botanicalName && (
                    <p className="text-xs text-[#718078] italic">
                      {product.botanicalName}
                    </p>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#244C38]">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#718078]">
                    ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#244C38]">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-[#718078] line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-[#E85D5D] bg-[#FCEEEE] px-2 py-0.5 rounded-md border border-[#E85D5D]/30">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#718078] leading-relaxed pt-1">
                  {product.description}
                </p>

                {/* Care specs */}
                {product.care && (
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E5EEE5] flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#4CAF72] shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] text-[#718078] block">Sunlight</span>
                        <span className="font-bold text-[#244C38] truncate block">
                          {product.care.light}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E5EEE5] flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-[#4CAF72] shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] text-[#718078] block">Watering</span>
                        <span className="font-bold text-[#244C38] truncate block">
                          {product.care.difficulty} Care
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipping badge */}
                <div className="flex items-center gap-2 text-xs text-[#244C38] bg-[#EAF6EC] border border-[#80C995]/40 p-2.5 rounded-xl">
                  <Truck className="w-4 h-4 text-[#4CAF72] shrink-0" />
                  <span>
                    <strong>Amazon Prime Fulfilled:</strong> Dispatches safely with 7-Day Guarantee
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5EEE5] flex items-center gap-3">
                <AmazonBuyButton
                  product={product}
                  variant="primary"
                  className="flex-1 py-3"
                  label="Buy on Amazon"
                />

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-[#E85D5D] bg-[#FCEEEE] text-[#E85D5D]'
                      : 'border-[#E5EEE5] hover:border-[#4CAF72] text-[#718078]'
                  }`}
                  aria-label="Wishlist"
                  title="Toggle wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
