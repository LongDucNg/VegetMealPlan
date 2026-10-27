/**
 * Validator dùng chung cho BE2: tạo công thức, sửa công thức và import công thức.
 *
 * Cả 3 luồng dùng CHUNG service này để:
 * - kiểm tra nguyên liệu tồn tại, đang active, không trùng lặp;
 * - kiểm tra quantity > 0 và đơn vị "g" cho nguyên liệu bắt buộc;
 * - kiểm tra KEYWORD trên TÊN NGUYÊN LIỆU;
 * - kiểm tra DIET_TYPE của công thức với từng nguyên liệu.
 *
 * Không tạo 3 bản logic khác nhau cho 3 luồng.
 */
import { Injectable } from '@nestjs/common';

import { IngredientService } from '../ingredient/ingredient.service';
import {
  mergeValidationResults,
  normalizeUnit,
  REQUIRED_INGREDIENT_UNIT,
  validateIngredientNamesKeyword,
  validateRecipeDietType,
  validateRecipeIngredientRows,
  ValidationResult,
} from './recipe-validation.util';

/** Dòng nguyên liệu theo API (tham chiếu bằng ingredient_id). */
export interface ApiRecipeIngredientInput {
  ingredient_id: number;
  quantity: number;
  unit: string;
  is_optional?: boolean;
  note?: string;
}

/** Dòng nguyên liệu theo file import (tham chiếu bằng tên). */
export interface ImportRecipeIngredientInput {
  ingredient_name: string;
  quantity: number;
  unit: string;
  is_optional?: boolean;
}

/** Nguyên liệu đã resolve (đã biết tên + vegan_flag từ DB). */
export interface ResolvedRecipeIngredient {
  ingredient_id: number;
  ingredient_name: string;
  vegan_flag: boolean;
  quantity: number;
  unit: string;
  is_optional: boolean;
}

export interface RecipeIngredientValidationOutcome {
  isValid: boolean;
  violations: ValidationResult['violations'];
  /** Nguyên liệu đã resolve - dùng để tính dinh dưỡng / chi phí sau đó. */
  resolved: ResolvedRecipeIngredient[];
}

function ok(
  resolved: ResolvedRecipeIngredient[],
): RecipeIngredientValidationOutcome {
  return { isValid: true, violations: [], resolved };
}

function fail(
  violations: ValidationResult['violations'],
  resolved: ResolvedRecipeIngredient[] = [],
): RecipeIngredientValidationOutcome {
  return { isValid: false, violations, resolved };
}

@Injectable()
export class RecipeValidatorService {
  constructor(private readonly ingredientService: IngredientService) {}

  /**
   * Kiểm tra danh sách nguyên liệu theo API (dùng ingredient_id).
   *
   * @param rows danh sách nguyên liệu từ request
   * @param dietType diet_type của công thức (có thể undefined ở bước update)
   */
  async validateApiIngredients(
    rows: ApiRecipeIngredientInput[] | undefined,
    dietType?: string | null,
  ): Promise<RecipeIngredientValidationOutcome> {
    if (!rows || rows.length === 0) {
      return ok([]);
    }

    // 1. ingredient_id phải là số nguyên dương và không được lặp lại.
    const idViolations: ValidationResult['violations'] = [];
    const ids: number[] = [];

    for (const row of rows) {
      const id = Number(row?.ingredient_id);

      if (!Number.isInteger(id) || id <= 0) {
        idViolations.push({
          ingredient_name: null,
          reason: `ingredient_id không hợp lệ: ${row?.ingredient_id}.`,
        });
        continue;
      }

      ids.push(id);
    }

    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length !== ids.length) {
      idViolations.push({
        ingredient_name: null,
        reason: 'Công thức có nguyên liệu bị lặp lại.',
      });
    }

    if (idViolations.length > 0) {
      return fail(idViolations);
    }

    // 2. Nguyên liệu phải tồn tại và đang active.
    const found = await this.ingredientService.findByIds(uniqueIds);
    const foundMap = new Map(found.map((item) => [item.ingredient_id, item]));

    const missing = uniqueIds.filter((id) => !foundMap.has(id));

    if (missing.length > 0) {
      return fail([
        {
          ingredient_name: null,
          reason: `Nguyên liệu không tồn tại: ${missing.join(', ')}.`,
        },
      ]);
    }

    // Chỉ chặn khi nguyên liệu được đánh dấu ngưng hoạt động.
    // (status = null là dữ liệu seed cũ, vẫn được dùng bình thường.)
    const inactive = found.filter((item) => item.status === 'inactive');

    if (inactive.length > 0) {
      return fail(
        inactive.map((item) => ({
          ingredient_name: item.ingredient_name,
          reason: `Nguyên liệu "${item.ingredient_name}" đã ngưng hoạt động, không thể dùng trong công thức.`,
        })),
      );
    }

    // 3. Build danh sách đã resolve.
    const resolved: ResolvedRecipeIngredient[] = rows.map((row) => {
      const ingredient = foundMap.get(Number(row.ingredient_id))!;

      return {
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        // CHỈ "false" mới nghĩa là không thuần chay (cột DB mặc định true;
        // dữ liệu seed cũ có thể null) -> không dùng Boolean() để tránh
        // biến undefined thành false.
        vegan_flag: ingredient.vegan_flag !== false,
        quantity: Number(row.quantity),
        unit: (row.unit ?? '').trim(),
        is_optional: (row.is_optional ?? false) === true,
      };
    });

    // 4. Keyword (tên nguyên liệu) + diet_type + quantity/unit.
    const result = mergeValidationResults(
      validateIngredientNamesKeyword(resolved),
      validateRecipeDietType(dietType, resolved),
      validateRecipeIngredientRows(resolved),
    );

    if (!result.isValid) {
      return fail(result.violations, resolved);
    }

    return ok(resolved);
  }

  /**
   * Kiểm tra danh sách nguyên liệu theo file import (dùng tên nguyên liệu).
   */
  async validateImportIngredients(
    rows: ImportRecipeIngredientInput[] | undefined,
    dietType?: string | null,
  ): Promise<RecipeIngredientValidationOutcome> {
    if (!rows || rows.length === 0) {
      return ok([]);
    }

    const violations: ValidationResult['violations'] = [];
    const resolved: ResolvedRecipeIngredient[] = [];
    const seenNames = new Map<string, number>();

    for (const row of rows) {
      const name = (row?.ingredient_name ?? '').trim();

      if (!name) {
        violations.push({
          ingredient_name: null,
          reason: 'Nguyên liệu không có tên.',
        });
        continue;
      }

      const key = name.replace(/\s+/g, ' ').toLowerCase();

      if (seenNames.has(key)) {
        violations.push({
          ingredient_name: name,
          reason: `Công thức có nguyên liệu bị lặp lại: "${name}".`,
        });
        continue;
      }

      seenNames.set(key, resolved.length);

      const found = await this.ingredientService.findByName(name);

      if (!found) {
        violations.push({
          ingredient_name: name,
          reason: `Nguyên liệu không tồn tại trong hệ thống: "${name}".`,
        });
        continue;
      }

      // Chỉ chặn khi nguyên liệu được đánh dấu ngưng hoạt động.
      // (status = null là dữ liệu seed cũ, vẫn được dùng bình thường.)
      if (found.status === 'inactive') {
        violations.push({
          ingredient_name: name,
          reason: `Nguyên liệu "${name}" đã ngưng hoạt động, không thể dùng trong công thức.`,
        });
        continue;
      }

      resolved.push({
        ingredient_id: found.ingredient_id,
        ingredient_name: found.ingredient_name,
        // CHỈ "false" mới nghĩa là không thuần chay (cột DB mặc định true;
        // dữ liệu seed cũ có thể null).
        vegan_flag: found.vegan_flag !== false,
        quantity: Number(row.quantity),
        unit: (row.unit ?? '').trim(),
        is_optional: (row.is_optional ?? false) === true,
      });
    }

    if (violations.length > 0) {
      return fail(violations, resolved);
    }

    // Keyword (tên nguyên liệu) + diet_type + quantity/unit.
    const result = mergeValidationResults(
      validateIngredientNamesKeyword(resolved),
      validateRecipeDietType(dietType, resolved),
      validateRecipeIngredientRows(resolved),
    );

    if (!result.isValid) {
      return fail(result.violations, resolved);
    }

    return ok(resolved);
  }

  /**
   * Helper: đơn vị hợp lệ của nguyên liệu bắt buộc.
   */
  static isRequiredIngredientUnit(unit?: string | null): boolean {
    return normalizeUnit(unit) === REQUIRED_INGREDIENT_UNIT;
  }
}
