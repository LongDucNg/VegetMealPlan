import { BadRequestException } from '@nestjs/common';
import { DietType } from '../../modules/users/entities/user.entity';
import { ErrorCode } from '../constants/error-codes.enum';

/**
 * Kiểm tra tính tương thích giữa chế độ ăn chay (diet_type) của công thức và
 * nguyên liệu thực tế đứng trong công thức đó.
 *
 * ============================ CĂN CỨ ============================
 * 1. Dữ liệu phân loại nguyên liệu trong DB CHỈ có cột `ingredients.vegan_flag`
 *    (xem migration InitSchema: CREATE TABLE "ingredients" (... "vegan_flag"
 *    boolean NOT NULL DEFAULT true ...)). Bảng KHÔNG có cột allergens/group,
 *    dù file seed ingredients.json có (dữ liệu đó không được lưu xuống DB).
 *    => `vegan_flag = true`  : phù hợp với chế độ thuần chay.
 *    => `vegan_flag = false` : KHÔNG phù hợp thuần chay (có thể là thịt, cá,
 *       trứng, sữa, mật ong...).
 * 2. Dữ liệu seed hiện tại (628 công thức) phân bố rất rõ:
 *      - vegan      : CHỈ dùng nguyên liệu vegan_flag = true.
 *      - ovo        : nguyên liệu vegan_flag = false chỉ có TRỨNG.
 *      - lacto      : nguyên liệu vegan_flag = false chỉ có SỮA + MẬT ONG.
 *      - ovo_lacto  : cả trứng lẫn sữa.
 *    => ma trận tương thích bên dưới bám sát dữ liệu thực tế của dự án.
 * 3. Vì schema không phân biệt được "trứng" với "sữa" (cùng đều là
 *    vegan_flag = false), các nguyên liệu ĐÃ BIẾT là không thuần chay được
 *    phân lớp thêm theo tên:
 *      - EGG   : trứng        -> chỉ hợp với ovo, ovo_lacto.
 *      - DAIRY : sữa/bơ/phô mai -> hợp với lacto, ovo_lacto.
 *      - HONEY : mật ong      -> hợp với lacto, ovo, ovo_lacto.
 *      - ANIMAL: còn lại (thịt, cá, hải sản, hoặc không nhận diện được)
 *                 -> bị chặn ở MỌI chế độ ăn chay (fail-safe).
 *    Danh sách từ khoá nhận diện đã được đối chiếu với dữ liệu seed: 9/9
 *    nguyên liệu vegan_flag = false đều nhận diện đúng, và KHÔNG nguyên liệu
 *    vegan_flag = true nào bị nhận nhầm. Xem diet-compat.util.spec.ts.
 *
 * ============================ GIỚI HẠN ĐÃ BIẾT ============================
 * - Nguyên liệu mà Admin đã khai sai `vegan_flag = true` (VD: "Thịt bò" được
 *   đánh dấu thuần chay) thì KHÔNG có cách nào ở tầng BE phát hiện: dữ liệu
 *   khai báo sai. Việc này thuộc về chất lượng dữ liệu, không thuộc về rule
 *   kiểm tra tương thích.
 * - Với diet_type = null/undefined, công thức được kiểm tra theo mức nghiêm
 *   ngặt nhất (thuần chay) - vì không khai báo chế độ ăn thì không được tự ý
 *   mặc định là "được phép dùng mọi nguyên liệu".
 */

export enum IngredientDietGroup {
  /** Phù hợp với mọi chế độ ăn chay. */
  VEGAN = 'vegan',
  /** Trứng. */
  EGG = 'egg',
  /** Sữa và sản phẩm từ sữa. */
  DAIRY = 'dairy',
  /** Mật ong (không thuần chay nhưng vẫn là chay). */
  HONEY = 'honey',
  /**
   * Thịt, cá, hải sản hoặc bất kỳ nguyên liệu nào không nhận diện được là
   * trứng/sữa/mật ong. Bị chặn ở mọi chế độ ăn chay.
   */
  ANIMAL = 'animal',
}

/** Nguyên liệu tối thiểu cần để kiểm tra tương thích. */
export interface DietCheckedIngredient {
  ingredient_id: number;
  ingredient_name: string;
  vegan_flag: boolean;
}

/** Nguyên liệu không tương thích với chế độ ăn, kèm lý do. */
export interface DietIncompatibleIngredient {
  ingredient_id: number;
  ingredient_name: string;
  group: IngredientDietGroup;
  reason: string;
}

// Từ khoá nhận diện trứng.
const EGG_NAME_PATTERN = /tr[uứ]ng|\begg\b/i;

// Từ khoá nhận diện sữa và sản phẩm từ sữa.
const DAIRY_NAME_PATTERN =
  /s[uữ]a|b[uơ] l[aạấầẩẫậắằẳặ]t|ph[oô] mai|kem t[uư][oơ]i|whey|cheese|butter|ghee|cream|yogurt|cheddar|mozzarella/i;

// Từ khoá nhận diện mật ong.
const HONEY_NAME_PATTERN = /m[ậa]t ong|\bhoney\b/i;

/**
 * Nhãn tiếng Việt của từng nhóm nguyên liệu, dùng trong message lỗi.
 */
const GROUP_LABELS: Record<IngredientDietGroup, string> = {
  [IngredientDietGroup.VEGAN]: 'thuần chay',
  [IngredientDietGroup.EGG]: 'trứng',
  [IngredientDietGroup.DAIRY]: 'sữa',
  [IngredientDietGroup.HONEY]: 'mật ong',
  [IngredientDietGroup.ANIMAL]:
    'thịt/cá/hải sản hoặc nguyên liệu chưa xác minh được là nguyên liệu chay',
};

/**
 * Chế độ ăn chay mà mỗi nhóm nguyên liệu được phép dùng.
 * Dựa trên dữ liệu seed hiện tại (xem phần CĂN CỨ ở đầu file).
 */
const ALLOWED_GROUPS: Record<DietType, IngredientDietGroup[]> = {
  [DietType.VEGAN]: [IngredientDietGroup.VEGAN],
  [DietType.LACTO]: [
    IngredientDietGroup.VEGAN,
    IngredientDietGroup.DAIRY,
    IngredientDietGroup.HONEY,
  ],
  [DietType.OVO]: [
    IngredientDietGroup.VEGAN,
    IngredientDietGroup.EGG,
    IngredientDietGroup.HONEY,
  ],
  [DietType.OVO_LACTO]: [
    IngredientDietGroup.VEGAN,
    IngredientDietGroup.EGG,
    IngredientDietGroup.DAIRY,
    IngredientDietGroup.HONEY,
  ],
};

/** Mô tả giới hạn của từng chế độ ăn, dùng cho message lỗi. */
const DIET_LABELS: Record<DietType, string> = {
  [DietType.VEGAN]:
    'Món thuần chay (vegan) không được chứa trứng, sữa, mật ong hoặc nguyên liệu từ động vật',
  [DietType.LACTO]:
    'Chế độ ăn chay có sữa (lacto) không được chứa trứng hoặc nguyên liệu không phù hợp',
  [DietType.OVO]:
    'Chế độ ăn chay có trứng (ovo) không được chứa sữa hoặc nguyên liệu không phù hợp',
  [DietType.OVO_LACTO]:
    'Chế độ ăn chay trứng và sữa (ovo_lacto) không được chứa nguyên liệu không phù hợp',
};

/**
 * Chế độ ăn dùng để kiểm tra khi công thức không khai báo diet_type.
 * Chọn mức nghiêm ngặt nhất (thuần chay): không khai báo chế độ ăn thì không
 * được tự ý mặc định là "được dùng mọi nguyên liệu".
 */
const DEFAULT_DIET: DietType = DietType.VEGAN;

/**
 * Chuẩn hoá diet_type về giá trị hợp lệ.
 * Trả về null nếu giá trị không thuộc enum (khi đó không có quy tắc để áp dụng).
 */
export function normalizeDietType(
  dietType?: string | null,
): DietType | null {
  const value = dietType?.trim().toLowerCase();
  if (!value) return null;
  if (!(value in ALLOWED_GROUPS)) return null;
  return value as DietType;
}

/**
 * Phân lớp nguyên liệu theo nguồn gốc.
 *
 * - `vegan_flag = true` -> VEGAN (không cần đoán theo tên).
 * - `vegan_flag = false` -> phân lớp theo tên: trứng / sữa / mật ong,
 *   còn lại là ANIMAL (chặn ở mọi chế độ ăn chay).
 *
 * Lưu ý: cột `ingredients.vegan_flag` là NOT NULL DEFAULT true trong DB, nên
 * "không phải false" đồng nghĩa "thuần chay" - đúng với cách frontend đang
 * kiểm tra (`if (ing.vegan_flag === false) return false;`).
 */
export function classifyIngredientDiet(
  ingredient: Pick<DietCheckedIngredient, 'ingredient_name' | 'vegan_flag'>,
): IngredientDietGroup {
  if (ingredient.vegan_flag !== false) {
    return IngredientDietGroup.VEGAN;
  }

  const name = ingredient.ingredient_name ?? '';

  if (EGG_NAME_PATTERN.test(name)) {
    return IngredientDietGroup.EGG;
  }
  if (DAIRY_NAME_PATTERN.test(name)) {
    return IngredientDietGroup.DAIRY;
  }
  if (HONEY_NAME_PATTERN.test(name)) {
    return IngredientDietGroup.HONEY;
  }

  return IngredientDietGroup.ANIMAL;
}

/**
 * Tìm các nguyên liệu không tương thích với chế độ ăn chay.
 *
 * - diet_type là 1 giá trị hợp lệ -> áp đúng ma trận tương thích.
 * - diet_type rỗng / null / undefined -> kiểm tra theo mức nghiêm ngặt nhất
 *   (thuần chay): không khai báo chế độ ăn thì không được tự ý mặc định là
 *   "được dùng mọi nguyên liệu".
 * - diet_type là chuỗi không thuộc enum -> cũng dùng mức nghiêm ngặt nhất
 *   (fail-safe). Thực tế trường hợp này không xảy ra: `recipes.diet_type` là
 *   cột ENUM Postgres ('vegan','lacto','ovo','ovo_lacto') và các DTO đều dùng
 *   @IsEnum(DietType), nên giá trị luôn hợp lệ hoặc null.
 */
export function findDietIncompatibleIngredients(
  dietType: string | null | undefined,
  ingredients: DietCheckedIngredient[],
): DietIncompatibleIngredient[] {
  const diet = normalizeDietType(dietType) ?? DEFAULT_DIET;
  const allowed = ALLOWED_GROUPS[diet];

  const incompatible: DietIncompatibleIngredient[] = [];

  for (const ingredient of ingredients) {
    const group = classifyIngredientDiet(ingredient);

    if (allowed.includes(group)) {
      continue;
    }

    incompatible.push({
      ingredient_id: ingredient.ingredient_id,
      ingredient_name: ingredient.ingredient_name,
      group,
      reason: GROUP_LABELS[group],
    });
  }

  return incompatible;
}

/**
 * Ném lỗi nếu công thức có nguyên liệu không tương thích với chế độ ăn.
 *
 * Dùng chung cho: tạo công thức, cập nhật công thức, import công thức và duyệt
 * công thức - để cả 4 luồng báo lỗi giống nhau.
 */
export function assertRecipeDietCompatible(
  dietType: string | null | undefined,
  ingredients: DietCheckedIngredient[],
): void {
  const incompatible = findDietIncompatibleIngredients(dietType, ingredients);

  if (incompatible.length === 0) {
    return;
  }

  const diet = normalizeDietType(dietType) ?? DEFAULT_DIET;

  const detail = incompatible
    .map((item) => `"${item.ingredient_name}" (${item.reason})`)
    .join(', ');

  throw new BadRequestException({
    code: ErrorCode.RECIPE_DIET_INCOMPATIBLE,
    message: `${DIET_LABELS[diet]}: ${detail}.`,
  });
}
