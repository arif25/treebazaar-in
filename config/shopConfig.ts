/**
 * Centralized Shopping and Amazon Integration Configuration for TreeBazaar.in
 *
 * TreeBazaar is currently fulfilling customer purchases via our official Amazon Storefront.
 * Future phases will switch shoppingMode to 'internal' when direct checkout is activated.
 */

export interface ShopConfig {
  shoppingMode: 'amazon' | 'internal';
  brandName: string;
  brandDomain: string;
  brandTagline: string;
  defaultAmazonUrl: string;
  storefrontName: string;
  amazonSellerName: string;
}

export const SHOP_CONFIG: ShopConfig = {
  // Toggle between 'amazon' and 'internal' shopping cart/checkout
  shoppingMode: 'amazon',
  brandName: 'TreeBazaar',
  brandDomain: 'https://treebazaar.in/',
  brandTagline: 'Bring Nature Closer to Your Home',
  // Official Amazon Storefront & Product Listing destination URL
  defaultAmazonUrl:
    'https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B0HPPJ3SRS&me=A2KSV05CEID2QM',
  storefrontName: 'TreeBazaar Official Amazon Store',
  amazonSellerName: 'TreeBazaar Online Nursery & Plants',
};

/**
 * Resolves the destination URL for a given product or general store link.
 * Supports per-product Amazon URLs when available; falls back to defaultAmazonUrl.
 */
export function getProductPurchaseUrl(product?: { amazonUrl?: string }): string {
  if (product?.amazonUrl && product.amazonUrl.trim() !== '') {
    return product.amazonUrl;
  }
  return SHOP_CONFIG.defaultAmazonUrl;
}

/**
 * Handles purchase intent action.
 * In Amazon mode: opens the designated Amazon storefront/product URL in a secure new tab.
 */
export function openAmazonPurchase(product?: { amazonUrl?: string; name?: string }) {
  const url = getProductPurchaseUrl(product);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
}

