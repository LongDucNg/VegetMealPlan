// Quy tắc giá nguyên liệu của BE2 (đã thống nhất):
// - ingredients.avg_price_per_unit LUÔN là VNĐ/kg, bất kể ingredients.unit
//   để là g / kg / củ / trái / miếng... (giá nhập từ bảng giá theo kg).
// - Công thức món (recipe_ingredients.unit) chỉ quy đổi được sang gram khi
//   đơn vị là đơn vị khối lượng (g, kg, mg) hoặc thể tích (ml, l, tsp, tbsp).
// - Nguyên liệu tính theo đơn vị đếm (miếng / trái / củ / ổ / tờ / quả / tép)
//   KHÔNG có khối lượng từng cái trong hệ thống => KHÔNG tự đoán.
//   Trong trường hợp đó cost = null để lớp gọi biết là không tính được,
//   tuyệt đối không dùng "quantity * giá/kg" (sai ~1000 lần).

type UnitGroup = 'mass' | 'volume' | 'count';

interface UnitInfo {
  group: UnitGroup;
  // Hệ số quy về gram: mass (g -> 1, kg -> 1000), volume (1 ml ~ 1 g)
  factor: number;
}

const UNIT_ALIASES: Record<string, string> = {
  gram: 'g',
  gam: 'g',
  gr: 'g',
  kilogram: 'kg',
  kilo: 'kg',
  lit: 'l',
  liter: 'l',
  litre: 'l',
  mililit: 'ml',
  milliliter: 'ml',
  'thia canh': 'tbsp',
  'muong canh': 'tbsp',
  thia: 'tbsp',
  muong: 'tbsp',
  'thia ca phe': 'tsp',
  'muong ca phe': 'tsp',
  'thia nho': 'tsp',
};

const UNIT_TABLE: Record<string, UnitInfo> = {
  mg: { group: 'mass', factor: 0.001 },
  g: { group: 'mass', factor: 1 },
  kg: { group: 'mass', factor: 1000 },
  ml: { group: 'volume', factor: 1 },
  l: { group: 'volume', factor: 1000 },
  tsp: { group: 'volume', factor: 5 },
  tbsp: { group: 'volume', factor: 15 },
};

function normalizeUnit(unit?: string | null): string {
  const cleaned = (unit ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ');

  return UNIT_ALIASES[cleaned] ?? cleaned;
}

/**
 * Quy đổi quantity sang gram.
 * - Trả về null khi đơn vị là đơn vị đếm (miếng / trái / củ / ổ / tờ / quả /
 *   tép) hoặc đơn vị lạ: hệ thống không có trọng lượng từng cái nên không
 *   được tự đoán.
 */
export function convertToGrams(
  quantity: number,
  unit?: string | null,
): number | null {
  const normalized = normalizeUnit(unit);
  const info = UNIT_TABLE[normalized];

  if (!info) {
    return null;
  }

  return Number(quantity || 0) * info.factor;
}

export interface IngredientCostResult {
  // null = không tính được (thiếu giá hoặc đơn vị không quy đổi được)
  cost: number | null;
  // true = đã quy đổi được quantity sang gram để nhân với giá/kg
  converted: boolean;
}

/**
 * Chi phí một dòng nguyên liệu = khối lượng(g) * giá/kg / 1000.
 *
 * price luôn là VNĐ/kg (xem quy tắc đầu file). Nếu đơn vị công thức không
 * quy đổi được sang gram thì trả cost = null (không tự đoán trọng lượng).
 */
export function calculateIngredientCost(
  quantity: number,
  recipeUnit: string | null | undefined,
  price: number | null | undefined,
): IngredientCostResult {
  if (price === null || price === undefined || Number.isNaN(Number(price))) {
    return { cost: null, converted: false };
  }

  const grams = convertToGrams(quantity, recipeUnit);

  if (grams === null) {
    return { cost: null, converted: false };
  }

  return {
    cost: (grams * Number(price)) / 1000,
    converted: true,
  };
}

export interface RecipeCostLine {
  quantity: number;
  unit: string | null | undefined;
  price: number | null | undefined;
}

export interface RecipeCostResult {
  // null = không tính được trọn món (thiếu giá hoặc đơn vị không quy đổi được)
  total_cost: number | null;
  is_complete: boolean;
}

/**
 * Tổng giá món = tổng giá các nguyên liệu.
 * Chỉ trả tổng khi MỌI dòng đều tính được; nếu có dòng không tính được thì
 * total_cost = null (không lưu tổng thiếu như giá đầy đủ).
 *
 * Món KHÔNG có nguyên liệu nào cũng trả null chứ không phải 0: 0đ là một
 * giá hoàn chỉnh, còn "không có nguyên liệu" là chưa tính được.
 */
export function calculateRecipeTotalCost(
  lines: RecipeCostLine[],
): RecipeCostResult {
  let total = 0;
  let isComplete = lines.length > 0;

  for (const line of lines) {
    const { cost } = calculateIngredientCost(
      line.quantity,
      line.unit,
      line.price,
    );

    if (cost === null) {
      isComplete = false;
      continue;
    }

    total += cost;
  }

  return {
    total_cost: isComplete ? Math.round(total) : null,
    is_complete: isComplete,
  };
}
