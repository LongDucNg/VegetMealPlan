import { apiClient } from "@/lib/apiClient";
import { VEGAN_PLACES, SHOP_FILTERS, SUGGESTED_FOOD_SPOTS } from "../data/mockPlaces";
import { VeganPlace, ShopFilter, FoodSpotItem } from "../types";

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
   * Lấy danh sách quán chay từ backend (Endpoint 29: GET /places)
   */
  async fetchPlaces(filter?: ShopFilter | "All", query?: string): Promise<VeganPlace[]> {
    try {
      const res = await apiClient.get<VeganPlace[]>("/places", {
        params: {
          type: filter && filter !== "All" ? filter : undefined,
          q: query ? query.trim() : undefined,
        },
      });
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return this.filterPlaces(filter || "All", query);
  },

  /**
   * Chi tiết quán (Endpoint 30: GET /places/:id)
   */
  async fetchPlaceById(id: string): Promise<VeganPlace | undefined> {
    try {
      const res = await apiClient.get<VeganPlace>(`/places/${id}`);
      if (res && res.id) return res;
    } catch {}
    return this.getPlaceById(id);
  },

  /**
   * Bộ lọc loại quán (Endpoint 31: GET /places/filters)
   */
  async fetchShopFilters(): Promise<readonly ShopFilter[]> {
    try {
      const res = await apiClient.get<ShopFilter[]>("/places/filters");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return SHOP_FILTERS;
  },

  /**
   * Gợi ý điểm ăn theo món (Endpoint 32: GET /places/food-spots/suggested)
   */
  async fetchSuggestedFoodSpots(): Promise<FoodSpotItem[]> {
    try {
      const res = await apiClient.get<FoodSpotItem[]>("/places/food-spots/suggested");
      if (Array.isArray(res) && res.length > 0) return res;
    } catch {}
    return SUGGESTED_FOOD_SPOTS;
  },

  /**
   * Thêm quán mới - Admin (Endpoint 33: POST /places)
   */
  async createPlace(data: Partial<VeganPlace>): Promise<VeganPlace> {
    return await apiClient.post<VeganPlace>("/places", data);
  },

  /**
   * Sửa quán - Admin (Endpoint 34: PUT /places/:id)
   */
  async updatePlace(id: string, data: Partial<VeganPlace>): Promise<VeganPlace> {
    return await apiClient.put<VeganPlace>(`/places/${id}`, data);
  },

  /**
   * Xóa quán - Admin (Endpoint 35: DELETE /places/:id)
   */
  async deletePlace(id: string): Promise<void> {
    await apiClient.delete<void>(`/places/${id}`);
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
          p.district.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.popularDish.toLowerCase().includes(q)
      );
    }

    return result;
  },
};
