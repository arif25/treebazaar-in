'use client';

import React from 'react';
import {
  ShieldCheck,
  Truck,
  ChevronUp,
  ExternalLink,
  MessageCircle,
  Globe,
} from 'lucide-react';
import TreeBazaarLogo from '@/components/TreeBazaarLogo';
import { openAmazonPurchase } from '@/config/shopConfig';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-[#244C38] text-white border-t border-[#80C995]/30 font-sans">
      {/* Tier 1: Amazon-style Back to Top Bar */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#1e4130] hover:bg-[#278653] active:bg-[#1a3829] py-3.5 text-center text-xs font-semibold text-[#EAF6EC] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-b border-white/10"
      >
        <span>Back to top</span>
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Tier 2: Amazon-style 4-Column Navigation Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-white/15 text-xs">
          {/* Col 1: Get to Know Us */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Get to Know Us</h4>
            <ul className="space-y-2 text-[#EAF6EC]/85">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About TreeBazaar
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Our Nursery Acclimation
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Zero-Damage Transit Armor
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Green Living Mission
                </a>
              </li>
              <li>
                <a href="#plant-care" className="hover:text-white transition-colors">
                  TreeBazaar Green Club
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Connect with Us */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Connect with Us</h4>
            <ul className="space-y-2 text-[#EAF6EC]/85">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                  <span>YouTube Guides</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#80C995] font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Plant Doctor</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Make Money with Us */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Make Money with Us</h4>
            <ul className="space-y-2 text-[#EAF6EC]/85">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Partner Nursery Program
                </a>
              </li>
              <li>
                <button
                  onClick={() => openAmazonPurchase()}
                  className="hover:text-white transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>TreeBazaar on Amazon</span>
                  <ExternalLink className="w-3 h-3 text-[#80C995]" />
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Corporate & Bulk Gifting
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Landscape Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Let Us Help You */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Let Us Help You</h4>
            <ul className="space-y-2 text-[#EAF6EC]/85">
              <li>
                <button
                  onClick={() => openAmazonPurchase()}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Your Amazon Orders
                </button>
              </li>
              <li>
                <a href="#plant-care" className="hover:text-white transition-colors">
                  7-Day Freshness Guarantee
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Safe Transit Cartons
                </a>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Free Horticulturist Help
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Privacy Policy & Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tier 3: Amazon-style Brand & Country Row */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-6 border-b border-white/15">
          <TreeBazaarLogo variant="dark" size="md" />

          <div className="flex items-center gap-3 text-xs text-[#EAF6EC]">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-[#1e4130]">
              <Globe className="w-3.5 h-3.5 text-[#80C995]" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-[#1e4130]">
              <span>🇮🇳</span>
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Tier 4: Bottom Legal & Amazon Fulfillment Notice */}
        <div className="pt-8 text-center space-y-3 text-xs text-[#EAF6EC]/75">
          <p className="max-w-2xl mx-auto text-[11px] leading-relaxed">
            TreeBazaar is India&apos;s trusted online plant nursery. All customer orders are safely fulfilled through our verified Amazon.in Storefront with custom shockproof ventilated packaging and 7-day live plant guarantee.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#EAF6EC]/90">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#80C995]" /> 100% Live Plant Guarantee
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#80C995]" /> Fulfilled via Amazon Prime
            </span>
            <span>•</span>
            <span>© 2026 TreeBazaar.in. All rights reserved.</span>
          </div>

          <p className="text-[10px] text-[#80C995]">
            Brand Identity: TreeBazaar – Bring Nature Closer to Your Home.
          </p>
        </div>
      </div>
    </footer>
  );
}
