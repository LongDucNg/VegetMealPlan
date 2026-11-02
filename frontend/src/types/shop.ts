export interface Shop {
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

export interface NearbyPlacesResponse {
  items: Shop[];
}

