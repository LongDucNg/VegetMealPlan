/**
 * Validator dùng chung cho BE2 (Recipe create/update + Recipe import).
 *
 * Mục tiêu: 3 luồng (POST /recipes, PUT /recipes/:id, POST /admin/recipe-imports)
 * phải báo lỗi GIỐNG NHAU, không được mỗi luồng tự viết một bản logic.
 *
 * Có 2 bước kiểm tra TÁCH BIỆT (không được gộp):
 *   1. Bước KEYWORD trên TÊN NGUYÊN LIỆU (tận dụng
 *      common/services/non-vegetarian-detector.service.ts).
 *      - Có keyword mặn, không có từ riêng biệt "chay" -> từ chối.
 *      - Có keyword mặn và có từ riêng biệt "chay" -> qua bước keyword.
 *      - Không có keyword mặn -> qua bước keyword.
 *      Qua bước keyword KHÔNG đồng nghĩa đã xác minh thành phần thực tế
 *      là thuần chay.
 *   2. Bước DIET_TYPE (dùng classifier có sẵn trong
 *      common/utils/diet.util.ts -> checkIngredientDietViolation).
 *      - vegan: không thịt/cá, trứng, sữa.
 *      - lacto: không thịt/cá, trứng; cho phép sữa.
 *      - ovo: không thịt/cá, sữa; cho phép trứng.
 *      - ovo_lacto: không thịt/cá; cho phép trứng và sữa.
 *
 * Ngoại lệ "chay" KHÔNG tự động bỏ qua bước 2, vegan_flag hay dị ứng.
 */
import { BadRequestException } from '@nestjs/common';

import { ErrorCode } from '../../common/constants/error-codes.enum';
import { checkIngredientDietViolation } from '../../common/utils/diet.util';
import {
  checkIngredientNameKeyword,
  EGG_NAME_EXCEPTIONS,
  PLANT_NAME_EXCEPTIONS,
} from '../../common/services/non-vegetarian-detector.service';

/** Đơn vị hợp lệ dùng để tính dinh dưỡng cho nguyên liệu BẮT BUỘC. */
export const REQUIRED_INGREDIENT_UNIT = 'g';

export interface RecipeIngredientRowInput {
  ingredient_id?: number;
  ingredient_name?: string | null;
  quantity?: number | null;
  unit?: string | null;
  is_optional?: boolean | null;
  vegan_flag?: boolean | null;
}

export interface ValidationViolation {
  /** Tên nguyên liệu (nếu có) để admin biết chính xác nguyên liệu nào lỗi. */
  ingredient_name: string | null;
  reason: string;
}

export interface ValidationResult {
  isValid: boolean;
  violations: ValidationViolation[];
}

const EMPTY_RESULT: ValidationResult = { isValid: true, violations: [] };

/**
 * Chuẩn hoá đơn vị để so sánh: trim + không phân biệt hoa thường.
 */
export function normalizeUnit(unit?: string | null): string {
  return (unit ?? '').trim().toLowerCase();
}

/**
 * Chuẩn hoá tiêu đề công thức để so sánh trùng:
 * gộp khoảng trắng (kể cả đầu/cuối) về 1 space, không phân biệt hoa thường.
 */
export function normalizeRecipeTitle(title?: string | null): string {
  return (title ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * Khoá so sánh TRÙNG MÓN (dùng chung cho API create và import Excel).
 *
 * Quy tắc: trùng khi TIÊU ĐỀ giống nhau (đã trim + không phân biệt hoa thường)
 * VÀ tập `ingredient_id` giống nhau. Thứ tự nguyên liệu KHÔNG quan trọng
 * (đã sort) -> "Đậu hũ + Cà rốt" và "Cà rốt + Đậu hũ" là cùng một món.
 *
 * Cùng tiêu đề nhưng khác nguyên liệu -> KHÔNG trùng (cho phép tồn tại).
 */
export function buildRecipeDuplicateKey(
  title?: string | null,
  ingredientIds?: number[] | null,
): string {
  const titleKey = normalizeRecipeTitle(title);

  const ids = [...new Set(ingredientIds ?? [])]
    .filter((id) => Number.isInteger(id) && (id as number) > 0)
    .sort((a, b) => a - b);

  return `${titleKey}::${ids.join(',')}`;
}

/**
 * BƯỚC 1 - kiểm tra KEYWORD trên TÊN NGUYÊN LIỆU.
 *
 * KHÔNG kiểm tra tên món ăn (chỉ tên nguyên liệu được kiểm ở đây).
 */
export function validateIngredientNamesKeyword(
  rows: RecipeIngredientRowInput[],
): ValidationResult {
  const violations: ValidationViolation[] = [];

  for (const row of rows ?? []) {
    const name = (row?.ingredient_name ?? '').trim();

    if (!name) {
      continue;
    }

    const result = checkIngredientNameKeyword(name, {
      extraExceptions: [...PLANT_NAME_EXCEPTIONS, ...EGG_NAME_EXCEPTIONS],
    });

    if (!result.isClean) {
      violations.push({
        ingredient_name: name,
        reason:
          `Nguyên liệu "${name}" chứa từ khóa mặn: ${result.violations.join(', ')}. ` +
          `Nếu là sản phẩm chay, hãy đặt tên kèm chữ "chay" (vd. "${name} chay").`,
      });
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}

/**
 * BƯỚC 2 - kiểm tra DIET_TYPE của công thức với từng nguyên liệu.
 *
 * Dùng lại classifier có sẵn (checkIngredientDietViolation trong
 * common/utils/diet.util.ts) nên thứ tự ưu tiên và thông điệp là nhất quán
 * với luồng kho nguyên liệu của user.
 */
export function validateRecipeDietType(
  dietType: string | null | undefined,
  rows: RecipeIngredientRowInput[],
): ValidationResult {
  const diet = dietType?.trim().toLowerCase();

  if (!diet) {
    return EMPTY_RESULT;
  }

  const violations: ValidationViolation[] = [];

  for (const row of rows ?? []) {
    const name = (row?.ingredient_name ?? '').trim();

    if (!name) {
      continue;
    }

    // vegan_flag chưa biết -> không tự coi là mặn, nhưng tên vẫn được
    // classifier kiểm tra bằng regex (vd. "Thịt bò").
    const veganFlag = row?.vegan_flag !== false;

    // Ngoại lệ "chay" áp dụng cho TÊN (vd. "Thịt bò chay" không phải thịt),
    // nhưng KHÔNG bỏ qua vegan_flag = false và KHÔNG bỏ qua trứng/sữa.
    const reason = checkIngredientDietViolation(name, veganFlag, diet, {
      allowChayException: true,
    });

    if (reason) {
      violations.push({ ingredient_name: name, reason });
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}

/**
 * Kiểm tra số lượng và đơn vị của từng dòng nguyên liệu.
 * - quantity phải > 0.
 * - Nguyên liệu BẮT BUỘC phải dùng đơn vị "g" (để tính dinh dưỡng).
 */
export function validateRecipeIngredientRows(
  rows: RecipeIngredientRowInput[],
): ValidationResult {
  const violations: ValidationViolation[] = [];

  for (const row of rows ?? []) {
    const name = (row?.ingredient_name ?? '').trim() || null;
    const quantity = Number(row?.quantity);
    const isOptional = (row?.is_optional ?? false) === true;

    if (!Number.isFinite(quantity) || quantity <= 0) {
      violations.push({
        ingredient_name: name,
        reason: `Số lượng của nguyên liệu${name ? ` "${name}"` : ''} phải lớn hơn 0.`,
      });
      continue;
    }

    if (!isOptional) {
      const unit = normalizeUnit(row?.unit);

      if (unit !== REQUIRED_INGREDIENT_UNIT) {
        violations.push({
          ingredient_name: name,
          reason:
            `Nguyên liệu bắt buộc${name ? ` "${name}"` : ''} phải sử dụng đơn vị ` +
            `"${REQUIRED_INGREDIENT_UNIT}" để tính dinh dưỡng ` +
            `(đang nhận "${(row?.unit ?? '').trim()}").`,
        });
      }
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}

/**
 * Gom nhiều kết quả validate lại, bỏ trùng lặp.
 */
export function mergeValidationResults(
  ...results: ValidationResult[]
): ValidationResult {
  const violations = results.flatMap((result) => result?.violations ?? []);

  return {
    isValid: violations.length === 0,
    violations,
  };
}

/**
 * Ném BadRequestException với danh sách vi phạm gộp lại.
 * Dùng chung cho cả 3 luồng BE2 -> cùng format lỗi, cùng mã lỗi.
 */
export function assertRecipeValidation(
  result: ValidationResult,
  message?: string,
): void {
  if (result.isValid) {
    return;
  }

  const detail = result.violations
    .map((violation) => violation.reason)
    .join(' ');

  throw new BadRequestException({
    code: ErrorCode.VALIDATION_FAILED,
    message: message ? `${message} ${detail}` : detail,
  });
}
