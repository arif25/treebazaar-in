'use client';

import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { openAmazonPurchase } from '@/config/shopConfig';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  onOpenCart?: () => void;
}

export default function Toast({ message, onClose, onOpenCart }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#244C38] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#4CAF72]/40 flex items-center gap-3 max-w-sm">
        <div className="w-8 h-8 rounded-xl bg-[#EAF6EC]/20 flex items-center justify-center text-[#EAF6EC] shrink-0">
          <CheckCircle2 className="w-5 h-5 text-[#80C995]" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-semibold text-white">{message}</p>
        </div>
        {onOpenCart && (
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="text-[11px] font-semibold text-[#80C995] hover:text-white cursor-pointer transition-colors"
          >
            Store Info
          </button>
        )}
        <button
          onClick={() => {
            onClose();
            openAmazonPurchase();
          }}
          className="text-[11px] font-bold text-[#4CAF72] hover:text-white flex items-center gap-1 cursor-pointer ml-1 shrink-0 transition-colors"
        >
          <span>Amazon</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
