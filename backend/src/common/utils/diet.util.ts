/**
 * Món (recipeDiet) có hợp với chế độ ăn chay của người dùng (userDiet) không.
 * Món chay thuần ăn được với mọi chế độ; lacto thêm sữa, ovo thêm trứng, ovo_lacto ăn được cả bốn loại.
 * Không có chế độ (userDiet rỗng) = không lọc.
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
  if (!user) return true;
  const allowed = ALLOWED_RECIPE_DIETS[user];
  if (!allowed) return true;
  return allowed.includes((recipeDiet ?? '').trim().toLowerCase());
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
