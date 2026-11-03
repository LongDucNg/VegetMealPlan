import { apiClient } from "@/lib/apiClient";
import { VEGAN_PLACES, SHOP_FILTERS, SUGGESTED_FOOD_SPOTS } from "../data/mockPlaces";
import { VeganPlace, ShopFilter, FoodSpotItem, Shop, shopToVeganPlace } from "../types";

export interface NearbyPlacesParams {
  lat: number;
  lng: number;
  radiusKm?: number;
  dish?: string;
  category?: string;
}

export const placeService = {
  getPlaces(): VeganPlace[] {
    return VEGAN_PLACES;
  },

  getPlaceById(id: string): VeganPlace | undefined {
    return VEGAN_PLACES.find((p) => p.id === id);
  },

  getShopFilters(): readonly ShopFilter[] {
    return SHOP_FILTERS;
  },

  getSuggestedFoodSpots(): FoodSpotItem[] {
    return SUGGESTED_FOOD_SPOTS;
  },

  /**
   * Lấy danh sách quán ăn chay gần vị trí người dùng (Backend Haversine + OSM Crawler + Spatial Cache)
   * GET /places/nearby
   */
  async fetchNearbyPlaces(params: NearbyPlacesParams): Promise<{ items: Shop[] }> {
    try {
      const res = await apiClient.get<{ items: Shop[] }>("/places/nearby", {
        params: {
          lat: params.lat,
          lng: params.lng,
          radiusKm: params.radiusKm ?? 5,
          dish: params.dish?.trim() || undefined,
          category: params.category?.trim() || undefined,
        },
      });
      if (res && Array.isArray(res.items)) {
        return res;
      }
    } catch (err) {
      console.warn("fetchNearbyPlaces error, returning empty fallback:", err);
    }
    return { items: [] };
  },

  /**
   * Lấy danh sách quán chay từ backend (GET /places)
   */
  async fetchPlaces(filter?: ShopFilter | "All", query?: string): Promise<VeganPlace[]> {
    try {
      const res = await apiClient.get<Shop[]>("/places", {
        params: {
          type: filter && filter !== "All" ? filter : undefined,
          q: query ? query.trim() : undefined,
        },
      });
      if (Array.isArray(res) && res.length > 0) {
        return res.map(shopToVeganPlace);
      }
    } catch {}
    return this.filterPlaces(filter || "All", query);
  },

  /**
   * Chi tiết quán (GET /places/:id)
   */
  async fetchPlaceById(id: string): Promise<VeganPlace | undefined> {
    try {
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        const res = await apiClient.get<Shop>(`/places/${numericId}`);
        if (res && res.shopId) {
          return shopToVeganPlace(res);
        }
      }
    } catch {}
    return this.getPlaceById(id);
  },

  /**
   * Bộ lọc loại quán (GET /places/filters)
   */
  async fetchShopFilters(): Promise<readonly ShopFilter[]> {
    try {
      const res = await apiClient.get<ShopFilter[]>("/places/filters");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return SHOP_FILTERS;
  },

  /**
   * Gợi ý điểm ăn theo món (GET /places/food-spots/suggested)
   */
  async fetchSuggestedFoodSpots(): Promise<FoodSpotItem[]> {
    try {
      const res = await apiClient.get<FoodSpotItem[]>("/places/food-spots/suggested");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return SUGGESTED_FOOD_SPOTS;
  },

  /**
   * Thêm quán mới - Admin (POST /places)
   */
  async createPlace(data: Partial<VeganPlace>): Promise<VeganPlace> {
    const payload = {
      name: data.name,
      address: data.address,
      latitude: data.latitude ?? 10.776889,
      longitude: data.longitude ?? 106.695345,
      category: data.type,
      specialDish: data.popularDish,
      rating: data.rating,
      phoneNumber: data.phoneNumber,
      isOpen: data.isOpen ?? true,
    };
    const created = await apiClient.post<Shop>("/places", payload);
    return shopToVeganPlace(created);
  },

  /**
   * Sửa quán - Admin (PUT /places/:id)
   */
  async updatePlace(id: string, data: Partial<VeganPlace>): Promise<VeganPlace> {
    const numericId = parseInt(id, 10);
    const payload = {
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      category: data.type,
      specialDish: data.popularDish,
      rating: data.rating,
      phoneNumber: data.phoneNumber,
      isOpen: data.isOpen,
    };
    const updated = await apiClient.put<Shop>(`/places/${numericId}`, payload);
    return shopToVeganPlace(updated);
  },

  /**
   * Xóa quán - Admin (DELETE /places/:id)
   */
  async deletePlace(id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      await apiClient.delete<void>(`/places/${numericId}`);
    }
  },

  filterPlaces(filter: ShopFilter | "All", query?: string): VeganPlace[] {
    let result = VEGAN_PLACES;

    if (filter && filter !== "All") {
      result = result.filter((p) => p.type === filter);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.popularDish.toLowerCase().includes(q)
      );
    }

    return result;
  },
};
