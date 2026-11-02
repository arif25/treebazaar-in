'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import AmazonBuyButton from '@/components/AmazonBuyButton';
import { openAmazonPurchase } from '@/config/shopConfig';

interface AmazonProductCarouselProps {
  id?: string;
  title: string;
  subtitle?: string;
  seeAllLinkText?: string;
  onSeeAll?: () => void;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export default function AmazonProductCarousel({
  id,
  title,
  subtitle,
  seeAllLinkText = 'See all',
  onSeeAll,
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
}: AmazonProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="max-w-[1440px] mx-auto px-3 sm:px-6 mb-6 sm:mb-10">
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5EEE5] shadow-xs relative">
        {/* Carousel Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#244C38] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <span className="text-xs text-[#718078] hidden md:inline">
                {subtitle}
              </span>
            )}
          </div>

          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="text-xs font-bold text-[#278653] hover:text-[#4CAF72] hover:underline self-start sm:self-auto cursor-pointer"
            >
              {seeAllLinkText} &rarr;
            </button>
          )}
        </div>

        {/* Carousel Scroll Container */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-16 bg-white/95 hover:bg-white text-[#244C38] shadow-lg border border-[#E5EEE5] rounded-r-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Product Items Row */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          >
            {products.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const discountPercent = Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              );

              return (
                <div
                  key={product.id}
                  onClick={() => openAmazonPurchase(product)}
                  className="w-48 sm:w-56 shrink-0 bg-white hover:bg-[#F3FAF4]/50 rounded-2xl border border-[#E5EEE5] hover:border-[#80C995] p-3 sm:p-3.5 flex flex-col justify-between group/card transition-all duration-200 hover:shadow-md cursor-pointer relative"
                >
                  {/* Wishlist Button with Coral Red active state */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-4 right-4 z-20 w-7 h-7 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-xs border border-[#E5EEE5] cursor-pointer transition-colors ${
                      isWishlisted ? 'text-[#E85D5D]' : 'text-[#718078] hover:text-[#E85D5D]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? 'fill-[#E85D5D]' : ''
                      }`}
                    />
                  </button>

                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF9F5] mb-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/card:scale-106 transition-transform duration-300"
                      />

                      {/* Coral Red Discount Badge */}
                      {discountPercent > 0 && (
                        <span className="absolute top-2 left-2 bg-[#E85D5D] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs">
                          {discountPercent}% off
                        </span>
                      )}

                      {/* Quick View Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="absolute inset-x-2 bottom-2 py-1.5 bg-white/95 text-[#244C38] rounded-lg text-[11px] font-bold shadow-xs opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-1 border border-[#E5EEE5]"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#4CAF72]" />
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Price in Main Text (#244C38) and crossed out MRP */}
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-base font-extrabold text-[#244C38]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#718078] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xs font-semibold text-[#244C38] group-hover/card:text-[#278653] transition-colors line-clamp-2 leading-snug mt-1"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[11px] text-[#718078] mt-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold text-[#244C38] ml-0.5">
                          {product.rating}
                        </span>
                      </div>
                      <span>({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Amazon CTA Button in Fresh Green */}
                  <div className="pt-2 mt-2 border-t border-[#E5EEE5]">
                    <AmazonBuyButton
                      product={product}
                      variant="compact"
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-16 bg-white/95 hover:bg-white text-[#244C38] shadow-lg border border-[#E5EEE5] rounded-l-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
