'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Droplet,
  PackageOpen,
  MessageCircle,
  Sparkles,
  ChevronDown,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACCORDION_DATA: AccordionItem[] = [
  {
    id: 'unboxing',
    question: 'How should I care for my plant immediately after delivery?',
    answer:
      'Gently unbox your plant and carefully remove the breathable transit sleeve. Place it in a spot with bright, indirect light away from direct AC draft or harsh sun. Let the plant rest for 24-48 hours before watering or repotting, as plants need a short adjustment period after journeying.',
    tip: 'Never repot on Day 1. Wait at least 7 to 10 days before shifting into new decorative planters.',
    icon: PackageOpen,
  },
  {
    id: 'watering',
    question: 'How often should I water my indoor plants?',
    answer:
      'Always follow the 2-Inch Finger-Dip Test instead of rigid weekly routines. Insert your index finger 2 inches into the topsoil. If it feels completely dry, give it a deep, thorough watering until water drains out from the bottom holes. Empty any stagnant water gathered in the bottom drip tray within 15 minutes to avoid root suffocation.',
    tip: 'Under-watering is much easier to fix than over-watering. When in doubt, wait one more day!',
    icon: Droplet,
  },
  {
    id: 'light',
    question: 'What is the ideal sunlight placement for tropical houseplants?',
    answer:
      'Most tropical greens (Monstera, Peace Lily, Philodendron, ZZ, and Snake Plants) thrive best in bright, filtered light—such as 3 to 5 feet away from an east or north-facing window, or behind a sheer curtain. Avoid intense noon direct sunlight, which can scorch fragile foliage with brown sunburn spots.',
    tip: 'Rotate your pot by 90 degrees every week so all foliage grows evenly toward the light source.',
    icon: Sun,
  },
  {
    id: 'soil',
    question: 'When and how should I fertilize and feed my indoor greens?',
    answer:
      'Feed your plants during their active growth phases (spring and monsoon in India) with gentle organic liquid seaweed extract or a handful of well-rotted vermicompost every 3 to 4 weeks. Avoid chemical fertilizers during winter dormancy when plant metabolism slows down.',
    tip: 'Always water soil thoroughly before applying liquid nutrition to protect delicate root hairs.',
    icon: Sparkles,
  },
  {
    id: 'doctor',
    question: 'What if my plant arrives damaged or leaves turn yellow?',
    answer:
      'Every TreeBazaar order is backed by our 7-Day Live Arrival Guarantee! Simply snap a photo of the leaves or pot and send it to our WhatsApp Horticulturist Hotline. Our certified botanists will diagnose the issue and arrange a free replacement or customized care protocol within 2 hours.',
    tip: 'Free lifetime botanist guidance is included with every single plant purchase!',
    icon: MessageCircle,
  },
];

export default function PlantCareGuide() {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('unboxing');

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  const steps = [
    {
      number: '01',
      title: 'Unbox & Breathe',
      description:
        'Gently unwrap the breathable transit sleeve. Place your plant in bright indirect light for 48 hours to help it acclimate to your room climate.',
      icon: PackageOpen,
      tag: 'Day 1 to 2',
      isCoral: false,
    },
    {
      number: '02',
      title: 'The Finger-Dip Test',
      description:
        'Avoid rigid watering schedules. Insert your index finger 2 inches into the soil. If it feels dry to touch, give it a thorough, deep drink.',
      icon: Droplet,
      tag: 'Golden Rule',
      isCoral: true,
    },
    {
      number: '03',
      title: 'Gentle Filtered Sun',
      description:
        'Most tropical indoor greens thrive in bright, filtered light (near sheer curtains) rather than harsh, direct noon scorching rays.',
      icon: Sun,
      tag: 'Light Needs',
      isCoral: false,
    },
  ];

  return (
    <section id="plant-care" className="py-14 lg:py-20 bg-[#EAF6EC] text-[#244C38] relative overflow-hidden border-b border-[#E5EEE5]">
      {/* Decorative fresh botanical ambient accents */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-[#80C995]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-white/60 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#278653] uppercase tracking-widest bg-white border border-[#80C995]/40 px-3.5 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4CAF72]" /> Plant Parenting 101
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#244C38]">
            Green Living Made Effortless
          </h2>
          <p className="text-sm sm:text-base text-[#718078] leading-relaxed">
            Worried about keeping your plants thriving? Every TreeBazaar order arrives with
            shockproof breathable packaging and lifetime WhatsApp horticulturist guidance.
          </p>
        </div>

        {/* 3 Core Steps Grid: Pure White Cards with Fresh Green Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EEE5] hover:border-[#80C995] shadow-xs hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF6EC] border border-[#80C995]/30 flex items-center justify-center text-[#278653] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#4CAF72]" />
                    </div>
                    <span className="text-3xl font-black text-[#80C995]/40 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <div
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2.5 border ${
                      step.isCoral
                        ? 'bg-[#FCEEEE] text-[#E85D5D] border-[#E85D5D]/20'
                        : 'bg-[#EAF6EC] text-[#278653] border-[#80C995]/40'
                    }`}
                  >
                    {step.tag}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#244C38] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Accordion Section for Detailed Plant Care Guides */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5EEE5] shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5EEE5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF6EC] text-[#278653] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5 text-[#278653]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#244C38]">
                  Botanical Care Knowledge Base
                </h3>
                <p className="text-xs text-[#718078]">
                  Frequently asked questions answered by certified nursery botanists
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-[#278653] bg-[#EAF6EC] px-3 py-1 rounded-full border border-[#80C995]/40 self-start sm:self-auto">
              5 Essential Care Chapters
            </span>
          </div>

          <div className="divide-y divide-[#E5EEE5]">
            {ACCORDION_DATA.map((item) => {
              const isOpen = openAccordionId === item.id;
              const Icon = item.icon;

              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between text-left gap-4 py-2 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#278653] text-white shadow-xs'
                            : 'bg-[#FAF9F5] text-[#278653] border border-[#E5EEE5] group-hover:bg-[#EAF6EC]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-[#244C38] group-hover:text-[#278653] transition-colors">
                        {item.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-[#718078] group-hover:text-[#244C38]"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pl-12 pr-4 space-y-3">
                          <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                            {item.answer}
                          </p>

                          <div className="flex items-start gap-2 bg-[#F3FAF4] p-3 rounded-xl border border-[#80C995]/40 text-xs text-[#244C38]">
                            <CheckCircle2 className="w-4 h-4 text-[#278653] shrink-0 mt-0.5" />
                            <span>
                              <strong>Pro Tip:</strong> {item.tip}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Plant Doctor Banner in Crisp White with Fresh Green & Coral Accents */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#80C995]/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF6EC] text-[#278653] flex items-center justify-center shrink-0 border border-[#80C995]/40">
              <MessageCircle className="w-7 h-7 text-[#4CAF72]" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h4 className="text-lg font-bold text-[#244C38]">
                  Have a sick plant? Free WhatsApp Plant Doctor
                </h4>
                <span className="hidden sm:inline text-[10px] font-bold bg-[#FCEEEE] text-[#E85D5D] px-2 py-0.5 rounded-full border border-[#E85D5D]/20">
                  Instant Help
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#718078] mt-0.5">
                Send a leaf photo anytime. Our in-house botanists diagnose issues within 2 hours.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#278653] to-[#4CAF72] hover:from-[#1d6b42] hover:to-[#278653] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer border border-[#4CAF72]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat With Plant Doctor</span>
          </a>
        </div>
      </div>
    </section>
  );
}
