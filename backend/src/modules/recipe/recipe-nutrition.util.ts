// Quy tắc dinh dưỡng BE2 (đã thống nhất):
// - kcal 1 nguyên liệu = calories_per_100g * khối lượng(g) / 100
// - Tổng kcal món = tổng các nguyên liệu BẮT BUỘC (optional không tính)
// - nutrition_infos lưu theo 1 KHẨU PHẦN = tổng kcal / servings
// Tách ra đây để RecipeService và IngredientService dùng CHUNG một công thức,
// không có 2 chỗ tự tính lệch nhau.

export interface NutritionCalcRow {
  quantity: number;
  is_optional?: boolean;
  ingredient?: {
    calories_per_100g?: number | null;
    protein_per_100g?: number | null;
    carb_per_100g?: number | null;
    fat_per_100g?: number | null;
    fiber_per_100g?: number | null;
  } | null;
}

export interface NutritionPerServing {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

/**
 * Tính dinh dưỡng THEO 1 KHẨU PHẦN từ danh sách nguyên liệu.
 * Nguyên liệu optional không tính (món không bắt buộc phải dùng).
 * quantity luôn hiểu là gram (các luồng create/update/import đã chặn
 * nguyên liệu bắt buộc có đơn vị khác "g").
 */
export function calculateNutritionPerServing(
  rows: NutritionCalcRow[],
  servings?: number | null,
): NutritionPerServing {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };

  for (const row of rows) {
    if (row.is_optional) {
      continue;
    }

    const ingredient = row.ingredient;
    const ratio = Number(row.quantity || 0) / 100;

    totals.calories += ratio * Number(ingredient?.calories_per_100g ?? 0);
    totals.protein += ratio * Number(ingredient?.protein_per_100g ?? 0);
    totals.carbs += ratio * Number(ingredient?.carb_per_100g ?? 0);
    totals.fat += ratio * Number(ingredient?.fat_per_100g ?? 0);
    totals.fiber += ratio * Number(ingredient?.fiber_per_100g ?? 0);
  }

  const divisor = servings && servings > 0 ? servings : 1;

  return {
    calories: totals.calories / divisor,
    protein: totals.protein / divisor,
    carbs: totals.carbs / divisor,
    fat: totals.fat / divisor,
    fiber: totals.fiber / divisor,
  };
}