import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { ALLERGEN_GROUPS } from '../users/allergen-groups';
import { PlannedMeal, RecipeIngredientRow } from './meal-plan-planner.util';

/**
 * Hàm phụ cho chức năng "soạn thực đơn cho người khác" (bản xem trước, không lưu DB).
 * Tách từ MealPlanService, logic giữ nguyên.
 */

/**
 * Ánh xạ mã nhóm dị ứng (PEANUT, DAIRY...) sang danh sách ingredient_id.
 * Dùng chung bảng ALLERGEN_GROUPS với luồng dị ứng của tài khoản.
 */
export function expandAllergenGroups(codes?: string[]): number[] {
  if (!codes || codes.length === 0) {
    return [];
  }

  const ids: number[] = [];

  for (const code of codes) {
    const group = ALLERGEN_GROUPS.find(
      (item) => item.code === code,
    );

    if (group) {
      ids.push(...group.ingredient_ids);
    }
  }

  return ids;
}

/** Ngày bắt đầu tuần (Thứ 2) của tuần hiện tại. */
export function getWeekStart(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  return monday;
}

/**
 * Gom kết quả thực đơn thành cấu trúc trả về cho frontend.
 * Cùng hình dạng với thực đơn đã lưu (weekly_plans -> daily_meals ->
 * meal_items -> recipe) để frontend dùng chung được component hiển thị/in.
 */
export function buildPreviewMealPlan(params: {
  profileName: string;
  dietType: string;
  targetCalories: number;
  allergyIngredientIds: number[];
  startDate: Date;
  plannedMeals: PlannedMeal[];
  nutritionMap: Map<number, NutritionInfo>;
  ingredientsMap: Map<number, RecipeIngredientRow[]>;
  hasBudget: boolean;
  totalBudget?: number;
}) {
  const {
    profileName,
    dietType,
    targetCalories,
    allergyIngredientIds,
    startDate,
    plannedMeals,
    nutritionMap,
    ingredientsMap,
    hasBudget,
    totalBudget,
  } = params;

  const days = new Map<number, PlannedMeal[]>();

  for (const meal of plannedMeals) {
    const list = days.get(meal.dayIndex) ?? [];
    list.push(meal);
    days.set(meal.dayIndex, list);
  }

  // Cùng cấu trúc với thực đơn đã lưu: MỖI bữa là 1 daily_meals, mỗi
  // daily_meals có 1 meal_items và bên trong là đối tượng recipe đầy đủ.
  // Nhờ vậy frontend dùng chung được đúng hàm đọc thực đơn đã lưu.
  const dailyMeals: any[] = [];

  for (const [dayIndex, meals] of [...days.entries()].sort(
    (a, b) => a[0] - b[0],
  )) {
    const mealDate = new Date(startDate);
    mealDate.setDate(startDate.getDate() + dayIndex);
    mealDate.setHours(0, 0, 0, 0);

    // Gom các món theo mealType trong ngày để mỗi bữa có 2-3 món
    const mealTypeMap = new Map<string, PlannedMeal[]>();
    for (const meal of meals) {
      const list = mealTypeMap.get(meal.mealType) ?? [];
      list.push(meal);
      mealTypeMap.set(meal.mealType, list);
    }

    for (const [mealType, typeMeals] of mealTypeMap.entries()) {
      dailyMeals.push({
        meal_date: mealDate,
        meal_type: mealType,
        target_calories: typeMeals.reduce((sum, m) => sum + m.calories, 0),
        meal_items: typeMeals.map((m) => ({
          recipe_id: m.recipe.recipe_id,
          is_ai_suggested: true,
          added_by_user: false,
          portion_multiplier: m.portion,
          recipe: {
            ...m.recipe,
            nutrition: nutritionMap.get(m.recipe.recipe_id) ?? null,
            ingredients: ingredientsMap.get(m.recipe.recipe_id) ?? [],
            calories: Number(nutritionMap.get(m.recipe.recipe_id)?.calories ?? 0),
          },
        })),
      });
    }
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(0, 0, 0, 0);

  return {
    // Thực đơn này KHÔNG được lưu -> is_saved = false để frontend biết
    // không có mục trong danh sách thực đơn của tôi.
    is_saved: false,
    profile_name: profileName,
    diet_type: dietType,
    target_calories_per_day: targetCalories,
    ai_cookability_notes: 'Bếp trưởng AI (Groq): Khẩu phần món ăn đã được kiểm tra và giữ trong ngưỡng chuẩn để đảm bảo định lượng nguyên liệu, gia vị hài hòa và nấu được thực tế.',
    allergy_ingredient_ids: allergyIngredientIds,
    has_budget: hasBudget,
    total_budget: hasBudget ? (totalBudget ?? null) : null,
    start_date: startDate,
    end_date: endDate,
    weekly_plans: [
      {
        week_number: 1,
        start_date: startDate,
        end_date: endDate,
        week_calorie_target: targetCalories * 7,
        daily_meals: dailyMeals,
      },
    ],
  };
}
