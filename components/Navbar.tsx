'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  PhoneCall,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PRODUCTS_DATA } from '@/data/plants';
import { Product } from '@/types';
import TreeBazaarLogo from '@/components/TreeBazaarLogo';
import { openAmazonPurchase } from '@/config/shopConfig';
import LocationModal from '@/components/LocationModal';

interface NavbarProps {
  cartCount?: number;
  cartTotal?: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
}

const SECONDARY_NAV_ITEMS = [
  { id: 'all', label: 'All Categories' },
  { id: 'deals', label: 'Today\'s Deals', isHot: true },
  { id: 'bestsellers', label: 'Best Sellers' },
  { id: 'indoor', label: 'Indoor Plants' },
  { id: 'outdoor', label: 'Outdoor Plants' },
  { id: 'flowering', label: 'Flowering Plants' },
  { id: 'airpurifying', label: 'Air Purifying' },
  { id: 'luckybamboo', label: 'Lucky Bamboo' },
  { id: 'pots', label: 'Pots & Planters' },
  { id: 'supplies', label: 'Gardening Supplies' },
  { id: 'care', label: 'Plant Care' },
];

export default function Navbar({
  wishlistCount,
  onOpenCart,
  onSelectProduct,
  onSelectCategory,
}: NavbarProps) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Filter search suggestions
  const searchResults = searchQuery.trim()
    ? PRODUCTS_DATA.filter((p) => {
      const matchesCategory =
        searchCategory === 'all' || p.category === searchCategory;
      const matchesText =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.botanicalName &&
          p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesText;
    }).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (catId: string) => {
    if (catId === 'deals') {
      const el = document.getElementById('today-deals');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (catId === 'care') {
      const el = document.getElementById('plant-care');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (onSelectCategory) {
        onSelectCategory(catId);
      }
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setSideDrawerOpen(false);
  };

  const handleProductSelect = (product: Product) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      openAmazonPurchase(product);
    }
  };

  return (
    <>
      {/* 0. Animated Marquee Ticker for Offers & Free Shipping */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white text-[11px] sm:text-xs py-2 overflow-hidden border-b border-emerald-950/40 relative z-50">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              ⚡ Flash Deal
            </span>
            <span>🎉 Monsoon Special: Flat 15% OFF with code <strong className="text-emerald-200 font-bold underline decoration-dotted">PLANTJOY</strong> | Free Shipping over ₹999!</span>
          </div>
          <span className="text-emerald-400">•</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>🌿 10,000+ Happy Plant Parents across India</span>
          </div>
          <span className="text-emerald-400">•</span>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>⚡ Lightning Fast Amazon Prime 1-2 Day Delivery Across 500+ Cities</span>
          </div>
          <span className="text-emerald-400">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>⭐ 100% Guaranteed Healthy Live Arrival or Free Replacement</span>
          </div>
          <span className="text-emerald-400">•</span>
          {/* Continuous looping set */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              ⚡ Flash Deal
            </span>
            <span>🎉 Monsoon Special: Flat 15% OFF with code <strong className="text-emerald-200 font-bold underline decoration-dotted">PLANTJOY</strong> | Free Shipping over ₹999!</span>
          </div>
          <span className="text-emerald-400">•</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>🌿 10,000+ Happy Plant Parents across India</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full glass-nav shadow-xs border-b border-[#E5EEE5] font-sans">
        {/* 1. Main Navigation Belt: Crisp Glassmorphic Belt with Botanical Accents */}
        <div className="text-[#244C38] px-3 sm:px-6 py-2.5 sm:py-3 border-b border-[#E5EEE5]/80">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="lg:hidden p-1.5 text-[#244C38] hover:bg-[#EAF6EC] rounded-lg transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Left: Official TreeBazaar Logo (Light variant for crisp white background) */}
            <div className="shrink-0 flex items-center pr-1 sm:pr-2">
              <TreeBazaarLogo variant="light" size="md" />
            </div>

            {/* Delivery Location Area (Amazon-style 'Deliver to Sayed / Kolkata 700001') */}
            <button
              onClick={() => setLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#EAF6EC] transition-all text-left cursor-pointer shrink-0 border border-transparent hover:border-[#80C995]/40"
              title="Change delivery location"
            >
              {/* <MapPin className="w-4 h-4 text-[#4CAF72] shrink-0 mt-1" /> */}
              <div className="text-xs leading-tight">
                <span className="block text-[11px] text-[#718078] font-normal">
                  {/* Deliver to Sayed */}
                </span>
                <span className="font-bold text-[#244C38] flex items-center gap-0.5">
                  {/* {currentLocation} */}
                </span>
              </div>
            </button>

            {/* Center: Glowing Search Bar with Category Dropdown & Emerald Gradient Search Button */}
            <div ref={searchRef} className="flex-1 max-w-2xl relative mx-1 sm:mx-2">
              <div className="flex w-full items-center rounded-xl overflow-hidden bg-[#FAF9F5]/90 border border-[#E5EEE5] focus-within:border-[#278653] focus-within:ring-4 focus-within:ring-emerald-500/20 focus-within:shadow-md transition-all duration-200">
                {/* Category selector dropdown */}
                <div className="relative shrink-0 hidden sm:block">
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="h-10 pl-3.5 pr-7 text-xs font-semibold text-[#244C38] bg-[#EAF6EC] border-r border-[#E5EEE5] focus:outline-hidden cursor-pointer appearance-none hover:bg-[#d8eedc] transition-colors"
                  >
                    <option value="all">All</option>
                    <option value="indoor">Indoor Plants</option>
                    <option value="outdoor">Outdoor Plants</option>
                    <option value="pots">Pots & Planters</option>
                    <option value="seeds">Seeds & Bulbs</option>
                    <option value="tools">Gardening Tools</option>
                    <option value="fertilizer">Soil & Nutrition</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#718078] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Input box */}
                <input
                  type="text"
                  placeholder="Search TreeBazaar indoor plants, ceramic pots, organic seeds..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm text-[#244C38] placeholder-[#718078] bg-transparent focus:outline-hidden"
                />

                {/* Clear button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 mr-1 text-[#718078] hover:text-[#244C38]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Emerald Gradient Search Button */}
                <button
                  onClick={() => {
                    if (searchResults.length > 0) {
                      handleProductSelect(searchResults[0]);
                    }
                  }}
                  className="h-10 px-4.5 bg-gradient-to-r from-[#278653] to-[#1d6b42] hover:from-[#1d6b42] hover:to-[#165333] text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Instant Search Suggestions Dropdown with Framer Motion Animation */}
              {isSearchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E5EEE5] z-50 overflow-hidden divide-y divide-[#E5EEE5] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2.5 bg-[#F3FAF4] flex items-center justify-between text-xs font-semibold text-[#718078]">
                    <span>Matching Plants ({searchResults.length})</span>
                    <span className="text-[11px] text-[#278653] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#4CAF72]" /> Dispatched via Amazon
                    </span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="flex items-center gap-3 p-3 hover:bg-[#EAF6EC] transition-colors cursor-pointer group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E5EEE5] group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#244C38] truncate group-hover:text-[#278653]">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-[#718078] truncate">
                              {product.botanicalName || product.categoryLabel}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-extrabold text-[#244C38]">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="block text-[10px] text-[#718078] line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-[#718078]">
                      No plants found matching &ldquo;{searchQuery}&rdquo;. Try &ldquo;Monstera&rdquo;, &ldquo;Bamboo&rdquo;, or &ldquo;Pot&rdquo;.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Side Actions: Language, Account, Wishlist, Cart */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Language flag */}
              <div className="hidden lg:flex items-center gap-1 p-2 rounded-xl hover:bg-[#EAF6EC] transition-all text-xs font-semibold text-[#244C38] cursor-pointer">
                <span>🇮🇳</span>
                <span>EN</span>
                <ChevronDown className="w-3 h-3 text-[#718078]" />
              </div>

              {/* Account & Lists */}
              <div ref={accountRef} className="relative hidden md:block">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex flex-col items-start p-2 rounded-xl hover:bg-[#EAF6EC] transition-all text-left cursor-pointer"
                >
                  <span className="text-[10px] text-[#718078] leading-tight">
                    Hello, Sign in
                  </span>
                  <span className="text-xs font-bold text-[#244C38] flex items-center gap-0.5 leading-tight">
                    Account & Lists <ChevronDown className="w-3 h-3 text-[#718078]" />
                  </span>
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E5EEE5] p-4 z-50 animate-in fade-in slide-in-from-top-1 text-[#244C38]">
                    <div className="text-center pb-3 border-b border-[#E5EEE5]">
                      <button
                        onClick={() => openAmazonPurchase()}
                        className="w-full py-2 bg-[#4CAF72] hover:bg-[#278653] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                      >
                        Sign in to Amazon Store
                      </button>
                      <p className="text-[11px] text-[#718078] mt-1.5">
                        New customer? <span className="text-[#278653] font-semibold">Start here</span>
                      </p>
                    </div>

                    <div className="pt-3 space-y-2 text-xs">
                      <p className="font-bold text-[#244C38] text-[11px] uppercase tracking-wider">
                        Your Plant Account
                      </p>
                      <button
                        onClick={() => openAmazonPurchase()}
                        className="w-full text-left py-1 hover:text-[#278653] flex items-center justify-between"
                      >
                        <span>Your Amazon Orders</span>
                        <ExternalLink className="w-3 h-3 text-[#718078]" />
                      </button>
                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          const el = document.getElementById('plant-care');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left py-1 hover:text-[#278653]"
                      >
                        WhatsApp Plant Doctor
                      </button>
                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          const el = document.getElementById('trust-bar');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left py-1 hover:text-[#278653]"
                      >
                        7-Day Freshness Guarantee
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Button with Coral Red Counter */}
              <button
                onClick={() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1 p-2 rounded-xl hover:bg-[#EAF6EC] transition-all cursor-pointer relative"
                title="Your Wishlist"
              >
                <Heart className="w-5 h-5 text-[#244C38]" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.25 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>

              {/* Amazon-style Cart Button with Animated Badge */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-[#EAF6EC] hover:bg-[#d5eed9] text-[#244C38] border border-[#80C995]/50 transition-all cursor-pointer group"
                title="Amazon Shopping Cart"
              >
                <div className="relative flex items-center">
                  <ShoppingCart className="w-5 h-5 text-[#244C38] group-hover:scale-110 transition-transform" />
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, repeatDelay: 6, duration: 0.6 }}
                    className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#278653] to-[#4CAF72] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-xs"
                  >
                    0
                  </motion.span>
                </div>
                <div className="hidden sm:block text-left text-xs leading-none">
                  <span className="block text-[10px] text-[#718078] font-medium">Cart</span>
                  <span className="font-bold text-[#244C38]">₹0</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Secondary Sub-Navigation Belt: Soft Pale Mint (#F3FAF4) Background */}
        <div className="bg-[#F3FAF4] text-[#244C38] text-xs px-3 sm:px-6 py-2 border-t border-[#E5EEE5]">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            {/* 'All' Hamburger Menu */}
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5EEE5] hover:border-[#4CAF72] hover:text-[#278653] font-bold transition-all shrink-0 cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>All</span>
            </button>

            {/* Horizontal Navigation Items */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 overflow-x-auto no-scrollbar">
              {SECONDARY_NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="px-2.5 py-1 rounded-lg hover:bg-white hover:text-[#278653] text-xs text-[#244C38] font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  {item.isHot && (
                    <span className="text-[9px] font-bold bg-[#FCEEEE] text-[#E85D5D] px-1.5 py-0.2 rounded-full border border-[#E85D5D]/30 uppercase">
                      Sale
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Right: Fulfillment Assurance */}
            <div className="hidden xl:flex items-center gap-2 text-[11px] text-[#278653] font-semibold shrink-0 pl-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF72]" />
              <span>100% Live Plant Guarantee • Amazon Prime Delivery</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Amazon-Style Full Side Navigation Drawer */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSideDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-full bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer User Header in Fresh Green */}
            <div className="p-4 bg-[#4CAF72] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">Hello, Sign In</span>
              </div>
              <button
                onClick={() => setSideDrawerOpen(false)}
                className="p-1 rounded-lg text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-[#244C38]">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#718078] px-2 mb-2">
                  Trending on TreeBazaar
                </h4>
                <button
                  onClick={() => handleCategoryClick('deals')}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#EAF6EC] hover:text-[#278653] font-medium flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Today&apos;s Deals & Best Sellers</span>
                    <span className="text-[9px] font-bold bg-[#FCEEEE] text-[#E85D5D] px-1.5 py-0.2 rounded-full border border-[#E85D5D]/30">
                      Offer
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#718078]" />
                </button>
                <button
                  onClick={() => handleCategoryClick('indoor')}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#EAF6EC] hover:text-[#278653] font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>Popular Indoor Air Purifiers</span>
                  <ChevronRight className="w-4 h-4 text-[#718078]" />
                </button>
              </div>

              <div className="border-t border-[#E5EEE5] pt-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#718078] px-2 mb-2">
                  Shop by Department
                </h4>
                {SECONDARY_NAV_ITEMS.filter((i) => i.id !== 'all' && i.id !== 'deals' && i.id !== 'care').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryClick(item.id)}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#EAF6EC] hover:text-[#278653] font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#718078]" />
                  </button>
                ))}
              </div>

              <div className="border-t border-[#E5EEE5] pt-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#718078] px-2 mb-2">
                  Customer Assistance
                </h4>
                <button
                  onClick={() => handleCategoryClick('care')}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#EAF6EC] hover:text-[#278653] font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>Plant Parenting & Doctor</span>
                  <ChevronRight className="w-4 h-4 text-[#718078]" />
                </button>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#EAF6EC] hover:text-[#278653] font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>WhatsApp Care Helpline</span>
                  <PhoneCall className="w-3.5 h-3.5 text-[#4CAF72]" />
                </a>
              </div>
            </div>

            {/* Bottom Official Amazon Store Button */}
            <div className="p-4 border-t border-[#E5EEE5] bg-[#F3FAF4]">
              <button
                onClick={() => {
                  setSideDrawerOpen(false);
                  openAmazonPurchase();
                }}
                className="w-full py-2.5 bg-[#4CAF72] hover:bg-[#278653] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Visit TreeBazaar on Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />
    </>
  );
}
