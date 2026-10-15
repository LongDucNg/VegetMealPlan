import { Recipe, MealType, RecipeStatus, IngredientItem } from "../types";
import { VegetarianType } from "@/features/profile/types";

export function mapDietTypeToFrontend(dietType?: string): VegetarianType {
  const dt = (dietType || "").toLowerCase();
  if (dt.includes("vegan") || dt === "thuần chay") return "vegan";
  if (dt.includes("lacto-ovo") || dt.includes("ovo-lacto") || dt === "lacto_ovo_vegetarian") return "lacto_ovo_vegetarian";
  if (dt.includes("lacto") || dt === "lacto_vegetarian") return "lacto_vegetarian";
  if (dt.includes("ovo") || dt === "ovo_vegetarian") return "ovo_vegetarian";
  return "vegan";
}

export function mapBackendToFrontendRecipe(r: any): Recipe {
  const id = String(r.recipe_id || r.id || `rec-${Date.now()}`);
  const title = r.title || r.name || "Món chay ngon";
  const mealType = (r.meal_type || r.mealType || "lunch").toLowerCase() as MealType;
  const vegetarianType = mapDietTypeToFrontend(r.diet_type || r.vegetarianType);
  const prepTime = Number(r.prep_time ?? r.prepTime ?? 10);
  const cookTime = Number(r.cook_time ?? r.cookTime ?? 15);
  const serving = Number(r.servings ?? r.serving ?? 1);

  // Nutrition
  const nut = r.nutrition || r.nutritionInfo || {};
  const protein = Math.round(Number(nut.protein ?? r.protein ?? 0) * 10) / 10;
  const carbs = Math.round(Number(nut.carbs ?? r.carbs ?? 0) * 10) / 10;
  const fat = Math.round(Number(nut.fat ?? r.fat ?? 0) * 10) / 10;
  const fiber = Math.round(Number(nut.fiber ?? r.fiber ?? 0) * 10) / 10;

  let rawCalories =
    nut.calories !== undefined && nut.calories !== null
      ? Number(nut.calories)
      : r.calories !== undefined && r.calories !== null
      ? Number(r.calories)
      : null;

  if (rawCalories === null || isNaN(rawCalories) || rawCalories <= 0) {
    const macroCalories = Math.round(protein * 4 + carbs * 4 + fat * 9);
    rawCalories = macroCalories > 0 ? macroCalories : 350;
  }
  const calories = Math.round(rawCalories);

  // Ingredients
  let ingredients: IngredientItem[] = [];
  const rawIngredients = Array.isArray(r.recipeIngredients)
    ? r.recipeIngredients
    : Array.isArray(r.ingredients)
    ? r.ingredients
    : [];

  if (rawIngredients.length > 0) {
    ingredients = rawIngredients.map((item: any) => {
      const ingredientObj = item.ingredient || {};
      const id =
        item.ingredient_id ||
        ingredientObj.ingredient_id ||
        item.id ||
        ingredientObj.id ||
        1;
      const name =
        ingredientObj.ingredient_name ||
        ingredientObj.name ||
        item.ingredient_name ||
        item.name ||
        "Nguyên liệu";
      const quantity = Number(item.quantity ?? 1);
      const unit = item.unit || ingredientObj.unit || "g";
      const unitPrice = Number(
        ingredientObj.avg_price_per_unit ||
        ingredientObj.price_per_unit ||
        item.unitPrice ||
        item.unit_price ||
        item.price_per_unit ||
        0
      );
      const cost = Number(item.cost || (unitPrice > 0 ? Math.round(unitPrice * quantity) : 0));

      return {
        id,
        name,
        quantity,
        unit,
        unitPrice,
        cost,
      };
    });
  }

  // Instructions
  let instructions: string[] = [];
  if (Array.isArray(r.instructions)) {
    instructions = r.instructions;
  } else if (typeof r.instructions === "string") {
    instructions = r.instructions.split("\n").map((s: string) => s.trim()).filter(Boolean);
  }
  if (instructions.length === 0) {
    instructions = ["Chuẩn bị nguyên liệu", "Sơ chế và chế biến theo công thức", "Trình bày ra đĩa và thưởng thức"];
  }

  // Category
  const category =
    r.recipeCategories?.[0]?.category?.name ||
    r.category ||
    "Món chính";

  // Status
  const status: RecipeStatus = (
    r.status === "pending_review" ? "PENDING_REVIEW" :
    r.status === "approved" ? "APPROVED" :
    r.status === "rejected" ? "REJECTED" :
    r.status === "draft" ? "DRAFT" :
    (r.status || "APPROVED")
  ).toUpperCase() as RecipeStatus;

  return {
    id,
    name: title,
    title,
    description: r.description || "Công thức món ăn thanh đạm, dinh dưỡng.",
    image:
      r.image_url ||
      r.image ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    category,
    mealType,
    vegetarianType,
    prepTime,
    cookTime,
    serving,
    calories,
    protein,
    carbs,
    fat,
    fiber,
    ingredients,
    allergens: r.allergens || [],
    instructions,
    estimatedCost: Number(r.estimated_cost ?? r.estimatedCost ?? 0),
    status,
    source: r.source || { type: "admin", name: "VeggieHub Kitchen" },
    duration: `${prepTime + cookTime} min`,
    author: r.author || (r.user ? r.user.full_name || r.user.email : "VeggieHub Kitchen"),
    verified: true,
  };
}
