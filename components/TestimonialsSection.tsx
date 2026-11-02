'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Users,
} from 'lucide-react';
import { REVIEWS_DATA } from '@/data/plants';

const ENHANCED_REVIEWS = [
  {
    ...REVIEWS_DATA[0],
    plantPhoto: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    verifiedCity: 'Indiranagar, Bengaluru',
  },
  {
    ...REVIEWS_DATA[1],
    plantPhoto: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=500&q=80',
    verifiedCity: 'Bandra West, Mumbai',
  },
  {
    ...REVIEWS_DATA[2],
    plantPhoto: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=80',
    verifiedCity: 'Kalyani Nagar, Pune',
  },
];

const TRUST_METRICS = [
  {
    icon: Users,
    stat: '50,000+',
    label: 'Verified Plant Parents',
    sub: 'Across 500+ Indian Cities',
  },
  {
    icon: Star,
    stat: '4.9 / 5.0',
    label: 'Amazon Storefront Rating',
    sub: 'Based on 2,400+ Reviews',
  },
  {
    icon: ShieldCheck,
    stat: '99.4%',
    label: 'Alive & Fresh Arrival Rate',
    sub: 'With Shockproof Cartons',
  },
  {
    icon: HeartHandshake,
    stat: '24/7 Free',
    label: 'WhatsApp Plant Doctor',
    sub: 'Lifetime Botanist Care',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 lg:py-22 bg-white border-b border-[#E5EEE5] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-14">
          {TRUST_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#FAF9F5] p-5 sm:p-6 rounded-3xl border border-[#E5EEE5] hover:border-[#4CAF72] transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#EAF6EC] text-[#278653] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#4CAF72]" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#244C38] tracking-tight block">
                    {metric.stat}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#244C38] block mt-0.5">
                    {metric.label}
                  </span>
                  <span className="text-[11px] text-[#718078] block">
                    {metric.sub}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#278653] uppercase tracking-widest bg-[#EAF6EC] px-3.5 py-1 rounded-full border border-[#80C995]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#4CAF72]" /> Verified Amazon Buyer Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#244C38] tracking-tight">
            Loved by Green Thumbs Nationwide
          </h2>
          <p className="text-sm sm:text-base text-[#718078]">
            Real unboxing photos and genuine experiences from apartment dwellers, balcony gardeners, and office plant lovers.
          </p>
        </div>

        {/* Customer Reviews Grid with Plant Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {ENHANCED_REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-[#FAF9F5] rounded-3xl overflow-hidden border border-[#E5EEE5] hover:border-[#80C995] shadow-xs hover:shadow-xl hover:shadow-emerald-950/10 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* High-Resolution Plant Photo by Customer */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-emerald-950/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.plantPhoto}
                  alt={review.plantPurchased}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#244C38] flex items-center gap-1 shadow-xs border border-[#E5EEE5]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#278653]" />
                  <span>Verified Buyer Photo</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white flex items-center gap-1">
                  <span>{review.verifiedCity}</span>
                </div>
              </div>

              {/* Review Text Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-500 gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#718078] font-medium">{review.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#244C38] leading-snug group-hover:text-[#278653] transition-colors">
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Author Info & Verified Amazon Badge */}
                <div className="pt-4 border-t border-[#E5EEE5]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover border border-[#80C995]/40"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#244C38] flex items-center gap-1">
                          <span>{review.author}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#278653]" />
                        </h4>
                        <span className="text-[10px] text-[#278653] font-semibold flex items-center gap-1">
                          Amazon Verified Purchase
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-[#278653] bg-[#EAF6EC] px-2.5 py-1 rounded-full border border-[#80C995]/30">
                      {review.plantPurchased.split('+')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
