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

export function categorizeIngredient(ingredientName: string, veganFlag: boolean): IngredientDietCategory {
  const name = ingredientName ?? '';
  const isMeat = !veganFlag || NON_VEGAN_MEAT_REGEX.test(name);
  const isEgg = EGG_REGEX.test(name);
  const isDairy = DAIRY_REGEX.test(name);
  return { isMeat, isEgg, isDairy };
}

export function checkIngredientDietViolation(
  ingredientName: string,
  veganFlag: boolean,
  userDiet: string | null | undefined,
): string | null {
  const diet = userDiet?.trim().toLowerCase();
  if (!diet) return null;

  const { isMeat, isEgg, isDairy } = categorizeIngredient(ingredientName, veganFlag);

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
