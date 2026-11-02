'use client';

import React from 'react';
import {
  ArrowUpRight,
  Home,
  SunMedium,
  Box,
  Wrench,
  Sprout,
  TreePine,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/plants';

interface CategoriesSectionProps {
  onSelectCategory?: (categoryId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  SunMedium,
  Box,
  Wrench,
  Sprout,
  TreePine,
};

export default function CategoriesSection({
  onSelectCategory,
}: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-[#f8fbf9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6a4f] uppercase tracking-widest bg-[#d8f3dc] px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collections
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#143628] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-[#406850] max-w-xl">
              From low-maintenance indoor champions to handcrafted terracotta
              pots and heirloom seeds, find everything you need to grow your sanctuary.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="#products"
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1b4332] hover:text-[#2d6a4f] transition-colors group"
            >
              <span>View All 200+ Products</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Categories Grid (2 cols mobile, 3 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = iconMap[cat.iconName] || Sprout;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.id);
                  }
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-[#d8e2dc] hover:-translate-y-1.5"
              >
                {/* Background Image with Zoom */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081c15]/95 via-[#081c15]/50 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1b4332] shadow-md group-hover:bg-[#52b788] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {cat.itemCount}
                  </span>
                </div>

                {/* Arrow Action Circle */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#143628] transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-[#b7e4c7] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#74c69d] group-hover:text-white">
                    <span>Explore Collection</span>
                    <span className="ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      &rarr;
                    </span>
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
