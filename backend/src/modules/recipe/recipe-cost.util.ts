// Quy đổi đơn vị để tính giá nguyên liệu.
// Giá nguyên liệu (ingredients.avg_price_per_unit) tính theo ingredients.unit,
// còn số lượng trong công thức (recipe_ingredients.unit) có thể là đơn vị khác.

type UnitGroup = 'mass' | 'volume' | 'count';

interface UnitInfo {
  group: UnitGroup;
  // Hệ số quy về đơn vị gốc: mass -> g, volume -> ml, count -> 1
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

function getUnitInfo(unit: string): UnitInfo {
  return UNIT_TABLE[unit] ?? { group: 'count', factor: 1 };
}

/**
 * Quy đổi quantity từ đơn vị `fromUnit` sang `toUnit`.
 * - Cùng nhóm (khối lượng/thể tích): quy đổi theo hệ số.
 * - Khối lượng <-> thể tích: xấp xỉ 1 ml = 1 g.
 * - Đơn vị đếm (quả, củ, cái...): chỉ quy đổi được khi trùng tên đơn vị;
 *   nếu không thì trả về null để bên gọi biết không quy đổi được.
 */
export function convertQuantity(
  quantity: number,
  fromUnit?: string | null,
  toUnit?: string | null,
): number | null {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);

  if (from === to) {
    return quantity;
  }

  const fromInfo = getUnitInfo(from);
  const toInfo = getUnitInfo(to);

  if (fromInfo.group === 'count' || toInfo.group === 'count') {
    return null;
  }

  return (quantity * fromInfo.factor) / toInfo.factor;
}

export interface IngredientCostResult {
  cost: number;
  converted: boolean;
}

/**
 * Chi phí một dòng nguyên liệu = số lượng (đã đổi sang đơn vị tính giá) × giá.
 *
 * Quy ước dữ liệu của dự án: nguyên liệu có ingredients.unit = "g" (hoặc trống)
 * thì avg_price_per_unit là GIÁ MỖI KG (vd. bún tươi 20.000đ/kg), không phải mỗi gram.
 * Với nguyên liệu tính giá theo quả/củ/miếng... mà công thức ghi bằng gram,
 * không có khối lượng mỗi quả nên tạm tính như giá/kg (ước tính, converted = false).
 */
export function calculateIngredientCost(
  quantity: number,
  recipeUnit: string | null | undefined,
  priceUnit: string | null | undefined,
  price: number,
): IngredientCostResult {
  const normalizedPriceUnit = normalizeUnit(priceUnit);
  const effectivePriceUnit =
    normalizedPriceUnit === '' || normalizedPriceUnit === 'g'
      ? 'kg'
      : normalizedPriceUnit;

  const converted = convertQuantity(quantity, recipeUnit, effectivePriceUnit);

  if (converted !== null) {
    return { cost: converted * price, converted: true };
  }

  // Không quy đổi được (vd. công thức "g" nhưng giá theo "quả").
  if (getUnitInfo(normalizeUnit(recipeUnit)).group === 'mass') {
    return {
      cost: convertQuantity(quantity, recipeUnit, 'kg')! * price,
      converted: false,
    };
  }

  return { cost: quantity * price, converted: false };
}
