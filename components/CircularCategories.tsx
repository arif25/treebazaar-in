'use client';

import React from 'react';
import { CIRCULAR_CATEGORIES } from '@/data/plants';

interface CircularCategoriesProps {
  onSelectCategory?: (category: string) => void;
}

export default function CircularCategories({
  onSelectCategory,
}: CircularCategoriesProps) {
  return (
    <section className="bg-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-[#E5EBE4]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103D2E] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#758078] mt-1">
              Explore handpicked botanical selections curated for Indian apartments & gardens
            </p>
          </div>
          <a
            href="#products"
            onClick={() => onSelectCategory && onSelectCategory('all')}
            className="text-xs font-semibold text-[#087C50] hover:text-[#103D2E] hover:underline cursor-pointer shrink-0"
          >
            Explore All 200+ Plants &rarr;
          </a>
        </div>

        {/* Circular Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-6 text-center">
          {CIRCULAR_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(cat.id === 'succulents' ? 'bonsai' : cat.id);
                }
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-[#F7F8F3] p-1 border-2 border-[#E5EBE4] group-hover:border-[#087C50] group-hover:shadow-md transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <span className="mt-2 text-xs font-semibold text-[#26352D] group-hover:text-[#103D2E] transition-colors leading-tight line-clamp-1">
                {cat.name}
              </span>

              <span className="text-[10px] font-bold text-[#103D2E] bg-[#E8F0E8] px-2 py-0.5 rounded-full mt-1 border border-[#8EB99A]/40">
                {cat.discount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
