export enum ProductCategory {
  PENGETAHUAN_MISTIK = "Pengetahuan Mistik",
  MEDIA_BERJIMAT = "Media Berjimat",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  stock: number; // 0 for Out of Stock
  category: ProductCategory;
  images: string[]; // URLs of product images, first is primary
  featured?: boolean;
  dimensions?: string; // e.g. "10cm x 5cm x 2cm"
  material?: string; // e.g. "Silver, Amethyst"
  origin?: string; // e.g. "Ancient Tomb of Eldoria"
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavLinkItem {
  label: string;
  path: string;
  isDropdown?: boolean;
  dropdownItems?: NavLinkItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string; // URL to avatar image
  rating: number; // 0-5 stars
  title: string; // Optional short title for the review
  review: string;
  date: string; // e.g., "10 Agustus 2024"
}

export interface MarketplaceLink {
  platformName: string; // e.g., "Shopee"
  storeName: string; // e.g., "Tapak Pamungkas2"
  url: string;
  Icon: React.FC<IconProps>; // Reference to the icon component
}

// Add this to IconProps if it's not already there for general use
export interface IconProps {
  className?: string;
  filled?: boolean; 
}
