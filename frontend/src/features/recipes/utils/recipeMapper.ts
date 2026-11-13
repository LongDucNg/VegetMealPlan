import { Recipe, MealType, RecipeStatus, IngredientItem } from "../types";
import { VegetarianType } from "@/features/profile/types";
import {
  getIngredientCaloriesPer100g,
  calculateIngredientCalories,
} from "./ingredientNutrition";

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
  const calories = Math.round(rawCalories * 100) / 100;

  // Ingredients
  let ingredients: IngredientItem[] = [];
  const rawIngredients = Array.isArray(r.recipeIngredients)
    ? r.recipeIngredients
    : Array.isArray(r.recipe_ingredients)
      ? r.recipe_ingredients
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
      const rawCalPer100 =
        ingredientObj.calories_per_100g !== undefined && ingredientObj.calories_per_100g !== null
          ? Number(ingredientObj.calories_per_100g)
          : item.calories_per_100g !== undefined && item.calories_per_100g !== null
            ? Number(item.calories_per_100g)
            : item.caloriesPer100g !== undefined && item.caloriesPer100g !== null
              ? Number(item.caloriesPer100g)
              : getIngredientCaloriesPer100g(name);
      const caloriesPer100g = Math.round(rawCalPer100 * 100) / 100;
      const calories =
        item.calories !== undefined && item.calories !== null
          ? Math.round(Number(item.calories) * 100) / 100
          : calculateIngredientCalories(quantity, unit, caloriesPer100g);

      return {
        id,
        name,
        quantity,
        unit,
        unitPrice,
        cost,
        caloriesPer100g,
        calories,
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

  // 10 danh mục chuẩn quản trị từ cơ sở dữ liệu (phù hợp 100% với trang Quản trị danh mục)
  const STANDARD_CATEGORIES = [
    "Mì, Bún & Phở",
    "Cơm, Xôi & Cháo",
    "Bánh, Bánh bột & Ăn vặt",
    "Tráng miệng & Đồ uống",
    "Món kho & Rim",
    "Xào & Chiên",
    "Luộc & Hấp",
    "Cuốn, Gỏi & Sa lát",
    "Canh & Súp",
    "Khác",
  ];

  // Thu thập chuỗi danh mục từ mọi nguồn (r.recipeCategories, r.categories, r.category)
  const rawCategoryStrings: string[] = [];
  const collectRaw = (val: any) => {
    if (!val) return;
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed) rawCategoryStrings.push(trimmed);
    } else if (Array.isArray(val)) {
      val.forEach(collectRaw);
    } else if (typeof val === "object") {
      collectRaw(val.category?.category_name || val.category_name || val.name || val.title || val.category);
    }
  };

  collectRaw(r.recipeCategories);
  collectRaw(r.categories);
  collectRaw(r.category);

  // Khớp chính xác với các danh mục chuẩn
  const matchedCategories = new Set<string>();
  for (const raw of rawCategoryStrings) {
    // 1. Khớp chính xác với 1 trong các danh mục chuẩn (không bao giờ split dấu phẩy làm hỏng tên "Mì, Bún & Phở", "Cơm, Xôi & Cháo"...)
    const exact = STANDARD_CATEGORIES.find((sc) => sc.toLowerCase() === raw.toLowerCase());
    if (exact) {
      matchedCategories.add(exact);
      continue;
    }
    // 2. Nếu chuỗi dạng ghép (ví dụ: "Món đủ bữa, Mì, Bún & Phở"), kiểm tra có chứa danh mục chuẩn không
    const lower = raw.toLowerCase();
    for (const sc of STANDARD_CATEGORIES) {
      if (sc === "Khác") continue;
      if (lower.includes(sc.toLowerCase())) {
        matchedCategories.add(sc);
      }
    }
  }

  // "Khác" chỉ dùng khi không khớp bất kỳ danh mục cụ thể nào trong 9 danh mục trên
  const nonOtherMatches = Array.from(matchedCategories).filter((c) => c !== "Khác");
  const finalCategories = nonOtherMatches.length > 0 ? nonOtherMatches : ["Khác"];
  const category = finalCategories[0];

  // Status
  const status: RecipeStatus = (
    r.status === "pending_review" ? "PENDING_REVIEW" :
      r.status === "approved" ? "APPROVED" :
        r.status === "rejected" ? "REJECTED" :
          r.status === "draft" ? "DRAFT" :
            (r.status || "APPROVED")
  ).toUpperCase() as RecipeStatus;

  const reviewReason = r.review_reason || r.reviewReason || null;
  const diffRaw = String(r.difficulty || "").toLowerCase();
  const difficulty: "Easy" | "Medium" | "Advanced" =
    diffRaw === "easy" || diffRaw === "dễ" || diffRaw === "de"
      ? "Easy"
      : diffRaw === "hard" || diffRaw === "khó" || diffRaw === "kho" || diffRaw === "advanced"
        ? "Advanced"
        : "Medium";

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
    categories: finalCategories,
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
    video_url: r.video_url || r.videoUrl || undefined,
    videoUrl: r.video_url || r.videoUrl || undefined,
    estimatedCost: Number(r.estimated_cost ?? r.estimatedCost ?? 0),
    status,
    review_reason: reviewReason,
    reviewReason: reviewReason,
    source: r.source || { type: "admin", name: "VeggieHub Kitchen" },
    difficulty,
    duration: `${prepTime + cookTime} min`,
    author: r.author || (r.user ? r.user.full_name || r.user.email : "VeggieHub Kitchen"),
    verified: true,
  };
}
