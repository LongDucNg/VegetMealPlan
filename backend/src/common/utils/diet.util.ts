/**
 * Mon (recipeDiet) co hop voi che do an chay cua nguoi dung (userDiet) khong.
 * Mon chay thuan an duoc voi moi che do; lacto them sua, ovo them trung, ovo_lacto an duoc ca bon loai.
 * Khong co che do (userDiet rong) = khong loc.
 */
const ALLOWED_RECIPE_DIETS: Record<string, string[]> = {
  vegan: ['vegan'],
  lacto: ['vegan', 'lacto'],
  ovo: ['vegan', 'ovo'],
  ovo_lacto: ['vegan', 'lacto', 'ovo', 'ovo_lacto'],
};

export function isRecipeDietCompatible(
  userDiet?: string | null,
  recipeDiet?: string | null,
): boolean {
  const user = userDiet?.trim().toLowerCase();
  if (!user) return true;            // User chưa thiết lập chế độ ăn → không lọc
  const allowed = ALLOWED_RECIPE_DIETS[user];
  if (!allowed) return true;         // Chế độ ăn chưa biết → không lọc
  const recipe = recipeDiet?.trim().toLowerCase();
  if (!recipe) return false;         // Recipe chưa gán diet_type → không hiển thị cho user có chế độ ăn chay
  return allowed.includes(recipe);
}

// ============================================================
// PHAN LOAI NGUYEN LIEU THEO CHE DO AN CHAY
// ============================================================

export const DAIRY_REGEX =
  /sữa\s*(tươi|đặc|bột|dê|hạt|chua)|bơ\s*(lạt|động\s*vật)|phô\s*mai|cream\s*cheese|kem\s*(tươi|đặc)|sữa\s*chua|yogurt|yaourt|whey|ghee|ricotta|mascarpone|mozzarella|cheddar|parmesan|feta/i;

export const EGG_REGEX = /trứng/i;

export const NON_VEGAN_MEAT_REGEX =
  /thịt\s*(heo|lợn|bò|gà|cừu|dê|vịt|ngan|ngựa)|ba\s*chỉ|ba\s*rọi|thăn\s*heo|sườn|giò\s*(heo|lợn)|chân\s*giò|lạp\s*xưởng|dăm\s*bông|xúc\s*xích|bacon|salami|chorizo|thịt\s*xông\s*khói|cá\s*(hồi|thu|ngừ|chép|trê|lóc|basa|rô|diêu\s*hồng|mú|vược)|tôm\s*(sú|thẻ|hùm|khô)|cua\s*(biển|đồng)|ghẹ|mực\s*(ống|nang)|bạch\s*tuộc|ngao|nghêu|sò\s*huyết|hàu|ốc\s*(hương|bươu)|lươn|ếch|nước\s*mắm|mắm\s*(tôm|ruốc|nêm|cá)|bột\s*cá|dầu\s*cá|fish\s*sauce|oyster\s*sauce/i;

export interface IngredientDietCategory {
  isMeat: boolean;
  isEgg: boolean;
  isDairy: boolean;
}

/**
 * Từ "chay" đứng riêng trong tên nguyên liệu (vd. "Thịt bò chay", "Cá chay").
 */
export const STANDALONE_CHAY_REGEX = /(?<![\p{L}\p{N}])chay(?![\p{L}\p{N}])/u;

/**
 * Tên nguyên liệu có phải sản phẩm "chay" (có từ riêng biệt "chay") không.
 */
export function hasStandaloneChayToken(ingredientName: string): boolean {
  return STANDALONE_CHAY_REGEX.test(
    (ingredientName ?? '').normalize('NFC').toLowerCase(),
  );
}

/**
 * Tách tên nguyên liệu thành các mệnh đề độc lập.
 *
 * Ngoại lệ "chay" chỉ áp dụng cho MỆNH ĐỀ có chứa từ "chay".
 * Nếu áp dụng cho cả tên thì "Thịt bò chay và cá hồi" lọt qua dù có cá thật.
 *
 * Dùng lookaround Unicode ((?<![\p{L}\p{N}]) / (?![\p{L}\p{N}])) vì \b của JS
 * chỉ coi là word char các ký tự ASCII -> "và" (có dấu) không khớp \bvà\b.
 */
export function splitIntoClauses(text: string): string[] {
  return (text ?? '')
    .split(
      /[,;+/\n]|(?<![\p{L}\p{N}])(?:và|hoặc|hay|hay là|and|or)(?![\p{L}\p{N}])/giu,
    )
    .map((clause) => clause.trim())
    .filter((clause) => clause.length > 0);
}

/**
 * Phân loại nguyên liệu theo chế độ ăn chay.
 *
 * @param veganFlag cờ "thuần chay" do admin/admin quản lý trong DB.
 * @param options.allowChayException nếu true, tên nguyên liệu có từ riêng biệt
 *        "chay" sẽ KHÔNG bị coi là thịt/cá theo regex tên (vd. "Thịt bò chay",
 *        "Nước mắm chay"). Lưu ý: cờ `vegan_flag` vẫn được kiểm tra độc lập
 *        (vegan_flag = false => vẫn là thịt), và ngoại lệ này KHÔNG bỏ qua
 *        kiểm tra thành phần trứng/sữa.
 */
export function categorizeIngredient(
  ingredientName: string,
  veganFlag: boolean,
  options: { allowChayException?: boolean } = {},
): IngredientDietCategory {
  const name = ingredientName ?? '';

  // vegan_flag = false luôn bị coi là thịt, kể cả khi tên có chữ "chay".
  if (!veganFlag) {
    return {
      isMeat: true,
      isEgg: EGG_REGEX.test(name),
      isDairy: DAIRY_REGEX.test(name),
    };
  }

  // Ngoại lệ "chay" chỉ áp dụng cho mệnh đề CHỨA từ "chay".
  // VD: "Thịt bò chay" -> hợp lệ; "Thịt bò chay và cá hồi" -> "cá hồi" vẫn là cá.
  const clauses =
    options.allowChayException === true
      ? splitIntoClauses(name)
      : [name];

  const effectiveName = clauses.length > 0 ? clauses : [name];

  const isMeat = effectiveName.some(
    (clause) =>
      !hasStandaloneChayToken(clause) &&
      NON_VEGAN_MEAT_REGEX.test(clause),
  );

  const isEgg = EGG_REGEX.test(name);
  const isDairy = DAIRY_REGEX.test(name);
  return { isMeat, isEgg, isDairy };
}

export function checkIngredientDietViolation(
  ingredientName: string,
  veganFlag: boolean,
  userDiet: string | null | undefined,
  options: { allowChayException?: boolean } = {},
): string | null {
  const diet = userDiet?.trim().toLowerCase();
  if (!diet) return null;

  const { isMeat, isEgg, isDairy } = categorizeIngredient(
    ingredientName,
    veganFlag,
    options,
  );

  // Thit man / hai san: TAT CA che do an chay deu phai chan
  if (isMeat) {
    const dietLabel: Record<string, string> = {
      vegan: 'Thuần chay (Vegan)',
      lacto: 'Chay có sữa (Lacto)',
      ovo: 'Chay có trứng (Ovo)',
      ovo_lacto: 'Chay trứng-sữa (Ovo-Lacto)',
    };
    return (
      `Nguyên liệu "${ingredientName}" là thịt, cá hoặc hải sản — ` +
      `không được phép thêm vào kho với chế độ ăn chay ${dietLabel[diet] ?? diet}.`
    );
  }

  switch (diet) {
    // Thuan chay: khong trung, khong sua
    case 'vegan':
      if (isEgg)
        return `Nguyên liệu "${ingredientName}" chứa trứng — không phù hợp với chế độ Thuần chay (Vegan).`;
      if (isDairy)
        return `Nguyên liệu "${ingredientName}" là sản phẩm từ sữa — không phù hợp với chế độ Thuần chay (Vegan).`;
      break;

    // Chay co sua: duoc sua, KHONG duoc trung
    case 'lacto':
      if (isEgg)
        return (
          `Nguyên liệu "${ingredientName}" chứa trứng — không phù hợp với chế độ Chay có sữa (Lacto). ` +
          `Chế độ này cho phép sữa nhưng không dùng trứng.`
        );
      break;

    // Chay co trung: duoc trung, KHONG duoc sua
    case 'ovo':
      if (isDairy)
        return (
          `Nguyên liệu "${ingredientName}" là sản phẩm từ sữa — không phù hợp với chế độ Chay có trứng (Ovo). ` +
          `Chế độ này cho phép trứng nhưng không dùng sữa.`
        );
      break;

    // Chay trung-sua: duoc ca trung lan sua, chi chan thit man (da xu ly o tren)
    case 'ovo_lacto':
      break;
  }

  return null; // Hop le
}

/**
 * Danh sách diet_type của công thức mà người dùng theo chế độ `userDiet` ăn được.
 * Dùng cho lọc ở API duyệt công thức (GET /recipes) để lọc đúng như lúc sinh
 * thực đơn, thay vì so sánh bằng đẳng thức (lacto chỉ thấy đúng món lacto).
 *
 * Trả null = không lọc (thiếu chế độ ăn, hoặc chế độ không nằm trong enum).
 */
export function getAllowedRecipeDiets(
  userDiet?: string | null,
): string[] | null {
  const user = userDiet?.trim().toLowerCase();
  if (!user) return null;
  const allowed = ALLOWED_RECIPE_DIETS[user];
  if (!allowed) return null;
  return allowed;
}
