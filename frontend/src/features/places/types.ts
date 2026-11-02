import type { Shop } from '@/types/shop';

export type { Shop };

export interface VeganPlace {
  id: string;
  name: string;
  district: string;
  address: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  type: 'Vegan' | 'Vegetarian' | 'Grocer' | 'Café';
  openingHours: string;
  popularDish: string;
  x: number; // percentage on SVG map
  y: number; // percentage on SVG map
  latitude?: number;
  longitude?: number;
  specialDish?: string;
  phoneNumber?: string;
  isOpen?: boolean;
}

export type ShopFilter = 'All' | 'Vegan' | 'Vegetarian' | 'Grocer' | 'Café';

export interface FoodSpotItem {
  dish: string;
  places: {
    name: string;
    distance: string;
    price: string;
  }[];
}

export function shopToVeganPlace(shop: Shop): VeganPlace {
  const distLabel =
    shop.distanceM == null
      ? 'Gần bạn'
      : shop.distanceM < 1000
      ? `${shop.distanceM}m`
      : `${(shop.distanceM / 1000).toFixed(1)}km`;

  let type: 'Vegan' | 'Vegetarian' | 'Grocer' | 'Café' = 'Vegetarian';
  const cat = (shop.category || '').toLowerCase();
  if (cat.includes('vegan') || cat.includes('thuần chay')) type = 'Vegan';
  else if (cat.includes('cafe') || cat.includes('café')) type = 'Café';
  else if (cat.includes('grocer') || cat.includes('chợ') || cat.includes('siêu thị')) type = 'Grocer';

  return {
    id: String(shop.shopId),
    name: shop.name,
    district: shop.address?.split(',').slice(-2, -1)[0]?.trim() || 'TP.HCM',
    address: shop.address || 'Đang cập nhật địa chỉ',
    distance: distLabel,
    rating: Number(shop.rating || 4.5),
    reviewsCount: Math.floor(Math.random() * 200) + 20,
    type,
    openingHours: shop.isOpen ? '07:00 - 21:30' : 'Tạm đóng cửa',
    popularDish: shop.specialDish || 'Món chay thanh tịnh',
    x: 50,
    y: 50,
    latitude: Number(shop.latitude),
    longitude: Number(shop.longitude),
    specialDish: shop.specialDish || undefined,
    phoneNumber: shop.phoneNumber || undefined,
    isOpen: shop.isOpen,
  };
}
