'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/types';
import { openAmazonPurchase, getProductPurchaseUrl } from '@/config/shopConfig';

interface AmazonBuyButtonProps {
  product?: Product;
  className?: string;
  variant?: 'primary' | 'secondary' | 'coral' | 'compact';
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function AmazonBuyButton({
  product,
  className = '',
  variant = 'primary',
  label = 'Buy on Amazon',
  onClick,
}: AmazonBuyButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
    openAmazonPurchase(product);
  };

  const amazonUrl = getProductPurchaseUrl(product);

  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer select-none rounded-xl text-center group';

  // Fresh Botanical Green (#4CAF72) primary, Coral Red (#E85D5D) special offer, White with Green border secondary
  const variants = {
    primary:
      'bg-[#4CAF72] hover:bg-[#278653] active:bg-[#1f6d43] text-white shadow-xs hover:shadow-md py-2.5 px-4 text-xs sm:text-sm font-semibold border border-[#4CAF72]',
    secondary:
      'bg-white hover:bg-[#EAF6EC] active:bg-[#d5eed9] text-[#278653] shadow-xs hover:shadow-md py-2 px-3 text-xs font-semibold border border-[#4CAF72]',
    coral:
      'bg-[#E85D5D] hover:bg-[#D94C4C] active:bg-[#c23b3b] text-white shadow-xs hover:shadow-md py-2.5 px-4 text-xs sm:text-sm font-bold border border-[#E85D5D]',
    compact:
      'bg-[#4CAF72] hover:bg-[#278653] text-white py-1.5 px-3 text-[11px] font-semibold rounded-lg border border-[#4CAF72]',
  };

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      title={`${label} — Dispatched safely via TreeBazaar Amazon Store`}
    >
      <span className="flex items-center gap-1.5">
        {/* Amazon A-smile brand mark SVG */}
        <svg
          className={`w-3.5 h-3.5 shrink-0 fill-current ${
            variant === 'secondary' ? 'text-[#278653]' : 'text-white'
          }`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.916 17.51c-2.484 1.83-6.096 2.802-9.215 2.802-4.364 0-8.286-1.583-11.25-4.225-.233-.207-.025-.49.255-.332 3.197 1.815 7.155 2.898 11.233 2.898 2.766 0 5.807-.63 8.57-1.874.42-.189.771.29.407.731zm1.378-.962c-.316-.407-.759-.228-1.18-.007-1.405.742-2.98 1.15-4.636 1.15-2.732 0-5.308-1.077-7.23-2.906-.179-.17-.4-.016-.312.2.827 2.029 2.83 3.655 5.253 4.417 2.76.868 5.772.545 8.163-.997.352-.227.262-.45-.058-.857zm5.556-3.238c-.144-.183-.349-.133-.538-.035-1.503.782-3.235 1.166-4.996 1.096-3.16-.126-6.052-1.742-7.923-4.288-.135-.183-.326-.14-.428.025-.79 1.282-1.895 2.29-3.21 2.923-.27.13-.19.43.08.48 2.37.44 4.88-.12 7.02-1.39 1.94-1.15 3.52-2.78 4.54-4.73.08-.15.25-.13.34.02.58.98 1.43 1.76 2.44 2.27.24.12.39.04.47-.19.26-.75.76-2.58.46-3.48-.05-.15-.17-.22-.32-.22-1.08.03-3.13.62-3.88 1.18-.14.1-.11.26.03.35.63.41 1.41.67 2.22.75.14.01.21.11.16.24-.46 1.25-1.2 2.34-2.14 3.19-.11.1-.11.22-.01.31 1.34 1.18 3.01 1.95 4.81 2.19.16.02.26-.06.29-.21.19-.94.7-2.61.9-3.51.03-.13-.02-.23-.15-.27-.85-.26-1.77-.32-2.64-.17-.15.03-.23-.05-.21-.2.13-.97.55-2.65 1.43-3.15.14-.08.28-.04.38.07 1.08 1.21 2.39 3.05 2.76 4.35.04.14-.03.24-.16.27-.47.11-.96.15-1.45.13-.15-.01-.22.08-.2.23.11.83.47 2.45 1.05 3.07.12.13.25.12.37.01.89-.84 1.58-1.93 2.01-3.15.06-.17.2-.17.3-.06.77.85 1.74 2.4 1.97 3.39.03.14-.04.24-.17.26-.41.07-.84.07-1.26.02-.15-.02-.22.06-.21.21.08.83.44 2.41.97 3.01.12.13.25.12.37.01 1.01-.95 1.79-2.19 2.24-3.58.05-.16.19-.16.28-.05.74.88 1.71 2.45 1.94 3.44.03.14-.04.24-.17.26-.41.07-.84.07-1.26.02-.15-.02-.22.06-.21.21.08.83.44 2.41.97 3.01.12.13.25.12.37.01.67-.63 1.24-1.39 1.67-2.24.08-.16.23-.15.31-.02.48.78 1.18 1.89 1.48 2.65.04.1-.01.18-.11.23-1.07.54-2.27.87-3.49.98-.16.01-.23.11-.19.26.23.86.77 2.37 1.41 2.87.12.09.25.07.36-.03.88-.8 1.57-1.82 2.01-2.97.06-.16.2-.16.3-.05.69.77 1.59 2.14 1.83 3.02.04.14-.04.24-.17.26-.41.07-.84.07-1.26.02-.15-.02-.22.06-.21.21.08.83.44 2.41.97 3.01.12.13.25.12.37.01.95-.9 1.68-2.07 2.11-3.37.06-.17.2-.16.3-.05.67.76 1.56 2.12 1.8 3.01.04.14-.04.24-.17.26-.41.07-.84.07-1.26.02-.15-.02-.22.06-.21.21.08.83.44 2.41.97 3.01.12.13.25.12.37.01.78-.74 1.42-1.66 1.88-2.69.07-.16.21-.15.3-.03.5.69 1.2 1.83 1.48 2.58.04.11-.01.19-.12.24-.96.44-2.01.71-3.09.81-.16.01-.23.11-.19.26.21.82.71 2.27 1.3 2.76.12.1.25.08.35-.02.82-.78 1.47-1.77 1.89-2.88.06-.16.2-.16.3-.05.64.73 1.47 2.02 1.71 2.89.04.14-.04.24-.17.26-.41.07-.84.07-1.26.02-.15-.02-.22.06-.21.21.08.83.44 2.41.97 3.01.12.13.25.12.37.01.9-.86 1.59-1.97 2-3.21.06-.17.2-.16.3-.05.62.72 1.43 1.98 1.67 2.85.04.14-.04.24-.17.26-.41.07-.84.07-1.26.02-.15-.02-.22.06-.21.21.08.83.44 2.41.97 3.01.12.13.25.12.37.01.7-.67 1.29-1.5 1.72-2.43.07-.16.21-.15.3-.03.45.64 1.1 1.72 1.37 2.43.04.11-.01.19-.12.24-1.74.83-3.7 1.25-5.73 1.22z" />
        </svg>
        <span>{label}</span>
      </span>
      <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
