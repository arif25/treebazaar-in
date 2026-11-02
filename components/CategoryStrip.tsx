'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryStripProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80',
    deal: 'Up to 35% Off',
    isSpecial: true,
  },
  {
    id: 'outdoor',
    name: 'Outdoor Plants',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80',
    deal: 'Starting ₹199',
    isSpecial: false,
  },
  {
    id: 'flowering',
    name: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=300&q=80',
    deal: 'Min. 20% Off',
    isSpecial: false,
  },
  {
    id: 'airpurifying',
    name: 'Air Purifiers',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=300&q=80',
    deal: 'NASA Certified',
    isSpecial: true,
  },
  {
    id: 'luckybamboo',
    name: 'Lucky Bamboo',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=300&q=80',
    deal: 'From ₹189',
    isSpecial: false,
  },
  {
    id: 'pots',
    name: 'Pots & Planters',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80',
    deal: 'Artisanal Glaze',
    isSpecial: false,
  },
  {
    id: 'tools',
    name: 'Gardening Tools',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&q=80',
    deal: 'Up to 30% Off',
    isSpecial: false,
  },
  {
    id: 'fertilizer',
    name: 'Soil & Nutrition',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80',
    deal: '100% Organic',
    isSpecial: false,
  },
];

export default function CategoryStrip({ onSelectCategory }: CategoryStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId === 'airpurifying' || catId === 'luckybamboo' ? 'indoor' : catId);
    }
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-6 sm:py-8 border-y border-[#E5EEE5] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF72] animate-ping" />
            <h3 className="text-sm sm:text-base font-bold text-[#244C38] tracking-tight">
              Explore Top Botanical Categories
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 rounded-lg bg-[#FAF9F5] border border-[#E5EEE5] hover:border-[#278653] hover:bg-[#EAF6EC] text-[#244C38] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 rounded-lg bg-[#FAF9F5] border border-[#E5EEE5] hover:border-[#278653] hover:bg-[#EAF6EC] text-[#244C38] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 scroll-smooth"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -4 }}
              onClick={() => handleClick(cat.id)}
              className="flex flex-col items-center group cursor-pointer shrink-0 min-w-[95px] sm:min-w-[115px]"
            >
              {/* Circular gradient image container */}
              <div className="p-1 rounded-full bg-gradient-to-tr from-emerald-400/40 via-teal-300/30 to-emerald-500/50 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-white p-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-500"
                  />
                </div>
              </div>

              <span className="mt-2.5 text-xs font-bold text-[#244C38] group-hover:text-[#278653] text-center leading-tight">
                {cat.name}
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border ${
                  cat.isSpecial
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-[#EAF6EC] text-[#278653] border-[#80C995]/40'
                }`}
              >
                {cat.deal}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
