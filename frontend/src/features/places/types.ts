export interface VeganPlace {
  id: string;
  name: string;
  district: string;
  address: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  type: "Vegan" | "Vegetarian" | "Grocer" | "Café";
  openingHours: string;
  popularDish: string;
  x: number; // percentage on SVG map
  y: number; // percentage on SVG map
}

export type ShopFilter = "All" | "Vegan" | "Vegetarian" | "Grocer" | "Café";

export interface FoodSpotItem {
  dish: string;
  places: {
    name: string;
    distance: string;
    price: string;
  }[];
}
