'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import AmazonGatewayCards from '@/components/AmazonGatewayCards';
import TrustBar from '@/components/TrustBar';
import CategoryStrip from '@/components/CategoryStrip';
import FlashDealsSection from '@/components/FlashDealsSection';
import AmazonProductCarousel from '@/components/AmazonProductCarousel';
import AmazonGatewayCardsRow2 from '@/components/AmazonGatewayCardsRow2';
import FeaturedProducts from '@/components/FeaturedProducts';
import PlantCareGuide from '@/components/PlantCareGuide';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import Toast from '@/components/Toast';
import { Product, CartItem } from '@/types';
import { PRODUCTS_DATA } from '@/data/plants';
import { SHOP_CONFIG, openAmazonPurchase } from '@/config/shopConfig';

export default function Home() {
  // Amazon Shopping Integration Model:
  // Local cart count and subtotal are fixed at 0.
  // Local cart state is kept empty so no fake checkout is simulated.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-2']);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Quick view modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // When purchase intent is triggered in Amazon mode
  const handlePurchaseAction = (product: Product) => {
    if (SHOP_CONFIG.shoppingMode === 'amazon') {
      openAmazonPurchase(product);
      showToast(`Redirecting to TreeBazaar on Amazon for ${product.name} 🌱`);
    } else {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      showToast(`Added ${product.name} to cart 🌱`);
    }
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your plant wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your plant wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  // Recommendation carousel products (items 4 to 12)
  const recommendedProducts = PRODUCTS_DATA.slice(4, 13);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#244C38] antialiased selection:bg-[#EAF6EC] selection:text-[#278653]">
      {/* 1. Amazon-Inspired Header with Dual Nav Belt & Location Selector */}
      <Navbar
        cartCount={0}
        cartTotal={0}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToSection('products');
        }}
      />

      {/* Main Content Area following Amazon.in Homepage Structure */}
      <main className="flex-1 space-y-0">
        {/* A. Promotional Hero Carousel (Full-width with Left/Right Arrows & Bottom Fade) */}
        <HeroCarousel
          onExplorePlants={() => handleScrollToSection('products')}
          onShopDeals={() => handleScrollToSection('today-deals')}
          onSelectProduct={(product) => setQuickViewProduct(product)}
        />

        {/* B. Amazon-Style Gateway Cards Row 1 (Overlapping bottom of hero banner) */}
        <AmazonGatewayCards
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollToSection('products');
          }}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* C. Trust Benefits Bar (Amazon Prime, Freshness Guarantee, Plant Doctor) */}
        <TrustBar />

        {/* D. Category Navigation Horizontal Strip (Circular Gradient Image Cards) */}
        <CategoryStrip
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollToSection('products');
          }}
        />

        {/* E. Dedicated Flash Sales & Countdown Timer Section (Today's Green Deals) */}
        <FlashDealsSection
          onQuickView={(p) => setQuickViewProduct(p)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handlePurchaseAction}
        />

        {/* F. Gateway Shopping Cards Row 2 (Pots, Soil, Balcony Kits, Plant Doctor) */}
        <AmazonGatewayCardsRow2
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollToSection('products');
          }}
        />

        {/* G. Horizontal Product Carousel 2: Related to Items You've Viewed / Popular Houseplants */}
        <AmazonProductCarousel
          title="Customers' Most-Loved Houseplants"
          subtitle="Tested air-purifying & easy-care varieties for Indian homes"
          seeAllLinkText="Explore all plants"
          onSeeAll={() => handleScrollToSection('products')}
          products={recommendedProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* H. Comprehensive Product Catalog Grid with Category Filter Tabs */}
        <FeaturedProducts
          onQuickView={(product) => setQuickViewProduct(product)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handlePurchaseAction}
        />

        {/* I. Brand Story & Plant Care Guide (Green Living Made Effortless) */}
        <PlantCareGuide />

        {/* J. Verified Customer Reviews & Testimonials */}
        <TestimonialsSection />

        {/* K. Green Club Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* L. Amazon-Style Multi-Tier Footer */}
      <Footer />

      {/* Amazon Shopping Storefront Drawer (Explains Amazon fulfillment, Cart=0, Continues to Amazon) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handlePurchaseAction}
      />

      {/* Notification Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
