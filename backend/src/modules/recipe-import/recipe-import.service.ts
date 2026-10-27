import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { RecipeImportBatch } from './entities/recipe-import-batch.entity';
import {
  RecipeImportItem,
  ImportItemStatus,
  ImportFailReason,
} from './entities/recipe-import-item.entity';

import {
  Recipe,
  RecipeStatus,
  Difficulty,
} from '../recipe/entities/recipe.entity';
import { DietType } from '../users/entities/user.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { RecipeCategory } from '../recipe/entities/recipe-category.entity';
import { Category } from '../category/entities/category.entity';
import { assertValidRecipeCategoryIds } from '../category/category-validation.util';

import { IngredientService } from '../ingredient/ingredient.service';
import { isBlockingConflict } from '../ingredient/ingredient-conflict.util';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import {
  calculateIngredientCost,
  calculateRecipeEstimatedCost,
  RecipeCostRow,
} from '../recipe/recipe-cost.util';
import {
  calculateNutritionPerServing,
  NutritionCalcRow,
} from '../recipe/recipe-nutrition.util';
import { RecipeValidatorService } from '../recipe/recipe-validator.service';
import {
  deriveSuitableMeals,
  parseSuitableMeals,
  IMPORT_MEAL_TYPES,
} from '../recipe/recipe-meals.util';

import { ImportRecipeRow } from './dto/import-recipe-row.dto';

/** Kết quả từng dòng trong response của import. */
export interface ImportRowDetail {
  row: number;
  title: string;
  status: ImportItemStatus;
  reason: string | null;
}

/**
 * Chuẩn hoá tên công thức để so sánh trùng:
 * gộp khoảng trắng (kể cả đầu/cuối) về 1 space và không phân biệt hoa/thường.
 */
function normalizeTitle(title: string | null | undefined): string {
  return (title ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * Khoá so sánh TRÙNG MÓN: tiêu đề (đã chuẩn hoá) + tập `ingredient_id` đã sort.
 *
 * Quy tắc nghiệp vụ:
 *   - Trùng khi tên giống nhau (không phân biệt hoa/thường, đã trim) VÀ
 *     tập nguyên liệu giống nhau (thứ tự nguyên liệu không quan trọng).
 *   - Cùng tên nhưng khác nguyên liệu -> KHÔNG trùng, vẫn cho phép nhập.
 */
function buildDuplicateKey(
  title: string | null | undefined,
  ingredientIds: number[] | null | undefined,
): string {
  const ids = [...new Set(ingredientIds ?? [])]
    .filter((id) => Number.isInteger(id) && id > 0)
    .sort((a, b) => a - b);

  return `${normalizeTitle(title)}::${ids.join(',')}`;
}

/**
 * Loại bữa ăn được phép import, theo dữ liệu gốc (cột meal_type của file seed).
 * Không có 'dinner'/'any': món ăn trưa dùng suitable_meals = "lunch,dinner".
 */
const VALID_MEAL_TYPES = IMPORT_MEAL_TYPES;

@Injectable()
export class RecipeImportService {
  constructor(
    @InjectRepository(RecipeImportBatch)
    private readonly batchRepo: Repository<RecipeImportBatch>,

    @InjectRepository(RecipeImportItem)
    private readonly itemRepo: Repository<RecipeImportItem>,

    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    private readonly ingredientService: IngredientService,
    private readonly recipeValidator: RecipeValidatorService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Import nhieu cong thuc.
   *
   * - Cong thuc trung ten voi DB hoac trong cung file -> SKIPPED (khong abort ca lot).
   * - Dong loi -> FAILED, cac dong khac van duoc xu ly binh thuong.
   * - Cong thuc hop le duoc tao voi trang thai PENDING_REVIEW.
   */
  async importRows(
    admin_user_id: number,
    file_name: string,
    rows: ImportRecipeRow[],
  ): Promise<{
    success: true;
    data: {
      batch: RecipeImportBatch;
      items: RecipeImportItem[];
      total: number;
      success: number;
      skipped: number;
      failed: number;
      summary: {
        total: number;
        success: number;
        skipped: number;
        failed: number;
      };
      details: ImportRowDetail[];
    };
    message: string;
  }> {
    if (!Number.isInteger(admin_user_id) || admin_user_id <= 0) {
      throw new BadRequestException('admin_user_id không hợp lệ');
    }

    if (typeof file_name !== 'string' || !file_name.trim()) {
      throw new BadRequestException('file_name không được để trống');
    }

    if (!Array.isArray(rows)) {
      throw new BadRequestException('rows phải là một mảng');
    }

    if (rows.length === 0) {
      throw new BadRequestException('Danh sách import không được rỗng');
    }

    // Cac mon da ton tai trong DB, chi muc theo KHOA TRUNG (ten + tap nguyen lieu).
    const existingDbIndex = await this.findExistingDuplicateIndex(rows);

    // Cac khoa trung da import thanh cong trong chung lot nay -> thong tin dong dau tien.
    // Dong trung trong file KHONG abort ca lot: dong sau bi danh dau SKIPPED.
    // (value = { row_number, title } de thong bao nen ten mon + so dong Excel goc.)
    const importedInBatch = new Map<string, { row_number: number; title: string }>();

    const items: RecipeImportItem[] = [];
    let success_count = 0;
    let skipped_count = 0;
    let failed_count = 0;

    for (let i = 0; i < rows.length; i++) {
      // Ưu tiên số dòng THẬT trong file Excel (controller gán khi đọc file).
      // Fallback về index + 1 khi gọi service trực tiếp (không qua controller).
      const excelRowNumber = rows[i]?.row_number;
      const row_number =
        typeof excelRowNumber === 'number' && excelRowNumber > 0
          ? excelRowNumber
          : i + 1;

      try {
        const result = await this.importOneRow(
          rows[i],
          row_number,
          admin_user_id,
          existingDbIndex,
          importedInBatch,
        );

        items.push(result);

        if (result.status === ImportItemStatus.SUCCESS) {
          success_count++;
        } else if (result.status === ImportItemStatus.SKIPPED) {
          skipped_count++;
        } else {
          failed_count++;
        }
      } catch (error) {
        failed_count++;

        items.push(
          this.createFailedItem(
            row_number,
            `Dòng ${row_number}`,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            error instanceof Error
              ? error.message
              : 'Lỗi không xác định khi import công thức',
          ),
        );
      }
    }

    // Luu batch va cac item trong cung transaction.
    return this.dataSource.transaction(async (manager) => {
      const batchRepository = manager.getRepository(RecipeImportBatch);
      const itemRepository = manager.getRepository(RecipeImportItem);

      const batch = await batchRepository.save(
        batchRepository.create({
          imported_by: admin_user_id,
          file_name: file_name.trim(),
          total_rows: rows.length,
          success_count,
          skipped_count,
          failed_count,
        }),
      );

      const itemsWithBatch = items.map((item) =>
        itemRepository.create({
          row_number: item.row_number,
          recipe_title: item.recipe_title,
          status: item.status,
          fail_reason: item.fail_reason,
          fail_detail: item.fail_detail,
          recipe_id: item.recipe_id,
          batch_id: batch.batch_id,
        }),
      );

      const savedItems = await itemRepository.save(itemsWithBatch);

      const details: ImportRowDetail[] = savedItems.map((item) => ({
        row: item.row_number,
        title: item.recipe_title,
        status: item.status,
        reason:
          item.status === ImportItemStatus.SUCCESS
            ? null
            : item.fail_detail ?? item.fail_reason ?? null,
      }));

      const skipped = details.filter(
        (d) => d.status === ImportItemStatus.SKIPPED,
      ).length;
      const failed = details.filter(
        (d) => d.status === ImportItemStatus.FAILED,
      ).length;
      const success = details.filter(
        (d) => d.status === ImportItemStatus.SUCCESS,
      ).length;

      return {
        success: true as const,
        data: {
          // Thống kê ngắn gọn ở cấp data cho frontend dùng trực tiếp.
          total: details.length,
          success,
          skipped,
          failed,
          batch,
          items: savedItems,
          summary: {
            total: details.length,
            success,
            skipped,
            failed,
          },
          details,
        },
        message:
          skipped > 0
            ? `Nhập công thức hoàn tất: ${success} thành công, ${skipped} bỏ qua (trùng tên), ${failed} lỗi.`
            : `Nhập công thức hoàn tất: ${success} thành công, ${failed} lỗi.`,
      };
    });
  }

  /**
   * Lập chỉ mục các món đã tồn tại trong DB theo KHOÁ TRÙNG (tên + tập nguyên liệu).
   *
   * Trả về: tên đã chuẩn hoá -> tập khoá trùng (mỗi khoá là chuỗi id đã sort).
   * Cùng tên nhưng khác tập nguyên liệu -> khác khoá -> KHÔNG bị coi là trùng.
   */
  private async findExistingDuplicateIndex(
    rows: ImportRecipeRow[],
  ): Promise<Map<string, Set<string>>> {
    const index = new Map<string, Set<string>>();

    const titleKeys = [
      ...new Set(
        rows
          .map((row) => normalizeTitle(row?.title))
          .filter((key) => key.length > 0),
      ),
    ];

    if (titleKeys.length === 0) {
      return index;
    }

    // Dùng getRawMany() thay vì getMany(): khi select chỉ 1 cột (alias 'title')
    // thì getMany() KHÔNG map được entity -> trả về mảng rỗng.
    // BTRIM là BẮT BUỘC: normalizeTitle() ở JS có trim() nên nếu SQL không trim
    // thì tiêu đề trong DB có khoảng trắng đầu/cuối ("  Món X  ") sẽ không bao
    // giờ khớp -> tạo bản sao công thức.
    const existing = await this.recipeRepo
      .createQueryBuilder('recipe')
      .select('recipe.recipe_id', 'recipe_id')
      .addSelect('recipe.title', 'title')
      .where(
        "LOWER(BTRIM(REGEXP_REPLACE(recipe.title, '\\s+', ' ', 'g'))) IN (:...keys)",
        { keys: titleKeys },
      )
      .andWhere('recipe.status != :removedStatus', {
        removedStatus: RecipeStatus.REMOVED,
      })
      .getRawMany<{ recipe_id: number; title: string }>();

    if (existing.length === 0) {
      return index;
    }

    // Lấy tập nguyên liệu của từng món đã tồn tại để so sánh.
    const recipeIds = existing.map((row) => row.recipe_id);

    const recipeIngredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: In(recipeIds) },
    });

    const idsByRecipe = new Map<number, number[]>();

    for (const row of recipeIngredients) {
      const list = idsByRecipe.get(row.recipe_id) ?? [];
      list.push(row.ingredient_id);
      idsByRecipe.set(row.recipe_id, list);
    }

    for (const row of existing) {
      const titleKey = normalizeTitle(row.title);

      if (!titleKey) continue;

      const duplicateKey = buildDuplicateKey(
        row.title,
        idsByRecipe.get(row.recipe_id) ?? [],
      );

      const set = index.get(titleKey) ?? new Set<string>();
      set.add(duplicateKey);
      index.set(titleKey, set);
    }

    return index;
  }

  /**
   * Xu ly mot dong cong thuc.
   */
  private async importOneRow(
    row: ImportRecipeRow,
    row_number: number,
    adminUserId: number,
    existingDbIndex: Map<string, Set<string>>,
    importedInBatch: Map<string, { row_number: number; title: string }>,
  ): Promise<RecipeImportItem> {
    // 1. Kiem tra row.
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      return this.createFailedItem(
        row_number,
        `Dòng ${row_number}`,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        'Dữ liệu dòng import không hợp lệ',
      );
    }

    const recipe_title =
      typeof row.title === 'string' && row.title.trim()
        ? row.title.trim()
        : `(không có tiêu đề - dòng ${row_number})`;

    // 2. Kiem tra cac field bat buoc.
    const missingFields: string[] = [];

    if (row.row_error) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        row.row_error,
      );
    }

    if (typeof row.title !== 'string' || !row.title.trim()) {
      missingFields.push('title');
    }

    if (
      typeof row.instructions !== 'string' ||
      !row.instructions.trim()
    ) {
      missingFields.push('instructions');
    }

    if (
      typeof row.meal_type !== 'string' ||
      !row.meal_type.trim()
    ) {
      missingFields.push('meal_type');
    }

    if (
      typeof row.diet_type !== 'string' ||
      !row.diet_type.trim()
    ) {
      missingFields.push('diet_type');
    }

    if (!Array.isArray(row.ingredients) || row.ingredients.length === 0) {
      missingFields.push('ingredients');
    }
    if (missingFields.length > 0) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        `Thiếu field bắt buộc: ${missingFields.join(', ')}`,
      );
    }

    // 2b. Kiem tra meal_type theo du lieu goc: chi breakfast, lunch, snack.
    const mealTypeValue = row.meal_type.trim().toLowerCase();

    if (!VALID_MEAL_TYPES.includes(mealTypeValue)) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        `Loại bữa ăn "${row.meal_type}" không hợp lệ. Chỉ chấp nhận: ${VALID_MEAL_TYPES.join(', ')}`,
      );
    }

    // 2c. Kiem tra diet_type theo enum DietType.
    const dietTypeValue = row.diet_type.trim().toLowerCase();
    const validDietTypes = Object.values(DietType) as string[];

    if (!validDietTypes.includes(dietTypeValue)) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        `Chế độ ăn chay "${row.diet_type}" không hợp lệ. Chỉ chấp nhận: ${validDietTypes.join(', ')}`,
      );
    }

    // 2d. Kiem tra difficulty (optional) theo enum Difficulty.
    // Khong validate o day se lam DB nem loi enum -> 500 khi import.
    let difficultyValue: Difficulty | undefined;

    if (row.difficulty !== undefined && row.difficulty !== null) {
      const rawDifficulty = String(row.difficulty).trim();

      if (rawDifficulty) {
        const normalizedDifficulty = rawDifficulty.toLowerCase();
        const validDifficulties = Object.values(Difficulty) as string[];

        if (!validDifficulties.includes(normalizedDifficulty)) {
          return this.createFailedItem(
            row_number,
            recipe_title,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            `Độ khó "${row.difficulty}" không hợp lệ. Chỉ chấp nhận: ${validDifficulties.join(', ')}`,
          );
        }

        difficultyValue = normalizedDifficulty as Difficulty;
      }
    }

    // 2e. Kiem tra cac truong so (optional) phai la so nguyen duong.
    // Number('abc') = NaN -> lưu xuống DB se nem loi numeric -> 500.
    const numericFields: { key: string; value: unknown }[] = [
      { key: 'prep_time', value: row.prep_time },
      { key: 'cook_time', value: row.cook_time },
      { key: 'servings', value: row.servings },
    ];

    for (const field of numericFields) {
      if (field.value === undefined || field.value === null) {
        continue;
      }

      const num = Number(field.value);

      if (!Number.isFinite(num) || num <= 0) {
        return this.createFailedItem(
          row_number,
          recipe_title,
          ImportFailReason.MISSING_REQUIRED_FIELD,
          `Trường ${field.key} không hợp lệ (phải là số lớn hơn 0)`,
        );
      }
    }

    // 2f. Kiem tra suitable_meals (optional) co dung mapping chuan khong.
    // Mapping goc: breakfast -> "breakfast", lunch -> "lunch,dinner", snack -> "snack".
    // File import duoc phep bo trong suitable_meals (suy ra tu meal_type),
    // nhung neu co ghi thi phai dung mapping de khong sinh du lieu sai.
    let suitableMealsValue: string | undefined;

    if (row.suitable_meals !== undefined && row.suitable_meals !== null) {
      const raw = String(row.suitable_meals).trim();

      if (raw) {
        const parsed = parseSuitableMeals(raw);

        if (parsed.length === 0) {
          return this.createFailedItem(
            row_number,
            recipe_title,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            `suitable_meals "${row.suitable_meals}" không hợp lệ`,
          );
        }

        const expected = deriveSuitableMeals(mealTypeValue);
        const expectedList = parseSuitableMeals(expected ?? '');
        const sameSet =
          parsed.length === expectedList.length &&
          parsed.every((meal) => expectedList.includes(meal));

        if (!sameSet) {
          return this.createFailedItem(
            row_number,
            recipe_title,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            `suitable_meals "${raw}" không khớp meal_type "${mealTypeValue}" ` +
              `(đúng phải là "${expected}").`,
          );
        }

        suitableMealsValue = expected ?? undefined;
      }
    }

    // 3. Tim + KIEM TRA nguyen lieu trong he thong.
    // Validator DUNG CHUNG voi create/update: nguyen lieu ton tai + active,
    // khong trung lap, quantity > 0, don vi "g" cho nguyen lieu bat buoc,
    // keyword tren TEN nguyen lieu va diet_type cua cong thuc.
    //
    // Kiem tra TRUNG (tieu de + tap nguyen lieu) dien ra SAU buoc nay,
    // vi can ingredient_id da resolve de so sanh tap nguyen lieu.
    const ingredientCheck =
      await this.recipeValidator.validateImportIngredients(
        row.ingredients,
        dietTypeValue,
      );

    if (!ingredientCheck.isValid) {
      const unknownNames = ingredientCheck.violations
        .filter((violation) =>
          violation.reason.includes('không tồn tại') ||
          violation.reason.includes('ngưng hoạt động'),
        )
        .map((violation) => violation.ingredient_name)
        .filter(Boolean);

      if (unknownNames.length > 0) {
        return this.createFailedItem(
          row_number,
          recipe_title,
          ImportFailReason.UNKNOWN_INGREDIENT,
          `Nguyên liệu không phù hợp: ${unknownNames.join(', ')}`,
        );
      }

      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        ingredientCheck.violations
          .map((violation) => violation.reason)
          .join(' '),
      );
    }

    const resolved = ingredientCheck.resolved.map((item) => ({
      ingredient_id: item.ingredient_id,
      vegan_flag: item.vegan_flag,
      row: {
        ingredient_name: item.ingredient_name,
        quantity: item.quantity,
        unit: item.unit,
        is_optional: item.is_optional,
      },
    }));

    // 5. Kiem tra nguyen lieu trung lap.
    // (Validator DUNG CHUNG da kiem tra trung ten nguyen lieu o buoc 3;
    //  kiem tra nay theo ingredient_id de chan 2 ten khac nhau tro toi cung 1 nguyen lieu.)
    const ingredientIds = resolved.map((item) => item.ingredient_id);
    const uniqueIngredientIds = new Set(ingredientIds);

    if (uniqueIngredientIds.size !== ingredientIds.length) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.INGREDIENT_CONFLICT,
        'Công thức có nguyên liệu bị lặp lại',
      );
    }

    // 5b. KIEM TRA TRUNG MON (tieu de + tap nguyen lieu).
    // Chi nhung dong IMPORT THANH CONG moi danh dau khoa trung, nen mot dong loi
    // o dau khong chan dong trung tiep theo trong cung file.
    const titleKey = normalizeTitle(row.title);
    const duplicateKey = buildDuplicateKey(row.title, ingredientIds);
    const dbDuplicateKeys = existingDbIndex.get(titleKey);

    if (dbDuplicateKeys && dbDuplicateKeys.has(duplicateKey)) {
      return this.createSkippedItem(
        row_number,
        recipe_title,
        `Công thức "${recipe_title}" đã tồn tại trong hệ thống ` +
          `(cùng tên và cùng tập nguyên liệu).`,
      );
    }

    const firstRowInBatch = importedInBatch.get(duplicateKey);

    if (firstRowInBatch !== undefined) {
      return this.createSkippedItem(
        row_number,
        recipe_title,
        `Công thức "${firstRowInBatch.title}" trùng với dòng ${firstRowInBatch.row_number} trong cùng file ` +
          `(cùng tên và cùng tập nguyên liệu).`,
      );
    }

    // 6. Kiem tra xung khac giua cac nguyen lieu.
    // Chỉ cặp xung khắc THẬT mới chặn dòng import. Bảng ingredient_conflicts
    // dùng chung cho cả "xung khắc" (avoid/caution) lẫn "mẹo tốt" (tip) -
    // VD đậu hũ + chanh là mẹo (vitamin C hỗ trợ hấp thu sắt), không phải lỗi.
    const conflicts =
      await this.ingredientService.findConflictsAmong(ingredientIds);
    const blockingConflicts = conflicts.filter((conflict) =>
      isBlockingConflict(conflict.reason),
    );

    if (blockingConflicts.length > 0) {
      const detail = blockingConflicts
        .map(
          (conflict) =>
            `(${conflict.ingredient_id_1}, ${conflict.ingredient_id_2})` +
            (conflict.reason ? `: ${conflict.reason}` : ''),
        )
        .join('; ');

      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.INGREDIENT_CONFLICT,
        `Các cặp nguyên liệu xung khắc: ${detail}`,
      );
    }

    // 6c. Validate category_ids TRƯỚC khi mở transaction.
    // Mục tiêu: dòng lỗi phải bị đánh dấu FAILED chứ không được làm hỏng cả lô.
    // (Việc kiểm tra loại danh mục hợp lệ - recipe_type/food_type - vẫn do
    // assertValidRecipeCategoryIds đảm nhiệm trong transaction bên dưới.)
    if (row.category_ids !== undefined && row.category_ids !== null) {
      if (!Array.isArray(row.category_ids)) {
        return this.createFailedItem(
          row_number,
          recipe_title,
          ImportFailReason.MISSING_REQUIRED_FIELD,
          'Danh mục (category_ids) phải là một danh sách ID',
        );
      }
      if (row.category_ids.length > 0) {
        const uniqueIds = [...new Set(row.category_ids)];
        const invalidIds = uniqueIds.filter(
          (id) => !Number.isInteger(id) || id <= 0,
        );
        if (invalidIds.length > 0) {
          return this.createFailedItem(
            row_number,
            recipe_title,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            'Danh mục chứa ID không hợp lệ (phải là số nguyên dương)',
          );
        }
        const foundCategoryCount = await this.dataSource.getRepository(Category).count({
          where: { category_id: In(uniqueIds) },
        });
        if (foundCategoryCount !== uniqueIds.length) {
          return this.createFailedItem(
            row_number,
            recipe_title,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            'Một hoặc nhiều ID danh mục không tồn tại trong hệ thống',
          );
        }
      }
    }
    // 7. Tao Recipe, RecipeIngredient va NutritionInfo.
    // Transaction rieng cho tung dong: mot dong loi khong lam anh huong dong khac.
    const recipeId = await this.dataSource.transaction(async (manager) => {
      const recipeRepository = manager.getRepository(Recipe);
      const recipeIngredientRepository =
        manager.getRepository(RecipeIngredient);
      const ingredientRepository = manager.getRepository(Ingredient);
      const nutritionRepository = manager.getRepository(NutritionInfo);

      // Tinh dinh duong + chi phi tu nguyen lieu.
      // Dinh duong dung CHUNG calculateNutritionPerServing() (khớp API create/update).
      // Chi phi dung CHUNG calculateRecipeEstimatedCost() (khớp API + meal plan).
      const nutritionRows: NutritionCalcRow[] = [];
      const costRows: RecipeCostRow[] = [];

      for (const item of resolved) {
        // Nguyên liệu OPTIONAL vẫn được tính vào chi phí (giống
        // RecipeService.getRecipeCost và script fix-recipe-cost-nutrition),
        // nhưng KHÔNG tính vào dinh dưỡng (món không bắt buộc phải dùng).
        const isOptional = item.row.is_optional ?? false;

        const ingredient = await ingredientRepository.findOne({
          where: { ingredient_id: item.ingredient_id },
        });

        if (!ingredient) {
          throw new BadRequestException(
            `Không tìm thấy nguyên liệu #${item.ingredient_id}`,
          );
        }

        nutritionRows.push({
          quantity: item.row.quantity,
          is_optional: isOptional,
          ingredient: {
            calories_per_100g: ingredient.calories_per_100g,
            protein_per_100g: ingredient.protein_per_100g,
            carb_per_100g: ingredient.carb_per_100g,
            fat_per_100g: ingredient.fat_per_100g,
            fiber_per_100g: ingredient.fiber_per_100g,
          },
        });

        costRows.push({
          quantity: item.row.quantity,
          unit: item.row.unit.trim(),
          is_optional: isOptional,
          ingredient: {
            avg_price_per_unit: ingredient.avg_price_per_unit,
            unit: ingredient.unit,
          },
        });
      }

      // nutrition_infos lưu dinh dưỡng THEO 1 KHẨU PHẦN (khớp với
      // seed-vegetarian-data.ts, fix-recipe-cost-nutrition.ts và
      // RecipeService.getRecipeCost). Tổng món chia cho số khẩu phần.
      const servings = row.servings && row.servings > 0 ? row.servings : 1;
      const nutrition = calculateNutritionPerServing(nutritionRows, servings);
      const estimatedCost = calculateRecipeEstimatedCost(costRows);

      const recipe = await recipeRepository.save(
        recipeRepository.create({
          title: row.title.trim(),
          description: row.description,
          instructions: row.instructions.trim(),
          prep_time: row.prep_time,
          cook_time: row.cook_time,
          servings: row.servings,
          difficulty: difficultyValue,
          meal_type: mealTypeValue,
          // suitable_meals: ưu tiên giá trị trong file Excel, không thì suy ra
          // từ meal_type theo mapping chuẩn (vd. lunch -> "lunch,dinner").
          suitable_meals:
            suitableMealsValue ??
            deriveSuitableMeals(mealTypeValue) ??
            undefined,
          diet_type: dietTypeValue as Recipe['diet_type'],
          // Chi phi CUA MON (giong API create/update). null = thieu gia nguyen lieu.
          estimated_cost: estimatedCost.estimated_cost ?? undefined,
          created_by: adminUserId,
          status: RecipeStatus.PENDING_REVIEW,
        }),
      );

      const recipeIngredients = resolved.map((item) =>
        recipeIngredientRepository.create({
          recipe_id: recipe.recipe_id,
          ingredient_id: item.ingredient_id,
          quantity: item.row.quantity,
          unit: item.row.unit.trim(),
          is_optional: item.row.is_optional ?? false,
        }),
      );

      await recipeIngredientRepository.save(recipeIngredients);

      await nutritionRepository.save(
        nutritionRepository.create({
          recipe_id: recipe.recipe_id,
          // Dinh duong theo 1 khau phan (dung chung calculateNutritionPerServing).
          calories: Math.round(nutrition.calories * 100) / 100,
          protein: Math.round(nutrition.protein * 100) / 100,
          carbs: Math.round(nutrition.carbs * 100) / 100,
          fat: Math.round(nutrition.fat * 100) / 100,
          fiber: Math.round(nutrition.fiber * 100) / 100,
        }),
      );

      // Tạo category links nếu import row có category_ids.
      // Trước đây: nếu 1 category_id không tồn tại thì `found !== uniqueIds.length`
      // khiến TOÀN BỘ danh mục bị bỏ qua mà không báo lỗi cho dòng import.
      // Nay: validate trước, sai thì ném BadRequestException để dòng đó thành FAILED
      // (giống cách xử lý nguyên liệu sai) thay vì tạo công thức không có danh mục.
      if (
        Array.isArray(row.category_ids) &&
        row.category_ids.length > 0
      ) {
        const uniqueIds = [...new Set(row.category_ids)];

        const invalidIds = uniqueIds.filter(
          (id) => !Number.isInteger(id) || id <= 0,
        );
        if (invalidIds.length > 0) {
          throw new BadRequestException(
            `category_ids phải là số nguyên dương: ${invalidIds.join(', ')}`,
          );
        }

        const foundCategories = await manager
          .getRepository(Category)
          .find({ where: { category_id: In(uniqueIds) } });

        assertValidRecipeCategoryIds(uniqueIds, foundCategories);

        await manager.insert(
          RecipeCategory,
          uniqueIds.map((category_id) => ({
            recipe_id: recipe.recipe_id,
            category_id,
          })),
        );
      }

      return recipe.recipe_id;
    });

    // Chi danh dau khoa trung sau khi dong nay import THANH CONG that su.
    importedInBatch.set(duplicateKey, {
      row_number,
      title: recipe_title,
    });

    return this.itemRepo.create({
      row_number,
      recipe_title,
      status: ImportItemStatus.SUCCESS,
      recipe_id: recipeId,
    });
  }

  /**
   * Tao ket qua that bai cho mot dong import.
   */
  private createFailedItem(
    row_number: number,
    recipe_title: string,
    fail_reason: ImportFailReason,
    fail_detail: string,
  ): RecipeImportItem {
    return this.itemRepo.create({
      row_number,
      recipe_title,
      status: ImportItemStatus.FAILED,
      fail_reason,
      fail_detail,
    });
  }

  /**
   * Tao ket qua bo qua cho mot dong trung tieu de.
   */
  private createSkippedItem(
    row_number: number,
    recipe_title: string,
    fail_detail: string,
  ): RecipeImportItem {
    return this.itemRepo.create({
      row_number,
      recipe_title,
      status: ImportItemStatus.SKIPPED,
      fail_reason: ImportFailReason.DUPLICATE_TITLE,
      fail_detail,
    });
  }

  /**
   * Lay danh sach cac dot import.
   */
  async listBatches(): Promise<{
    success: true;
    data: RecipeImportBatch[];
    message: string;
  }> {
    const batches = await this.batchRepo.find({
      order: { created_at: 'DESC' },
    });

    return {
      success: true,
      data: batches,
      message: batches.length === 0
        ? 'Chưa có lịch sử nhập công thức.'
        : 'Lấy lịch sử nhập công thức thành công.',
    };
  }

  /**
   * Lay ket qua cac dong cua mot dot import.
   */
  async getBatchItems(batch_id: number): Promise<{
    success: true;
    data: RecipeImportItem[];
    message: string;
  }> {
    const batch = await this.batchRepo.findOne({
      where: { batch_id },
    });

    if (!batch) {
      throw new NotFoundException(
        `Không tìm thấy lô nhập công thức #${batch_id}.`,
      );
    }

    const items = await this.itemRepo.find({
      where: { batch_id },
      order: { row_number: 'ASC' },
    });

    return {
      success: true,
      data: items,
      message: items.length === 0
        ? 'Lô nhập công thức này chưa có dữ liệu chi tiết.'
        : 'Lấy chi tiết lô nhập công thức thành công.',
    };
  }
}
