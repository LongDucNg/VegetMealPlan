/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeValidatorService } from './recipe-validator.service';
import {
  normalizeRecipeTitle,
  normalizeUnit,
  validateIngredientNamesKeyword,
  validateRecipeDietType,
} from './recipe-validation.util';

// ============================================================
// Validator DÙNG CHUNG cho 3 luồng BE2:
//   POST /recipes, PUT /recipes/:id, POST /admin/recipe-imports
//
// Bộ test này khẳng định:
//   1. Quy tắc KEYWORD trên TÊN NGUYÊN LIỆU.
//   2. Quy tắc DIET_TYPE cho 4 chế độ: vegan / lacto / ovo / ovo_lacto.
//   3. Cả 3 luồng (create / update / import) đều dùng CHUNG validator.
// ============================================================

const INGREDIENTS: Record<string, any> = {
  'thịt bò': {
    ingredient_id: 1,
    ingredient_name: 'Thịt bò',
    status: 'active',
    vegan_flag: true,
  },
  'cá hồi': {
    ingredient_id: 2,
    ingredient_name: 'Cá hồi',
    status: 'active',
    vegan_flag: true,
  },
  'tôm tươi': {
    ingredient_id: 3,
    ingredient_name: 'Tôm tươi',
    status: 'active',
    vegan_flag: true,
  },
  'thịt bò chay': {
    ingredient_id: 4,
    ingredient_name: 'Thịt bò chay',
    status: 'active',
    vegan_flag: true,
  },
  'cá chay': {
    ingredient_id: 5,
    ingredient_name: 'Cá chay',
    status: 'active',
    vegan_flag: true,
  },
  'gà chay': {
    ingredient_id: 6,
    ingredient_name: 'Gà chay',
    status: 'active',
    vegan_flag: true,
  },
  'đậu hũ': {
    ingredient_id: 7,
    ingredient_name: 'Đậu hũ',
    status: 'active',
    vegan_flag: true,
  },
  'nấm rơm': {
    ingredient_id: 8,
    ingredient_name: 'Nấm rơm',
    status: 'active',
    vegan_flag: true,
  },
  'rau muống': {
    ingredient_id: 9,
    ingredient_name: 'Rau muống',
    status: 'active',
    vegan_flag: true,
  },
  'sữa tươi': {
    ingredient_id: 10,
    ingredient_name: 'Sữa tươi',
    status: 'active',
    vegan_flag: true,
  },
  'trứng gà': {
    ingredient_id: 11,
    ingredient_name: 'Trứng gà',
    status: 'active',
    vegan_flag: true,
  },
  'sữa đậu nành': {
    ingredient_id: 12,
    ingredient_name: 'Sữa đậu nành',
    status: 'active',
    vegan_flag: true,
  },
};

const norm = (s: any) =>
  String(s ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

function buildIngredientService() {
  return {
    findByIds: async (ids: number[]) =>
      Object.values(INGREDIENTS).filter((i) =>
        ids.includes(i.ingredient_id),
      ),
    findByName: async (name: string) =>
      Object.values(INGREDIENTS).find(
        (i) => norm(i.ingredient_name) === norm(name),
      ) ?? null,
  } as any;
}

const validator = new RecipeValidatorService(buildIngredientService());

// ─────────────────────────────────────────────────────────────
// 1. QUY TẮC KEYWORD TRÊN TÊN NGUYÊN LIỆU
// ─────────────────────────────────────────────────────────────
describe('BƯỚC 1 - keyword trên tên nguyên liệu', () => {
  it.each([
    ['Thịt bò', ['thịt', 'bò']],
    ['Cá hồi', ['cá']],
    ['Tôm tươi', ['tôm']],
  ])('chặn "%s" (có keyword mặn, không có từ "chay")', (name, expected) => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: name },
    ]);

    expect(res.isValid).toBe(false);
    expect(res.violations[0].ingredient_name).toBe(name);
    expected.forEach((kw) =>
      expect(res.violations[0].reason).toContain(kw),
    );
  });

  it.each(['Thịt bò chay', 'Cá chay', 'Gà chay'])(
    'cho qua "%s" (có keyword mặn NHƯNG có từ riêng biệt "chay")',
    (name) => {
      const res = validateIngredientNamesKeyword([
        { ingredient_name: name },
      ]);

      expect(res.isValid).toBe(true);
      expect(res.violations).toEqual([]);
    },
  );

  it.each(['Đậu hũ', 'Nấm rơm', 'Rau muống'])(
    'cho qua "%s" (không có keyword mặn)',
    (name) => {
      const res = validateIngredientNamesKeyword([
        { ingredient_name: name },
      ]);

      expect(res.isValid).toBe(true);
    },
  );

  it('không bắt nhầm từ chứa keyword là tiếp vĩnh ("Cà chua", "Bí đỏ")', () => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: 'Cà chua' },
      { ingredient_name: 'Bí đỏ' },
    ]);

    expect(res.isValid).toBe(true);
  });

  it('không bắt nhầm tên cây/rau có chứa từ mặn ("Đậu gà", "Nấm đùi gà")', () => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: 'Đậu gà' },
      { ingredient_name: 'Nấm đùi gà' },
    ]);

    expect(res.isValid).toBe(true);
  });

  it('chuẩn hoá hoa/thường + khoảng trắng + dấu khi dò keyword', () => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: '  THỊT   BÒ  ' },
    ]);

    expect(res.isValid).toBe(false);
  });

  it('từ "chay" dính chữ khác KHÔNG phải ngoại lệ ("Chaymay")', () => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: 'Thịt Chaymay' },
    ]);
    expect(res.isValid).toBe(false);
  });

  // Regression: ngoại lệ "chay" chỉ áp dụng cho MỆNH ĐỀ có "chay".
  // Trước đây "Thịt bò chay và cá hồi" lọt qua vì cả tên có token "chay".
  it('ngoại lệ "chay" KHÔNG che mệnh đề khác trong tên gộp ("... chay và cá hồi")', () => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: 'Thịt bò chay và cá hồi' },
    ]);

    expect(res.isValid).toBe(false);
    expect(res.violations[0].reason).toContain('cá');
  });

  it('ngoại lệ "chay" KHÔNG che mệnh đề khác ("Gà chay, thịt heo")', () => {
    const res = validateIngredientNamesKeyword([
      { ingredient_name: 'Gà chay, thịt heo' },
    ]);

    expect(res.isValid).toBe(false);
    expect(res.violations[0].reason).toContain('thịt');
  });
});

// ─────────────────────────────────────────────────────────────
// 2. QUY TẮC DIET_TYPE - 4 CHẾ ĐỘ
// ─────────────────────────────────────────────────────────────
describe('BƯỚC 2 - diet_type (vegan / lacto / ovo / ovo_lacto)', () => {
  it('vegan: chặn thịt/cá, trứng, sữa', () => {
    expect(
      validateRecipeDietType('vegan', [
        { ingredient_name: 'Thịt bò' },
      ]).isValid,
    ).toBe(false);

    expect(
      validateRecipeDietType('vegan', [
        { ingredient_name: 'Trứng gà' },
      ]).isValid,
    ).toBe(false);

    expect(
      validateRecipeDietType('vegan', [
        { ingredient_name: 'Sữa tươi' },
      ]).isValid,
    ).toBe(false);

    expect(
      validateRecipeDietType('vegan', [
        { ingredient_name: 'Đậu hũ' },
      ]).isValid,
    ).toBe(true);
  });

  it('lacto: cho phép sữa, chặn thịt/cá/trứng', () => {
    expect(
      validateRecipeDietType('lacto', [
        { ingredient_name: 'Sữa tươi' },
      ]).isValid,
    ).toBe(true);

    expect(
      validateRecipeDietType('lacto', [
        { ingredient_name: 'Trứng gà' },
      ]).isValid,
    ).toBe(false);

    expect(
      validateRecipeDietType('lacto', [
        { ingredient_name: 'Cá hồi' },
      ]).isValid,
    ).toBe(false);
  });

  it('ovo: cho phép trứng, chặn thịt/cá/sữa', () => {
    expect(
      validateRecipeDietType('ovo', [
        { ingredient_name: 'Trứng gà' },
      ]).isValid,
    ).toBe(true);

    expect(
      validateRecipeDietType('ovo', [
        { ingredient_name: 'Sữa tươi' },
      ]).isValid,
    ).toBe(false);

    expect(
      validateRecipeDietType('ovo', [
        { ingredient_name: 'Thịt bò' },
      ]).isValid,
    ).toBe(false);
  });

  it('ovo_lacto: cho phép trứng + sữa, chặn thịt/cá', () => {
    expect(
      validateRecipeDietType('ovo_lacto', [
        { ingredient_name: 'Trứng gà' },
      ]).isValid,
    ).toBe(true);

    expect(
      validateRecipeDietType('ovo_lacto', [
        { ingredient_name: 'Sữa tươi' },
      ]).isValid,
    ).toBe(true);

    expect(
      validateRecipeDietType('ovo_lacto', [
        { ingredient_name: 'Cá hồi' },
      ]).isValid,
    ).toBe(false);
  });

  it('ngoại lệ "chay" KHÔNG bỏ qua kiểm tra thành phần (trứng/sữa)', () => {
    // "Trứng gà chay" vẫn là trứng -> vegan phải chặn.
    expect(
      validateRecipeDietType('vegan', [
        { ingredient_name: 'Trứng gà chay' },
      ]).isValid,
    ).toBe(false);

    // "Sữa tươi chay" vẫn là sữa -> vegan phải chặn.
    expect(
      validateRecipeDietType('vegan', [
        { ingredient_name: 'Sữa tươi chay' },
      ]).isValid,
    ).toBe(false);
  });

  it('ngoại lệ "chay" KHÔNG bỏ qua vegan_flag = false', () => {
    const res = validateRecipeDietType('vegan', [
      { ingredient_name: 'Thịt bò chay', vegan_flag: false },
    ]);

    expect(res.isValid).toBe(false);
    expect(res.violations[0].reason).toContain('thịt');
  });

  // Regression: "chay" chỉ bỏ qua regex thịt cho MỆNH ĐỀ có "chay".
  it('ngoại lệ "chay" KHÔNG che thịt/cá ở mệnh đề khác trong tên gộp', () => {
    const res = validateRecipeDietType('vegan', [
      { ingredient_name: 'Thịt bò chay và cá hồi' },
    ]);

    expect(res.isValid).toBe(false);
    expect(res.violations[0].reason).toContain('thịt');
  });
});

// ─────────────────────────────────────────────────────────────
// 3. 3 LUỒNG DÙNG CHUNG VALIDATOR
// ─────────────────────────────────────────────────────────────
describe('Validator dùng chung - create / update / import', () => {
  it('API (create + update): chặn nguyên liệu mặn theo tên', async () => {
    const res = await validator.validateApiIngredients(
      [{ ingredient_id: 1, quantity: 100, unit: 'g' }],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.length).toBeGreaterThan(0);
  });

  it('API: chặn nguyên liệu trùng lặp', async () => {
    const res = await validator.validateApiIngredients(
      [
        { ingredient_id: 7, quantity: 100, unit: 'g' },
        { ingredient_id: 7, quantity: 50, unit: 'g' },
      ],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.some((v) => v.reason.includes('lặp lại'))).toBe(
      true,
    );
  });

  it('API: chặn nguyên liệu không tồn tại', async () => {
    const res = await validator.validateApiIngredients(
      [{ ingredient_id: 999, quantity: 100, unit: 'g' }],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.some((v) => v.reason.includes('không tồn tại'))).toBe(
      true,
    );
  });

  it('API: chặn nguyên liệu ngưng hoạt động', async () => {
    const ingredientService = buildIngredientService();
    ingredientService.findByIds = async (ids: number[]) =>
      ids.map((id) => ({
        ingredient_id: id,
        ingredient_name: 'Thịt bò',
        status: 'inactive',
        vegan_flag: true,
      }));

    const svc = new RecipeValidatorService(ingredientService);
    const res = await svc.validateApiIngredients(
      [{ ingredient_id: 1, quantity: 100, unit: 'g' }],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.some((v) => v.reason.includes('ngưng hoạt động'))).toBe(
      true,
    );
  });

  it('API: quantity <= 0 bị chặn', async () => {
    const res = await validator.validateApiIngredients(
      [{ ingredient_id: 7, quantity: 0, unit: 'g' }],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.some((v) => v.reason.includes('lớn hơn 0'))).toBe(
      true,
    );
  });

  it('API: đơn vị khác "g" bị chặn', async () => {
    const res = await validator.validateApiIngredients(
      [{ ingredient_id: 7, quantity: 100, unit: 'kg' }],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.some((v) => v.reason.includes('đơn vị'))).toBe(
      true,
    );
  });

  it('API: đơn vị "G" (hoa) và " g " (khoảng trắng) được chấp nhận', async () => {
    const res = await validator.validateApiIngredients(
      [{ ingredient_id: 7, quantity: 100, unit: ' G ' }],
      'vegan',
    );

    expect(res.isValid).toBe(true);
  });

  it('Import: dùng CHUNG quy tắc keyword + diet_type với API', async () => {
    const res = await validator.validateImportIngredients(
      [{ ingredient_name: 'Thịt bò', quantity: 100, unit: 'g' }],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.length).toBeGreaterThan(0);
  });

  it('Import: nguyên liệu "chay" qua được bước keyword', async () => {
    const res = await validator.validateImportIngredients(
      [{ ingredient_name: 'Thịt bò chay', quantity: 100, unit: 'g' }],
      'vegan',
    );

    expect(res.isValid).toBe(true);
  });

  it('Import: nguyên liệu lặp lại bị chặn', async () => {
    const res = await validator.validateImportIngredients(
      [
        { ingredient_name: 'Đậu hũ', quantity: 100, unit: 'g' },
        { ingredient_name: 'đậu hũ', quantity: 50, unit: 'g' },
      ],
      'vegan',
    );

    expect(res.isValid).toBe(false);
    expect(res.violations.some((v) => v.reason.includes('lặp lại'))).toBe(
      true,
    );
  });

  it('Import: cho phép trứng với diet_type ovo', async () => {
    const res = await validator.validateImportIngredients(
      [{ ingredient_name: 'Trứng gà', quantity: 100, unit: 'g' }],
      'ovo',
    );

    expect(res.isValid).toBe(true);
  });

  it('Import: cho phép sữa với diet_type lacto', async () => {
    const res = await validator.validateImportIngredients(
      [{ ingredient_name: 'Sữa tươi', quantity: 100, unit: 'g' }],
      'lacto',
    );

    expect(res.isValid).toBe(true);
  });

  it('Import: chặn sữa với diet_type ovo', async () => {
    const res = await validator.validateImportIngredients(
      [{ ingredient_name: 'Sữa tươi', quantity: 100, unit: 'g' }],
      'ovo',
    );

    expect(res.isValid).toBe(false);
  });

  it('Import: "chay" không bỏ qua check vegan_flag = false', async () => {
    const res = await validator.validateImportIngredients(
      [{ ingredient_name: 'Thịt bò chay', quantity: 100, unit: 'g' }],
      'vegan',
    );

    // "Thịt bò chay" tồn tại trong DB với vegan_flag = true -> hợp lệ.
    expect(res.isValid).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// 4. HELPER
// ─────────────────────────────────────────────────────────────
describe('Helper chuẩn hoá', () => {
  it('normalizeUnit: trim + không phân biệt hoa thường', () => {
    expect(normalizeUnit('  G ')).toBe('g');
    expect(normalizeUnit('Kg')).toBe('kg');
  });

  it('normalizeRecipeTitle: gộp khoảng trắng + không phân biệt hoa thường', () => {
    expect(normalizeRecipeTitle('  Món   Ngon  ')).toBe('món ngon');
  });
});
