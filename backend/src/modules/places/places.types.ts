export interface ShopView {
  shopId: number;
  name: string;
  address: string | null;
  latitude: number;
  longitude: number;
  distanceM: number | null;
  category: string | null;
  categories: string[] | null;
  specialDish: string | null;
  suggestedDishes: string[] | null;
  phoneNumber: string | null;
  rating: number | null;
  isOpen: boolean;
  source: string;
}

export interface NearbyPlacesFilter {
  lat: number;
  lng: number;
  radiusKm?: number;
  dish?: string;
  category?: string;
}

export interface SpatialCacheCell {
  cellKey: string;
  centerLat: number;
  centerLng: number;
  fetchedRadiusKm: number;
  shopsFound: number;
  expiresAt: Date;
}

export interface ExternalPlaceItem {
  name: string;
  address?: string | null;
  latitude: number;
  longitude: number;
  category?: string;
  externalId: string;
  source: string;
  phoneNumber?: string | null;
  rating?: number;
  isOpen?: boolean;
}

