'use client';

import React from 'react';
import Link from 'next/link';

interface TreeBazaarLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

export default function TreeBazaarLogo({
  variant = 'light',
  className = '',
  showTagline = false,
  size = 'md',
  asLink = true,
}: TreeBazaarLogoProps) {
  // Official TreeBazaar Leaf Emblem Logo (V2)
  // - Light background: /images/treebazaar-leaf-emblem.png (transparent background, original leaf gradient & green lettering)
  // - Dark background: /images/treebazaar-leaf-emblem-dark.png (crisp white "Tree" and "treebazaar.in" lettering, vibrant green leaves & emerald "Bazaar")
  const logoSrc =
    variant === 'dark'
      ? '/images/treebazaar-leaf-emblem-dark.png'
      : '/images/treebazaar-leaf-emblem.png';

  // Responsive dimensions maintaining the logo's natural ~1.84:1 aspect ratio
  const dimensions = {
    sm: { width: 120, height: 65, hClass: 'h-8 sm:h-9' },
    md: { width: 160, height: 87, hClass: 'h-10 sm:h-12' },
    lg: { width: 210, height: 114, hClass: 'h-12 sm:h-14' },
  }[size];

  const content = (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="relative flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="TreeBazaar — Bring Nature Closer to Your Home"
          width={dimensions.width}
          height={dimensions.height}
          className={`object-contain ${dimensions.hClass} w-auto transition-transform duration-200 hover:scale-[1.02]`}
          loading="eager"
        />
      </div>
      {showTagline && (
        <span
          className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 ${
            variant === 'dark' ? 'text-[#80C995]' : 'text-[#278653]'
          }`}
        >
          Bring Nature Closer to Your Home
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center focus:outline-hidden"
        title="TreeBazaar.in Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
