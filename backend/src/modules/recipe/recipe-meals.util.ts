/**
 * Cột recipes.suitable_meals chứa danh sách bữa ăn phù hợp, cách nhau dấu phẩy
 * (vd. "lunch,dinner"). Cột recipes.meal_type chỉ là phân loại bữa chính.
 *
 * Quy tắc đã xác nhận từ dữ liệu gốc (file seed Excel, sheet Mon_an):
 *   meal_type = breakfast -> suitable_meals = breakfast
 *   meal_type = lunch     -> suitable_meals = lunch,dinner
 *   meal_type = snack     -> suitable_meals = snack
 *
 * Khi lọc/generate thực đơn, suitable_meals là nguồn chuẩn. Nếu một món chưa có
 * suitable_meals thì suy ra từ meal_type theo mapping trên.
 */

/**
 * Mapping chuẩn meal_type -> suitable_meals, lấy từ file seed gốc
 * (VegetMealPlan_seed_mon_chay.xlsx, sheet Mon_an).
 */
export const MEAL_TYPE_TO_SUITABLE_MEALS: Record<string, string> = {
  breakfast: 'breakfast',
  lunch: 'lunch,dinner',
  dinner: 'dinner',
  snack: 'snack',
  any: 'any',
};

/**
 * Các meal_type hợp lệ.
 *
 * 'breakfast', 'lunch', 'snack' là dữ liệu gốc (file seed Excel, sheet Mon_an).
 * 'dinner' và 'any' được hỗ trợ thêm vì cột meal_type trong DB có thể chứa
 * chúng và mapping chuẩn bên dưới đã định nghĩa sẵn.
 */
export const VALID_MEAL_TYPES: string[] = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'any',
];

/**
 * Chuẩn hoá meal_type về chữ thường + bỏ khoảng trắng.
 * Trả về null nếu không hợp lệ (null vì DTO chưa bắt buộc meal_type).
 */
export function normalizeMealType(
  mealType?: string | null,
): string | null {
  const key = mealType?.trim().toLowerCase();

  if (!key) {
    return null;
  }

  return VALID_MEAL_TYPES.includes(key) ? key : null;
}

/**
 * suitable_meals có đúng định dạng danh sách bữa ăn hợp lệ không.
 * VD hợp lệ: "breakfast", "lunch,dinner", "any". Trái lại: false.
 */
export function isValidSuitableMealsFormat(
  suitableMeals?: string | null,
): boolean {
  const parsed = parseSuitableMeals(suitableMeals);

  if (parsed.length === 0) {
    return false;
  }

  return parsed.every((meal) => VALID_MEAL_TYPES.includes(meal));
}

/**
 * Cặp (meal_type, suitable_meals) có nhất quán theo mapping chuẩn không.
 *
 * Dùng chung cho POST /recipes, PUT /recipes/:id và import công thức để cả 3
 * luồng sinh ra cùng một dạng dữ liệu bữa ăn (không có món "lunch" nhưng
 * suitable_meals lại là "breakfast").
 */
export function isConsistentMealPair(
  mealType?: string | null,
  suitableMeals?: string | null,
): boolean {
  const normalizedMealType = normalizeMealType(mealType);

  if (!normalizedMealType) {
    return false;
  }

  const expected = parseSuitableMeals(
    MEAL_TYPE_TO_SUITABLE_MEALS[normalizedMealType],
  );

  const actual = parseSuitableMeals(suitableMeals);

  if (actual.length === 0 || actual.length !== expected.length) {
    return false;
  }

  return actual.every((meal) => expected.includes(meal));
}

/**
 * Các meal_type hợp lệ khi IMPORT công thức.
 *
 * Chỉ lấy từ dữ liệu gốc (file seed Excel, sheet Mon_an): breakfast, lunch, snack.
 * 'dinner' không có trong dữ liệu gốc vì món ăn trưa đã phủ 'lunch,dinner'.
 */
export const IMPORT_MEAL_TYPES: string[] = [
  'breakfast',
  'lunch',
  'snack',
];

/**
 * Suy ra meal_type từ suitable_meals (ngược của deriveSuitableMeals).
 * VD: "lunch,dinner" -> "lunch", "breakfast" -> "breakfast", "any" -> "any".
 * Trả về null nếu không suy ra được (vd. "lunch,snack").
 */
export function deriveMealTypeFromSuitableMeals(
  suitableMeals?: string | null,
): string | null {
  const parsed = parseSuitableMeals(suitableMeals);

  if (parsed.length === 0) {
    return null;
  }

  for (const [mealType, mapped] of Object.entries(
    MEAL_TYPE_TO_SUITABLE_MEALS,
  )) {
    const expected = parseSuitableMeals(mapped);

    if (
      expected.length === parsed.length &&
      expected.every((meal) => parsed.includes(meal))
    ) {
      return mealType;
    }
  }

  return null;
}

/**
 * Tách suitable_meals thành danh sách bữa ăn (lowercase, bỏ khoảng trắng).
 */
export function parseSuitableMeals(
  value?: string | null,
): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((meal) => meal.trim().toLowerCase())
    .filter((meal) => meal.length > 0);
}

/**
 * Suy ra suitable_meals từ meal_type theo mapping chuẩn.
 * Trả về null nếu meal_type không nằm trong mapping.
 */
export function deriveSuitableMeals(
  mealType?: string | null,
): string | null {
  const key = mealType?.trim().toLowerCase();

  if (!key) {
    return null;
  }

  return MEAL_TYPE_TO_SUITABLE_MEALS[key] ?? null;
}

/**
 * Danh sách meal_type mà bữa ăn đang xét chấp nhận (dùng khi món chưa có
 * suitable_meals). VD: bữa 'dinner' nhận meal_type 'lunch' và 'dinner'.
 */
export function mealTypesSuitableFor(mealType: string): string[] {
  const requested = mealType.trim().toLowerCase();

  if (!requested) {
    return [];
  }

  return Object.keys(MEAL_TYPE_TO_SUITABLE_MEALS).filter((type) => {
    const suitable = parseSuitableMeals(
      MEAL_TYPE_TO_SUITABLE_MEALS[type],
    );

    return suitable.includes(requested) || suitable.includes('any');
  });
}

/**
 * Công thức có phù hợp với bữa ăn đang xét không.
 *
 * - Có suitable_meals: dùng suitable_meals làm nguồn chuẩn.
 * - Không có suitable_meals: suy ra từ meal_type theo mapping chuẩn.
 * - 'any' khớp mọi bữa ăn.
 */
export function isRecipeSuitableForMeal(
  recipe: {
    meal_type?: string | null;
    suitable_meals?: string | null;
  },
  mealType: string,
): boolean {
  const requestedMeal = mealType.trim().toLowerCase();

  if (!requestedMeal) {
    return true;
  }

  const recipeMealType = recipe.meal_type?.trim().toLowerCase() ?? '';
  const suitableMeals = parseSuitableMeals(recipe.suitable_meals);

  if (suitableMeals.length > 0) {
    if (suitableMeals.includes(requestedMeal)) {
      return true;
    }

    if (suitableMeals.includes('any') || recipeMealType === 'any') {
      return true;
    }

    // Món có suitable_meals riêng nhưng meal_type vẫn khớp bữa đang xét:
    // giữ hành vi cũ (lọc theo meal_type) cho các dòng dữ liệu lệch chuẩn.
    return recipeMealType === requestedMeal;
  }

  // Chưa có suitable_meals: suy ra từ meal_type theo mapping chuẩn.
  const derived = parseSuitableMeals(deriveSuitableMeals(recipeMealType));

  if (derived.length > 0) {
    return derived.includes(requestedMeal) || derived.includes('any');
  }

  return recipeMealType === requestedMeal || recipeMealType === 'any';
}
