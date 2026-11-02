export interface Product {
  id: string;
  name: string;
  botanicalName?: string;
  category: 'indoor' | 'outdoor' | 'pots' | 'tools' | 'seeds' | 'bonsai' | 'fertilizer' | 'deals';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeColor?: 'green' | 'amber' | 'emerald' | 'rose' | 'red';
  dealTag?: string;
  isDealOfTheDay?: boolean;
  deliveryEstimate?: string;
  isBalconyFavorite?: boolean;
  isDeskFavorite?: boolean;
  description: string;
  care: {
    light: string;
    water: string;
    petFriendly: boolean;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    height?: string;
  };
  inStock: boolean;
  amazonUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  itemCount: string;
  image: string;
  iconName: string;
  href: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPotColor?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  plantPurchased: string;
  avatar: string;
  verified: boolean;
}
