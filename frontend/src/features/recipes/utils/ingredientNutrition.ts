import { SYSTEM_INGREDIENT_CALORIES } from "../data/ingredientCaloriesData";

export function normalizeIngredientName(name?: string): string {
  return (name || "").toLowerCase().trim();
}

/**
 * Lấy chỉ số calo trên 100g của nguyên liệu.
 * Ưu tiên chỉ số truyền vào từ backend (nếu có), nếu không sẽ tra cứu theo từ điển chuẩn 190+ nguyên liệu.
 */
export function getIngredientCaloriesPer100g(
  name?: string,
  givenCalPer100?: number | null
): number {
  if (
    givenCalPer100 !== undefined &&
    givenCalPer100 !== null &&
    !isNaN(Number(givenCalPer100)) &&
    Number(givenCalPer100) >= 0
  ) {
    return Math.round(Number(givenCalPer100) * 100) / 100;
  }
  if (!name) return 0;

  // 1. Khớp chính xác tên gốc
  if (SYSTEM_INGREDIENT_CALORIES[name] !== undefined) {
    return Math.round(SYSTEM_INGREDIENT_CALORIES[name] * 100) / 100;
  }

  const n = normalizeIngredientName(name);

  // 2. Khớp case-insensitive
  for (const [k, v] of Object.entries(SYSTEM_INGREDIENT_CALORIES)) {
    if (normalizeIngredientName(k) === n) return Math.round(v * 100) / 100;
  }

  // 3. Khớp chuỗi con
  for (const [k, v] of Object.entries(SYSTEM_INGREDIENT_CALORIES)) {
    const kn = normalizeIngredientName(k);
    if (n.includes(kn) || kn.includes(n)) return Math.round(v * 100) / 100;
  }

  return 0;
}

/**
 * Tính tổng calo cho lượng nguyên liệu tương ứng theo đơn vị (làm tròn tối đa 2 chữ số thập phân).
 */
export function calculateIngredientCalories(
  quantityRaw: number | string,
  unitRaw: string = "g",
  caloriesPer100g: number = 0
): number {
  if (!caloriesPer100g || isNaN(caloriesPer100g) || caloriesPer100g <= 0) {
    return 0;
  }

  const qty = typeof quantityRaw === "number" ? quantityRaw : parseFloat(String(quantityRaw)) || 0;
  if (qty <= 0) return 0;

  const unit = (unitRaw || "g").toLowerCase().trim();

  let grams = qty;
  if (unit === "kg" || unit === "l" || unit === "liter" || unit === "lít") {
    grams = qty * 1000;
  } else if (unit === "tbsp" || unit === "muỗng canh") {
    grams = qty * 15;
  } else if (unit === "tsp" || unit === "muỗng cà phê") {
    grams = qty * 5;
  } else if (unit === "g" || unit === "gram" || unit === "grams" || unit === "ml") {
    grams = qty;
  } else if (
    unit === "pc" ||
    unit === "pcs" ||
    unit === "quả" ||
    unit === "trái" ||
    unit === "củ" ||
    unit === "tép" ||
    unit === "cây" ||
    unit === "lá"
  ) {
    grams = qty * 80;
  } else {
    grams = qty >= 10 ? qty : qty * 80;
  }

  return Math.round(((grams / 100) * caloriesPer100g) * 100) / 100;
}

/**
 * Định dạng calo làm tròn tối đa 2 chữ số thập phân và thêm tiền tố ~ (ví dụ: ~302.47 kcal, ~15 kcal)
 */
export function formatCalories(val: number | string | null | undefined): string {
  if (val === undefined || val === null || val === "") return "~0 kcal";
  const n = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  if (isNaN(n) || n <= 0) return "~0 kcal";
  const rounded = Math.round(n * 100) / 100;
  return `~${rounded} kcal`;
}
