'use client';

import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { CartItem } from '@/types';
import { openAmazonPurchase } from '@/config/shopConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // Kept for backward compatibility and future internal cart mode
  cartItems?: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  const handleContinueToAmazon = () => {
    openAmazonPurchase();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#E5EEE5]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5EEE5] flex items-center justify-between bg-[#FAF9F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EAF6EC] text-[#244C38] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 text-[#278653]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#244C38]">
                  Amazon Store Shopping
                </h3>
                <p className="text-[11px] text-[#718078]">
                  TreeBazaar Official Storefront
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EAF6EC] text-[#718078] hover:text-[#244C38] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Amazon Shopping Notice Card (Soft Mint botanical card) */}
            <div className="bg-[#EAF6EC] text-[#244C38] rounded-2xl p-5 border border-[#80C995]/60 shadow-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#4CAF72] text-white">
                  Amazon Fulfilled
                </span>
                <span className="text-xs text-[#278653] font-semibold">
                  Prime Delivery Active
                </span>
              </div>

              <h4 className="text-base font-bold text-[#244C38] leading-snug">
                Purchases Are Completed on Amazon
              </h4>

              <p className="text-xs text-[#718078] leading-relaxed">
                To guarantee lightning-fast delivery and safe payment processing,
                TreeBazaar currently fulfills all customer plant orders through our
                verified Amazon.in Storefront.
              </p>
            </div>

            {/* Zero balance indicator required for temporary Amazon model */}
            <div className="bg-[#FAF9F5] border border-[#E5EEE5] rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#718078]">Local Cart Items</span>
                <span className="font-bold text-[#244C38]">0 items</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#718078]">Local Cart Subtotal</span>
                <span className="font-bold text-[#244C38]">₹0</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5EEE5]">
                <span className="font-bold text-[#244C38]">Order Mode</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#278653] bg-[#EAF6EC] px-2 py-0.5 rounded-full border border-[#80C995]/40">
                  <CheckCircle2 className="w-3 h-3 text-[#4CAF72]" />
                  Amazon Storefront Redirection
                </span>
              </div>
            </div>

            {/* Benefits of Amazon Fulfillment */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-[#244C38] uppercase tracking-wider">
                Why Buy on Our Amazon Store?
              </h5>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E5EEE5]">
                  <Truck className="w-4 h-4 text-[#4CAF72] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#244C38] block">
                      Amazon Prime Fast Delivery
                    </span>
                    <span className="text-[#718078] text-[11px]">
                      Enjoy 1-day or 2-day delivery across 500+ Indian cities.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E5EEE5]">
                  <ShieldCheck className="w-4 h-4 text-[#4CAF72] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#244C38] block">
                      TreeBazaar 7-Day Live Guarantee
                    </span>
                    <span className="text-[#718078] text-[11px]">
                      Shockproof transit packaging ensures healthy arrival or full replacement.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E5EEE5]">
                  <Lock className="w-4 h-4 text-[#4CAF72] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#244C38] block">
                      100% Secure Payment Protection
                    </span>
                    <span className="text-[#718078] text-[11px]">
                      Pay securely with UPI, Credit/Debit cards, NetBanking or Cash on Delivery.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plant Care Assurance */}
            <div className="p-3.5 rounded-xl bg-[#F3FAF4] border border-[#80C995]/40 text-xs text-[#244C38] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4CAF72] shrink-0" />
              <span>
                Every Amazon order includes our free lifetime WhatsApp Plant Doctor consultation!
              </span>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 sm:p-5 border-t border-[#E5EEE5] bg-[#FAF9F5] space-y-2.5">
            <button
              onClick={handleContinueToAmazon}
              className="w-full py-3.5 px-4 rounded-xl bg-[#4CAF72] hover:bg-[#278653] active:bg-[#1e6a42] text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Continue Shopping on Amazon</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 px-3 text-xs font-semibold text-[#718078] hover:text-[#244C38] transition-colors cursor-pointer"
            >
              Back to TreeBazaar.in Catalog
            </button>

            <p className="text-[10px] text-center text-[#718078]">
              Direct website cart & checkout gateway will be launched in the upcoming phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
