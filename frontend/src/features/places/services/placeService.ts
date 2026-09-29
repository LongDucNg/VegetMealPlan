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
