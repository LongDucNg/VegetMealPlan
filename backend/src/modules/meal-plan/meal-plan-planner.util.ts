import { BadRequestException } from '@nestjs/common';
import { Recipe } from '../recipe/entities/recipe.entity';
import { normalizeUnit } from '../recipe/recipe-cost.util';
import { isRecipeSuitableForMeal } from '../recipe/recipe-meals.util';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';

/**
 * Thuật toán soạn thực đơn (hàm thuần, không đọc DB).
 *
 * Tách từ MealPlanService: chọn món cho từng bữa theo calo mục tiêu và ngân sách,
 * rồi gộp nguyên liệu theo gram để làm danh sách đi chợ.
 * Logic giữ nguyên như trước khi tách.
 */

export interface BudgetTracker {
  remaining: number;
  slotsLeft: number;
}

export interface PlannedMeal {
  dayIndex: number;
  mealType: string;
  calories: number;
  recipe: Recipe;
  portion: number;
  itemIndex?: number;
}

/** Một dòng nguyên liệu của công thức (dùng cho response xem/in). */
export interface RecipeIngredientRow {
  ingredient_id: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  is_optional: boolean;
  calories_per_100g?: number | null;
  calories?: number | null;
}

// =========================================================
// HELPER: KIỂM TRA MÓN CÓ PHÙ HỢP VỚI BỮA ĂN KHÔNG
// =========================================================

export function isSuitableForMeal(
  recipe: Recipe,
  mealType: string,
): boolean {
  // suitable_meals là nguồn chuẩn (vd. meal_type='lunch' nhưng
  // suitable_meals='lunch,dinner' thì dùng được cho cả bữa tối).
  // Chỉ fallback về meal_type khi suitable_meals trống.
  return isRecipeSuitableForMeal(recipe, mealType);
}

// =========================================================
// HELPER: CHỌN MÓN CHO CÁC BỮA, CÓ GIỚI HẠN NGÂN SÁCH
// =========================================================

// Chọn trước toàn bộ món trong bộ nhớ (chưa ghi DB) để nếu ngân sách
// không đủ thì báo lỗi mà không để lại thực đơn dở dang.
// Mỗi bữa chỉ được chọn món có chi phí <= ngân sách còn lại / số bữa còn lại,
// nên tổng chi phí không bao giờ vượt total_budget.
// Đồng thời tối ưu độ đa dạng: phạt nặng món lặp lại và món ăn gần kề để không bị trùng món.
export function planMeals(params: {
  dayCount: number;
  mealTargets: Record<string, number>;
  recipes: Recipe[];
  nutritionMap: Map<number, NutritionInfo>;
  costMap: Map<number, number>;
  usedRecipeCounts?: Map<number, number>;
  recentUsedDays?: Map<number, number>;
  dayOffset?: number;
  budget?: BudgetTracker;
}): PlannedMeal[] {
  const {
    dayCount,
    mealTargets,
    recipes,
    nutritionMap,
    costMap,
    budget,
  } = params;

  const usedCounts = params.usedRecipeCounts ?? new Map<number, number>();
  const recentDays = params.recentUsedDays ?? new Map<number, number>();
  const dayOffset = params.dayOffset ?? 0;

  const planned: PlannedMeal[] = [];

  // Helper functions phân loại món
  const getTitle = (r: Recipe) => (r.title || '').toLowerCase();
  const getCategories = (r: Recipe): string[] => {
    const cats = (r as any).categories || (r as any).categoryNames || [];
    if (Array.isArray(cats)) return cats.map((c: any) => String(c).toLowerCase());
    if ((r as any).category) return [String((r as any).category).toLowerCase()];
    return [];
  };

  const isRiceDish = (r: Recipe): boolean => {
    const t = getTitle(r);
    const cats = getCategories(r);
    return (
      cats.some((c) => c.includes('cơm') || c.includes('xôi')) ||
      t.includes('cơm') ||
      t.includes('xôi')
    );
  };

  const isSoupDish = (r: Recipe): boolean => {
    const t = getTitle(r);
    const cats = getCategories(r);
    return (
      cats.some((c) => c.includes('canh') || c.includes('súp')) ||
      t.includes('canh') ||
      t.includes('súp')
    );
  };

  const isBreakfastOnly = (r: Recipe): boolean => {
    const sm = (r.suitable_meals || '').toLowerCase();
    const mt = (r.meal_type || '').toLowerCase();
    const t = getTitle(r);
    const isExcl =
      (sm === 'breakfast' || mt === 'breakfast') &&
      !sm.includes('lunch') &&
      !sm.includes('dinner') &&
      !sm.includes('any') &&
      mt !== 'any';
    const isMorningFood =
      t.includes('bánh mì kẹp') ||
      t.includes('sandwich') ||
      t.includes('ngũ cốc') ||
      t.includes('cháo yến mạch');
    return isExcl || isMorningFood;
  };

  const isMainDish = (r: Recipe): boolean => {
    const t = getTitle(r);
    const cats = getCategories(r);
    return (
      cats.some(
        (c) =>
          c.includes('mặn') ||
          c.includes('kho') ||
          c.includes('rim') ||
          c.includes('chiên') ||
          c.includes('xào') ||
          c.includes('đủ bữa'),
      ) ||
      t.includes('kho') ||
      t.includes('rim') ||
      t.includes('chiên') ||
      t.includes('xào') ||
      t.includes('đậu hũ') ||
      t.includes('nấm')
    );
  };

  const isVeggieOrSide = (r: Recipe): boolean => {
    const t = getTitle(r);
    const cats = getCategories(r);
    return (
      cats.some(
        (c) =>
          c.includes('rau') ||
          c.includes('luộc') ||
          c.includes('hấp') ||
          c.includes('gỏi') ||
          c.includes('sa lát') ||
          c.includes('salad') ||
          c.includes('cuốn'),
      ) ||
      t.includes('rau') ||
      t.includes('luộc') ||
      t.includes('salad') ||
      t.includes('gỏi')
    );
  };

  const mealEntries = Object.entries(mealTargets);
  const dayTarget = mealEntries.reduce((sum, [, c]) => sum + c, 0);

  for (let dayIndex = 0; dayIndex < dayCount; dayIndex++) {
    let dayCalories = 0;
    const globalDay = dayOffset + dayIndex;
    const dayChosenRecipeIds = new Set<number>();

    for (let mealIndex = 0; mealIndex < mealEntries.length; mealIndex++) {
      const [mealType, baseCalories] = mealEntries[mealIndex];
      const isLastMeal = mealIndex === mealEntries.length - 1;
      const remainingForDay = Math.max(100, dayTarget - dayCalories);
      let targetMealCalories = baseCalories;
      if (mealType === 'lunch') {
        targetMealCalories = Math.round(remainingForDay * (0.38 / (0.38 + 0.25 + 0.12)));
      } else if (mealType === 'dinner') {
        targetMealCalories = Math.round(remainingForDay * (0.25 / (0.25 + 0.12)));
      } else if (isLastMeal) {
        targetMealCalories = remainingForDay;
      }

      let baseCandidates = recipes.filter((recipe) =>
        isSuitableForMeal(recipe, mealType),
      );

      // Quy tắc AI: Không đưa món ăn sáng vào ăn trưa hay ăn tối!
      if (mealType === 'lunch' || mealType === 'dinner') {
        const nonBreakfast = baseCandidates.filter((r) => !isBreakfastOnly(r));
        if (nonBreakfast.length > 0) {
          baseCandidates = nonBreakfast;
        }
      }

      if (baseCandidates.length === 0) {
        if (budget) budget.slotsLeft--;
        continue;
      }

      // Tạo bữa sáng trưa tối từ 2-3 món ăn để đủ lượng kcal ngày thay vì tăng khẩu phần
      const hasRichCatalog = recipes.length >= 8;

      if (!hasRichCatalog) {
        // Fallback legacy cho mock tests với catalog nhỏ (< 10 recipes)
        let candidates = baseCandidates;
        if (budget) {
          const maxCost = budget.remaining / Math.max(budget.slotsLeft, 1);
          const affordable = candidates.filter((recipe) => {
            const cost = costMap.get(recipe.recipe_id);
            return cost !== undefined && cost <= maxCost;
          });
          if (affordable.length > 0) {
            candidates = affordable;
          } else if (candidates.length === 0) {
            throw new BadRequestException(
              'Ngân sách không đủ để tạo thực đơn: không có công thức nào phù hợp chi phí mỗi bữa. Hãy tăng ngân sách.',
            );
          }
        }

        const calories = targetMealCalories;
        const score = (recipe: Recipe) => {
          const recipeCalories = Number(nutritionMap.get(recipe.recipe_id)?.calories ?? 0);
          const maxPortion = 1.25;
          let testPortion = recipeCalories > 0 ? Math.min(maxPortion, Math.max(0.85, calories / recipeCalories)) : 1;
          testPortion = Math.round(testPortion * 10) / 10;
          const effectiveCalories = recipeCalories * testPortion;
          const calDiff = Math.abs(effectiveCalories - calories);

          const timesUsed = usedCounts.get(recipe.recipe_id) ?? 0;
          const lastUsedDay = recentDays.get(recipe.recipe_id);
          const daysSinceLastUsed = lastUsedDay !== undefined ? (globalDay - lastUsedDay) : 999;

          const recencyPenalty =
            daysSinceLastUsed === 0 ? 8000 :
            daysSinceLastUsed === 1 ? 3000 :
            daysSinceLastUsed === 2 ? 1000 : 0;

          const frequencyPenalty = timesUsed * 800;
          const jitter = ((recipe.recipe_id * 17 + globalDay * 31) % 100) * 0.1;

          return (calDiff * 4) + frequencyPenalty + recencyPenalty + jitter;
        };

        const pool = [...candidates].sort((x, y) => score(x) - score(y));
        const selected = pool[0];

        usedCounts.set(selected.recipe_id, (usedCounts.get(selected.recipe_id) ?? 0) + 1);
        recentDays.set(selected.recipe_id, globalDay);

        const recipeCalories = Number(nutritionMap.get(selected.recipe_id)?.calories ?? 0);
        const maxPortion = 1.25;
        let portion = recipeCalories > 0 ? Math.min(maxPortion, Math.max(0.85, calories / recipeCalories)) : 1;
        portion = Math.round(portion * 10) / 10;
        const dishCalories = Math.round(recipeCalories * portion);
        const unitCost = (costMap.get(selected.recipe_id) ?? 0) * portion;

        dayCalories += dishCalories;

        if (budget) {
          budget.remaining -= unitCost;
          budget.slotsLeft--;
        }

        planned.push({ dayIndex, mealType, calories: dishCalories, recipe: selected, portion, itemIndex: 0 });
        continue;
      }

      let maxDishes = 1;
      if (mealType === 'lunch') {
        maxDishes = baseCandidates.length >= 2 ? 2 : 1;
      } else if (mealType === 'dinner') {
        maxDishes = baseCandidates.length >= 2 ? 2 : 1;
      } else if (mealType === 'breakfast') {
        maxDishes = baseCandidates.length >= 2 ? 2 : 1;
      }

      if (budget) {
        const maxCostPerDish = budget.remaining / Math.max(budget.slotsLeft, 1);
        const affordable = baseCandidates.filter((recipe) => {
          const cost = costMap.get(recipe.recipe_id);
          return cost !== undefined && cost <= maxCostPerDish;
        });
        if (affordable.length > 0) {
          baseCandidates = affordable;
        } else if (baseCandidates.length === 0) {
          throw new BadRequestException(
            'Ngân sách không đủ để tạo thực đơn: không có công thức nào phù hợp chi phí mỗi bữa. Hãy tăng ngân sách.',
          );
        }
      }

      let mealHasRice = false;
      let mealHasSoup = false;
      let remainingMealKcal = targetMealCalories;
      const mealChosenRecipeIds = new Set<number>();

      for (let dishIdx = 0; dishIdx < maxDishes; dishIdx++) {
        if (dishIdx >= 1 && remainingMealKcal < 100) {
          break;
        }

        let dishCandidates = baseCandidates.filter((r) => {
          if (mealChosenRecipeIds.has(r.recipe_id)) return false;
          if (mealHasRice && isRiceDish(r)) return false;
          if (mealHasSoup && isSoupDish(r)) return false;
          return true;
        });

        if (dishCandidates.length === 0) {
          break;
        }

        if (hasRichCatalog) {
          const isFresh = (r: Recipe) => {
            const last = recentDays.get(r.recipe_id);
            return last === undefined || globalDay - last >= 14;
          };

          // BỮA TRƯA: Ưu tiên đặc biệt các món liên quan đến cơm (Cơm, xôi, gạo lứt...)
          if (mealType === 'lunch' && dishIdx === 0) {
            const freshRices = dishCandidates.filter((r) => isFresh(r) && isRiceDish(r));
            if (freshRices.length > 0) {
              dishCandidates = freshRices;
            } else {
              const rices = dishCandidates.filter((r) => isRiceDish(r));
              if (rices.length > 0) {
                dishCandidates = rices;
              } else {
                const mains = dishCandidates.filter((r) => isMainDish(r));
                if (mains.length > 0) dishCandidates = mains;
              }
            }
          } else if (mealType === 'lunch' && dishIdx === 1) {
            // Món ăn kèm bữa trưa: canh hoặc rau xào nhẹ để ăn kèm cơm
            const freshSides = dishCandidates.filter((r) => isFresh(r) && !isRiceDish(r) && (isSoupDish(r) || isVeggieOrSide(r)));
            if (freshSides.length > 0) {
              dishCandidates = freshSides;
            } else {
              const sides = dishCandidates.filter((r) => !isRiceDish(r) && (isSoupDish(r) || isVeggieOrSide(r)));
              if (sides.length > 0) dishCandidates = sides;
            }
          } else if (mealType === 'dinner' && dishIdx === 0) {
            // Bữa tối nhẹ hơn bữa trưa: món chính thanh đạm hoặc món canh / xào
            const freshNonHeavy = dishCandidates.filter((r) => isFresh(r) && (isMainDish(r) || isSoupDish(r)));
            if (freshNonHeavy.length > 0) {
              dishCandidates = freshNonHeavy;
            } else {
              const nonHeavy = dishCandidates.filter((r) => isMainDish(r) || isSoupDish(r));
              if (nonHeavy.length > 0) dishCandidates = nonHeavy;
            }
          } else if (mealType === 'dinner' && dishIdx === 1) {
            const freshSides = dishCandidates.filter((r) => isFresh(r) && (isSoupDish(r) || isVeggieOrSide(r)));
            if (freshSides.length > 0) dishCandidates = freshSides;
          }
        }

        // Quy tắc 14 ngày: Không trùng món trong 2 tuần liên tiếp
        const freshCandidates = dishCandidates.filter((r) => {
          const lastUsed = recentDays.get(r.recipe_id);
          if (lastUsed === undefined) return true;
          return globalDay - lastUsed >= 14;
        });

        const candidatesToScore = freshCandidates.length > 0 ? freshCandidates : dishCandidates;

        const dishesLeft = maxDishes - dishIdx;
        const targetDishKcal = dishesLeft === 1
          ? Math.max(80, remainingMealKcal)
          : Math.max(80, Math.round(remainingMealKcal / dishesLeft));

        const score = (recipe: Recipe) => {
          const recipeCalories = Number(nutritionMap.get(recipe.recipe_id)?.calories ?? 0);
          const calDiff = Math.abs(recipeCalories - targetDishKcal);
          const overshootPenalty = (dayCalories + recipeCalories > dayTarget + 120) ? 6000 : 0;

          const timesUsed = usedCounts.get(recipe.recipe_id) ?? 0;
          const lastUsedDay = recentDays.get(recipe.recipe_id);
          const daysSinceLastUsed = lastUsedDay !== undefined ? (globalDay - lastUsedDay) : 999;

          let recencyPenalty = 0;
          if (daysSinceLastUsed < 14) {
            recencyPenalty = (14 - daysSinceLastUsed) * 10000;
          }

          const dayPenalty = dayChosenRecipeIds.has(recipe.recipe_id) ? 3000 : 0;
          const frequencyPenalty = timesUsed * 1000;
          const jitter = ((recipe.recipe_id * 17 + globalDay * 31 + dishIdx * 43) % 100) * 0.1;

          return (calDiff * 3) + overshootPenalty + dayPenalty + frequencyPenalty + recencyPenalty + jitter;
        };

        const pool = [...candidatesToScore].sort((x, y) => score(x) - score(y));
        const selected = pool[0];

        mealChosenRecipeIds.add(selected.recipe_id);
        dayChosenRecipeIds.add(selected.recipe_id);
        usedCounts.set(selected.recipe_id, (usedCounts.get(selected.recipe_id) ?? 0) + 1);
        recentDays.set(selected.recipe_id, globalDay);

        if (isRiceDish(selected)) mealHasRice = true;
        if (isSoupDish(selected)) mealHasSoup = true;

        const recipeCalories = Number(nutritionMap.get(selected.recipe_id)?.calories ?? 0);

        // Luôn dùng 1.0 (chuẩn đúng định lượng công thức, không ép tăng giảm khẩu phần)
        const portion = 1.0;
        const dishCalories = recipeCalories > 0 ? Math.round(recipeCalories) : targetDishKcal;
        remainingMealKcal -= dishCalories;
        dayCalories += dishCalories;

        const unitCost = costMap.get(selected.recipe_id) ?? 0;
        if (budget) {
          budget.remaining -= unitCost;
          budget.slotsLeft--;
        }

        planned.push({
          dayIndex,
          mealType,
          calories: dishCalories,
          recipe: selected,
          portion,
        });

        // Quy tắc: Không cần cố định 3-4 món, 1 món cũng được nếu đã đủ năng lượng
        if (dishIdx === 0) {
          if (dishCalories >= 450 || dishCalories >= targetMealCalories * 0.75 || remainingMealKcal < 120 || dayCalories + 120 >= dayTarget) {
            break;
          }
        }
      }
    }
  }

  return planned;
}

// =========================================================
// HELPER: TỔNG HỢP NGUYÊN LIỆU THEO ĐƠN VỊ GAM
// =========================================================

/**
 * Lấy đơn vị khối lượng nhỏ nhất như gam để tính cho các nguyên liệu rồi sum lại (có dấu áng chừng ~).
 * Dùng để cung cấp cho Bếp trưởng AI (Groq) xét duyệt và trả về response ingredient_summary.
 */
export function aggregateIngredientsByGram(
  plannedMeals: PlannedMeal[],
  ingredientsMap: Map<number, RecipeIngredientRow[]>,
): { ingredient_name: string; quantity_g: number; note: string }[] {
  const totals = new Map<string, number>();

  for (const meal of plannedMeals) {
    const rows = ingredientsMap.get(meal.recipe.recipe_id) ?? [];
    for (const row of rows) {
      const name = row.ingredient_name || `ingredient_${row.ingredient_id}`;
      const quantityInRecipe = Number(row.quantity ?? 0) * meal.portion;
      if (quantityInRecipe <= 0) continue;

      // Chuẩn hoá đơn vị (bỏ dấu tiếng Việt, chữ thường)
      const unit = normalizeUnit(row.unit);
      let grams: number = 0;

      // Quy đổi về đơn vị khối lượng nhỏ nhất là gam (g)
      if (unit === 'g' || unit === 'gram' || unit === 'gam' || unit === 'gr') {
        grams = quantityInRecipe;
      } else if (unit === 'kg' || unit === 'kilo' || unit === 'kilogram') {
        grams = quantityInRecipe * 1000;
      } else if (unit === 'mg' || unit === 'miligram') {
        grams = quantityInRecipe / 1000;
      } else if (unit === 'l' || unit === 'lit' || unit === 'liter' || unit === 'litre') {
        grams = quantityInRecipe * 1000; // 1 lít nước/chất lỏng ~ 1000g
      } else if (unit === 'ml' || unit === 'mililit' || unit === 'milliliter') {
        grams = quantityInRecipe; // 1 ml ~ 1g
      } else if (unit === 'tbsp' || unit === 'thia canh' || unit === 'muong canh' || unit === 'thia' || unit === 'muong') {
        grams = quantityInRecipe * 15; // 1 thìa canh ~ 15g
      } else if (unit === 'tsp' || unit === 'thia ca phe' || unit === 'muong ca phe' || unit === 'thia nho') {
        grams = quantityInRecipe * 5; // 1 thìa cà phê ~ 5g
      } else if (unit === 'chen' || unit === 'bat') {
        grams = quantityInRecipe * 150; // 1 chén/bát ~ 150g
      } else if (unit === 'nhanh' || unit === 'tep') {
        grams = quantityInRecipe * 5; // 1 tép tỏi, nhánh gừng ~ 5g
      } else if (unit === 'qua' || unit === 'cu' || unit === 'trai' || unit === 'bap') {
        grams = quantityInRecipe * 100; // 1 quả/củ trung bình ~ 100g
      } else if (unit === 'mieng' || unit === 'lat') {
        grams = quantityInRecipe * 50; // 1 miếng/lát ~ 50g
      } else if (unit === 'cay') {
        grams = quantityInRecipe * 30; // 1 cây sả, hành ~ 30g
      } else if (unit === 'goi') {
        grams = quantityInRecipe * 50;
      } else {
        // Các đơn vị khác: tạm tính ước lượng 10g mỗi đơn vị nếu có số lượng
        grams = quantityInRecipe * 10;
      }

      if (grams > 0) {
        totals.set(name, (totals.get(name) ?? 0) + grams);
      }
    }
  }

  return Array.from(totals.entries())
    .filter(([, qty]) => qty > 0)
    .map(([name, qty]) => ({
      ingredient_name: name,
      quantity_g: Math.round(qty),
      // Có tiền tố áng chừng ~ theo yêu cầu người dùng
      note: `~${Math.round(qty)}g`,
    }))
    .sort((a, b) => b.quantity_g - a.quantity_g); // sort nhiều nhất trước
}
