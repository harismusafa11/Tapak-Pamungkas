import { ProductCategory, MarketplaceLink, IconProps } from './types';
import { ShopeeIcon, TokopediaIcon, LazadaIcon, TikTokIcon } from './components/ui/Icon';

export const WHATSAPP_NUMBER = "6285880231697";
export const STORE_NAME = "Tapak Pamungkas";

export const CATEGORIES_SLUGS: Record<string, string> = {
  [ProductCategory.KEILMUAN_SPIRITUAL]: "keilmuan-spiritual",
  [ProductCategory.MEDIA_BERTUAH]: "media-bertuah",
};

export const SLUGS_TO_CATEGORIES: Record<string, string> = {
  "keilmuan-spiritual": ProductCategory.KEILMUAN_SPIRITUAL,
  "media-bertuah": ProductCategory.MEDIA_BERTUAH,
};

export const MARKETPLACE_LINKS: MarketplaceLink[] = [
  {
    platformName: "Shopee",
    storeName: "Tapak Pamungkas2",
    url: `https://shopee.co.id/search?keyword=${encodeURIComponent("Tapak Pamungkas2")}`,
    Icon: ShopeeIcon,
  },
  {
    platformName: "Tokopedia",
    storeName: "Tapak Pamungkas Official",
    url: `https://www.tokopedia.com/search?q=${encodeURIComponent("Tapak Pamungkas Official")}`,
    Icon: TokopediaIcon,
  },
  {
    platformName: "Lazada",
    storeName: "Tapak Pamungkas Real",
    url: `https://www.lazada.co.id/catalog/?q=${encodeURIComponent("Tapak Pamungkas Real")}`,
    Icon: LazadaIcon,
  },
  {
    platformName: "TikTok Shop",
    storeName: "Tapak Pamungkas",
    url: `https://www.tiktok.com/@TapakPamungkas`, // Assuming username is TapakPamungkas
    Icon: TikTokIcon,
  },
];

export const PRODUCTS_PER_PAGE = 10; // Jumlah produk per halaman di halaman kategori