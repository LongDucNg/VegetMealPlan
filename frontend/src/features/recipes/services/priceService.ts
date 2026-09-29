import { storage, STORAGE_KEYS } from "@/utils/storage/storage";
import { IngredientItem, Recipe } from "../types";

export interface IngredientPriceRule {
  name: string;
  unit: string; // e.g. "kg", "liter", "pc"
  price: number; // in VND
}

// Standard admin-defined unit prices in Vietnam (Requirement 4)
export const DEFAULT_INGREDIENT_PRICES: Record<string, { unit: string; price: number }> = {
  rice: { unit: "kg", price: 30000 },
  tofu: { unit: "kg", price: 45000 },
  "firm tofu": { unit: "kg", price: 45000 },
  carrot: { unit: "kg", price: 25000 },
  "rolled oats": { unit: "kg", price: 65000 },
  oats: { unit: "kg", price: 65000 },
  "peanut butter": { unit: "kg", price: 140000 },
  peanuts: { unit: "kg", price: 70000 },
  "crushed peanuts": { unit: "kg", price: 75000 },
  banana: { unit: "pc", price: 4000 },
  "almond milk": { unit: "liter", price: 55000 },
  "soy milk": { unit: "liter", price: 30000 },
  "organic soy milk": { unit: "liter", price: 35000 },
  "oat milk": { unit: "liter", price: 45000 },
  "chia seeds": { unit: "kg", price: 160000 },
  blueberries: { unit: "kg", price: 220000 },
  mango: { unit: "kg", price: 40000 },
  "frozen mango": { unit: "kg", price: 45000 },
  "coconut milk": { unit: "liter", price: 40000 },
  "pumpkin seeds": { unit: "kg", price: 150000 },
  "hemp seeds": { unit: "kg", price: 240000 },
  "sunflower seeds": { unit: "kg", price: 110000 },
  apple: { unit: "pc", price: 12000 },
  "bok choy": { unit: "kg", price: 30000 },
  spinach: { unit: "kg", price: 35000 },
  mushrooms: { unit: "kg", price: 80000 },
  tempeh: { unit: "kg", price: 95000 },
  chickpeas: { unit: "kg", price: 70000 },
  lentils: { unit: "kg", price: 65000 },
  quinoa: { unit: "kg", price: 110000 },
  broccoli: { unit: "kg", price: 45000 },
  cucumber: { unit: "kg", price: 20000 },
  tomato: { unit: "kg", price: 28000 },
  avocado: { unit: "pc", price: 15000 },
  "olive oil": { unit: "liter", price: 180000 },
  "soy sauce": { unit: "liter", price: 40000 },
  "maple syrup": { unit: "liter", price: 150000 },
  cinnamon: { unit: "kg", price: 80000 },
  egg: { unit: "pc", price: 3500 },
  eggs: { unit: "pc", price: 3500 },
  bread: { unit: "pc", price: 5000 },
  toast: { unit: "pc", price: 5000 },
  sourdough: { unit: "pc", price: 6000 },
  garlic: { unit: "pc", price: 2000 },
  onion: { unit: "pc", price: 4000 },
};

export const PRICE_WARNING_TEXT =
  "Giá chỉ mang tính ước tính. Chi phí thực tế có thể thay đổi tùy giá nguyên liệu, khu vực, thương hiệu, mùa vụ và nơi mua.";

export const PRICE_WARNING_TEXT_EN =
  "Estimated price only. Actual cost may vary depending on ingredient prices, location, brand, season and quantity.";

// Helper to normalize ingredient lookup key
function normalizeName(name: string): string {
  return name.toLowerCase().trim();
}

/**
 * Calculates ingredient cost based on unit and admin pricing
 */
export function calculateIngredientCost(
  name: string,
  quantityRaw: number | string,
  unitRaw: string,
  customUnitPrice?: number
): { cost: number; unitPrice: number } {
  const norm = normalizeName(name);
  const qty = typeof quantityRaw === "number" ? quantityRaw : parseFloat(String(quantityRaw)) || 0;
  const unit = unitRaw.toLowerCase().trim();

  // Find price definition or fallback
  let rule = DEFAULT_INGREDIENT_PRICES[norm];
  if (!rule) {
    const key = Object.keys(DEFAULT_INGREDIENT_PRICES).find((k) => norm.includes(k) || k.includes(norm));
    if (key) {
      rule = DEFAULT_INGREDIENT_PRICES[key];
    } else {
      rule = { unit: "kg", price: 45000 }; // Baseline ~45,000 VND / kg
    }
  }

  const unitPrice = customUnitPrice !== undefined && customUnitPrice > 0 ? customUnitPrice : rule.price;

  let factor = 1;

  if (
    unit === "g" ||
    unit === "gram" ||
    unit === "grams" ||
    unit === "ml" ||
    unit === "milliliter" ||
    unit === "milliliters"
  ) {
    factor = qty / 1000;
  } else if (unit === "tbsp") {
    factor = (qty * 15) / 1000;
  } else if (unit === "tsp") {
    factor = (qty * 5) / 1000;
  } else if (unit === "kg" || unit === "liter" || unit === "l") {
    factor = qty;
  } else if (
    unit === "pc" ||
    unit === "pcs" ||
    unit === "piece" ||
    unit === "pieces" ||
    unit === "slice" ||
    unit === "slices"
  ) {
    if (rule.unit === "pc") {
      factor = qty;
    } else {
      factor = qty * 0.08; // ~80g piece
    }
  } else if (unit === "clove" || unit === "cloves" || unit === "pinch") {
    factor = (qty * 5) / 1000;
  } else {
    if (qty > 10) factor = qty / 1000;
    else factor = qty;
  }

  const cost = Math.max(500, Math.round(factor * unitPrice));
  return { cost, unitPrice };
}

export const priceService = {
  calculateIngredientCost,

  /**
   * Calculates recipe estimated price summing all ingredient costs (Requirement 4)
   */
  calculateRecipeCost(ingredients: IngredientItem[]): {
    estimatedCost: number;
    ingredientsWithCost: IngredientItem[];
  } {
    if (!ingredients || ingredients.length === 0) {
      return { estimatedCost: 18500, ingredientsWithCost: [] };
    }

    let total = 0;
    const ingredientsWithCost = ingredients.map((ing) => {
      const { cost, unitPrice } = calculateIngredientCost(
        ing.name,
        ing.quantity,
        ing.unit,
        ing.unitPrice
      );
      total += cost;
      return {
        ...ing,
        unitPrice: ing.unitPrice || unitPrice,
        cost,
      };
    });

    // Round to nearest 500 VND
    const estimatedCost = Math.max(10000, Math.round(total / 500) * 500);
    return { estimatedCost, ingredientsWithCost };
  },

  /**
   * Formats estimated price with leading "~" (Requirement 5)
   */
  formatEstimatedPrice(amount: number): string {
    return `~${Math.round(amount).toLocaleString("vi-VN")} VND`;
  },

  /**
   * Formats actual price (exact or customized by user)
   */
  formatActualPrice(amount: number): string {
    return `${Math.round(amount).toLocaleString("vi-VN")} VND`;
  },

  /**
   * User custom recipe price management (Requirement 6)
   * Stored in localStorage by userId:
   * { [userId]: { [recipeId]: number } }
   */
  getUserPrices(userId: string): Record<string, number> {
    const safeId = userId || "1";
    const all = storage.getItem<Record<string, Record<string, number>>>(
      STORAGE_KEYS.RECIPE_PRICES,
      {}
    );

    if (all[safeId]) {
      return all[safeId];
    }

    // Default mock prices for demo user
    const defaultPrices: Record<string, number> = {
      "rec-1": 22000, // Peanut Butter Banana Oatmeal (~18,500 VND estimated -> 22,000 VND actual)
      "rec-5": 35000, // Crispy Sesame Garlic Tofu (~30,000 VND estimated -> 35,000 VND actual)
      "rec-10": 42000, // Creamy Avocado Pesto Pasta (~38,000 VND estimated -> 42,000 VND actual)
    };

    all[safeId] = defaultPrices;
    storage.setItem(STORAGE_KEYS.RECIPE_PRICES, all);
    return defaultPrices;
  },

  getMyPrice(userId: string, recipeId: string): number | undefined {
    const safeId = userId || "1";
    const userPrices = this.getUserPrices(safeId);
    return userPrices[recipeId];
  },

  setMyPrice(userId: string, recipeId: string, actualPrice: number): void {
    const safeId = userId || "1";
    if (!recipeId) return;
    const all = storage.getItem<Record<string, Record<string, number>>>(
      STORAGE_KEYS.RECIPE_PRICES,
      {}
    );
    if (!all[safeId]) {
      all[safeId] = {};
    }
    all[safeId][recipeId] = Math.max(0, Math.round(actualPrice));
    storage.setItem(STORAGE_KEYS.RECIPE_PRICES, all);
  },

  removeMyPrice(userId: string, recipeId: string): void {
    const safeId = userId || "1";
    if (!recipeId) return;
    const all = storage.getItem<Record<string, Record<string, number>>>(
      STORAGE_KEYS.RECIPE_PRICES,
      {}
    );
    if (all[safeId] && all[safeId][recipeId]) {
      delete all[safeId][recipeId];
      storage.setItem(STORAGE_KEYS.RECIPE_PRICES, all);
    }
  },

  /**
   * Returns list of recipes with user custom prices for profile management
   */
  getAllUserPricedRecipes(
    userId: string,
    recipes: Recipe[]
  ): {
    recipe: Recipe;
    myPrice: number;
    estimatedCost: number;
    diff: number;
  }[] {
    const prices = this.getUserPrices(userId);
    const result: {
      recipe: Recipe;
      myPrice: number;
      estimatedCost: number;
      diff: number;
    }[] = [];

    for (const [recipeId, myPrice] of Object.entries(prices)) {
      const recipe = recipes.find((r) => r.id === recipeId);
      if (recipe && myPrice > 0) {
        const estimatedCost =
          recipe.estimatedCost ||
          this.calculateRecipeCost(recipe.ingredients || []).estimatedCost;
        result.push({
          recipe,
          myPrice,
          estimatedCost,
          diff: myPrice - estimatedCost,
        });
      }
    }

    return result;
  },

  /**
   * Resolves effective price: prioritizes user's My Price, falls back to Admin Estimated Price (Requirement 7)
   */
  getEffectivePrice(
    recipe: Recipe,
    userId?: string
  ): { price: number; isCustom: boolean; formatted: string } {
    const myPrice = userId ? this.getMyPrice(userId, recipe.id) : undefined;
    if (myPrice !== undefined && myPrice > 0) {
      return {
        price: myPrice,
        isCustom: true,
        formatted: this.formatActualPrice(myPrice),
      };
    }

    const estimated = recipe.estimatedCost || this.calculateRecipeCost(recipe.ingredients).estimatedCost;
    return {
      price: estimated,
      isCustom: false,
      formatted: this.formatEstimatedPrice(estimated),
    };
  },
};
