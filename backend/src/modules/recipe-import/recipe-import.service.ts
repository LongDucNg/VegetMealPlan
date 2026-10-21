
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
} from '../recipe/entities/recipe.entity';
import { DietType } from '../users/entities/user.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { RecipeCategory } from '../recipe/entities/recipe-category.entity';
import { Category } from '../category/entities/category.entity';

import { IngredientService } from '../ingredient/ingredient.service';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';

import { ImportRecipeRow } from './dto/import-recipe-row.dto';

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
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Import nhieu cong thuc.
   * Cong thuc hop le duoc tao voi trang thai PENDING_REVIEW.
   * Cong thuc loi duoc bo qua va luu ly do trong import items.
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

    // Kiem tra trung ten trong file (case-insensitive)
    const titlesInFile = rows
      .map((r, idx) => ({ title: r.title?.trim?.() ?? '', index: idx + 1 }))
      .filter((r) => r.title);

    const seenInFile = new Map<string, { original: string; index: number }>();
    for (const { title, index } of titlesInFile) {
      const lower = title.toLowerCase();
      if (seenInFile.has(lower)) {
        const prev = seenInFile.get(lower)!;
        throw new BadRequestException(
          `Dòng ${index} và dòng ${prev.index}: trùng tiêu đề "${title}" trong file`,
        );
      }
      seenInFile.set(lower, { original: title, index });
    }

    // Kiem tra trung voi DB (case-insensitive)
    const lowerTitles = [...new Set(titlesInFile.map((r) => r.title.toLowerCase()))];
    if (lowerTitles.length > 0) {
      const existing = await this.recipeRepo
        .createQueryBuilder('recipe')
        .where('LOWER(recipe.title) IN (:...titles)', { titles: lowerTitles })
        .getMany();

      if (existing.length > 0) {
        const existingLower = new Set(existing.map((r) => r.title.toLowerCase()));
        const conflictRow = titlesInFile.find((r) =>
          existingLower.has(r.title.toLowerCase()),
        );
        if (conflictRow) {
          throw new BadRequestException(
            `Dòng ${conflictRow.index}: tiêu đề "${conflictRow.title}" đã tồn tại trong hệ thống`,
          );
        }
      }
    }

    const items: RecipeImportItem[] = [];
    let success_count = 0;

    for (let i = 0; i < rows.length; i++) {
      const row_number = i + 1;

      try {
        const result = await this.importOneRow(
          rows[i],
          row_number,
          admin_user_id,
        );

        items.push(result);

        if (result.status === ImportItemStatus.SUCCESS) {
          success_count++;
        }
      } catch (error) {
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
          failed_count: rows.length - success_count,
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

      return {
        success: true,
        data: {
          batch,
          items: savedItems,
        },
        message: 'Nhập công thức hoàn tất.',
      };
    });
  }

  /**
   * Xu ly mot dong cong thuc.
   */
  private async importOneRow(
    row: ImportRecipeRow,
    row_number: number,
    adminUserId: number,
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

    if (typeof row.title !== 'string' || !row.title.trim()) {
      missingFields.push('title');
    }

    if (
      typeof row.instructions !== 'string' ||
      !row.instructions.trim()
    ) {
      missingFields.push('instructions');
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

    // 3. Tim nguyen lieu trong he thong.
    const resolved: {
      ingredient_id: number;
      row: ImportRecipeRow['ingredients'][number];
    }[] = [];

    const unknownNames: string[] = [];

    for (const ing of row.ingredients) {
      if (
        !ing ||
        typeof ing.ingredient_name !== 'string' ||
        !ing.ingredient_name.trim() ||
        typeof ing.unit !== 'string' ||
        !ing.unit.trim() ||
        typeof ing.quantity !== 'number' ||
        !Number.isFinite(ing.quantity) ||
        ing.quantity <= 0
      ) {
        return this.createFailedItem(
          row_number,
          recipe_title,
          ImportFailReason.MISSING_REQUIRED_FIELD,
          'Nguyên liệu có tên, đơn vị hoặc số lượng không hợp lệ',
        );
      }

      const found = await this.ingredientService.findByName(
        ing.ingredient_name.trim(),
      );

      if (!found) {
        unknownNames.push(ing.ingredient_name.trim());
      } else {
        resolved.push({
          ingredient_id: found.ingredient_id,
          row: ing,
        });
      }
    }

    if (unknownNames.length > 0) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.UNKNOWN_INGREDIENT,
        `Nguyên liệu không có trong hệ thống: ${unknownNames.join(', ')}`,
      );
    }

    // 4. Kiem tra nguyen lieu trung lap.
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

    // 5. Kiem tra xung khac giua cac nguyen lieu.
    const conflicts =
      await this.ingredientService.findConflictsAmong(ingredientIds);

    if (conflicts.length > 0) {
      const detail = conflicts
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

    // 5b. Validate diet_type theo enum
    const validDietTypes = Object.values(DietType) as string[];
    if (
      row.diet_type !== undefined &&
      row.diet_type !== null &&
      row.diet_type !== '' &&
      !validDietTypes.includes(String(row.diet_type))
    ) {
      return this.createFailedItem(
        row_number,
        recipe_title,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        `Chế độ ăn chay "${row.diet_type}" không hợp lệ. Chỉ chấp nhận: ${validDietTypes.join(', ')}`,
      );
    }

    // 5c. Validate category_ids
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
        const uniqueIds = [...new Set(row.category_ids.filter((id) => Number.isInteger(id) && id > 0))];
        if (uniqueIds.length !== row.category_ids.length) {
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

    // 6. Tao Recipe, RecipeIngredient va NutritionInfo.
    const recipeId = await this.dataSource.transaction(async (manager) => {
      const recipeRepository = manager.getRepository(Recipe);
      const recipeIngredientRepository =
        manager.getRepository(RecipeIngredient);
      const ingredientRepository = manager.getRepository(Ingredient);
      const nutritionRepository = manager.getRepository(NutritionInfo);

      const recipe = await recipeRepository.save(
        recipeRepository.create({
          title: row.title.trim(),
          description: row.description,
          instructions: row.instructions.trim(),
          prep_time: row.prep_time,
          cook_time: row.cook_time,
          servings: row.servings,
          difficulty: row.difficulty as Recipe['difficulty'],
          meal_type: row.meal_type,
          diet_type: row.diet_type as Recipe['diet_type'],
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

      // Tinh dinh duong tu nguyen lieu bat buoc.
      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;
      let fiber = 0;

      for (const item of resolved) {
        if (item.row.is_optional ?? false) {
          continue;
        }

        if (item.row.unit.trim().toLowerCase() !== 'g') {
          throw new BadRequestException(
            `Nguyên liệu "${item.row.ingredient_name}" phải có đơn vị g để tính dinh dưỡng`,
          );
        }

        const ingredient = await ingredientRepository.findOne({
          where: { ingredient_id: item.ingredient_id },
        });

        if (!ingredient) {
          throw new BadRequestException(
            `Không tìm thấy nguyên liệu #${item.ingredient_id}`,
          );
        }

        const factor = item.row.quantity / 100;

        calories += (ingredient.calories_per_100g ?? 0) * factor;
        protein += (ingredient.protein_per_100g ?? 0) * factor;
        carbs += (ingredient.carb_per_100g ?? 0) * factor;
        fat += (ingredient.fat_per_100g ?? 0) * factor;
        fiber += (ingredient.fiber_per_100g ?? 0) * factor;
      }

      await nutritionRepository.save(
        nutritionRepository.create({
          recipe_id: recipe.recipe_id,
          calories,
          protein,
          carbs,
          fat,
          fiber,
        }),
      );

      // Tạo category links nếu import row có category_ids hợp lệ.
      if (
        Array.isArray(row.category_ids) &&
        row.category_ids.length > 0
      ) {
        const uniqueIds = [...new Set(
          row.category_ids.filter((id) => Number.isInteger(id) && id > 0),
        )];
        if (uniqueIds.length > 0) {
          const found = await manager.count(Category, {
            where: { category_id: In(uniqueIds) },
          });
          if (found === uniqueIds.length) {
            await manager.insert(
              RecipeCategory,
              uniqueIds.map((category_id) => ({
                recipe_id: recipe.recipe_id,
                category_id,
              })),
            );
          }
        }
      }

      return recipe.recipe_id;
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
