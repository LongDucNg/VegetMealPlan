
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

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
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';

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
    batch: RecipeImportBatch;
    items: RecipeImportItem[];
  }> {
    if (!Number.isInteger(admin_user_id) || admin_user_id <= 0) {
      throw new BadRequestException('admin_user_id khong hop le');
    }

    if (typeof file_name !== 'string' || !file_name.trim()) {
      throw new BadRequestException('file_name khong duoc de trong');
    }

    if (!Array.isArray(rows)) {
      throw new BadRequestException('rows phai la mot mang');
    }

    if (rows.length === 0) {
      throw new BadRequestException('Danh sach import khong duoc rong');
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
            `Dong ${row_number}`,
            ImportFailReason.MISSING_REQUIRED_FIELD,
            error instanceof Error
              ? error.message
              : 'Loi khong xac dinh khi import cong thuc',
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
        batch,
        items: savedItems,
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
        `Dong ${row_number}`,
        ImportFailReason.MISSING_REQUIRED_FIELD,
        'Du lieu dong import khong hop le',
      );
    }

    const recipe_title =
      typeof row.title === 'string' && row.title.trim()
        ? row.title.trim()
        : `(khong co tieu de - dong ${row_number})`;

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
        `Thieu field bat buoc: ${missingFields.join(', ')}`,
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
          'Nguyen lieu co ten, don vi hoac so luong khong hop le',
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
        `Nguyen lieu khong co trong he thong: ${unknownNames.join(', ')}`,
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
        'Cong thuc co nguyen lieu bi lap lai',
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
        `Cac cap nguyen lieu xung khac: ${detail}`,
      );
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
            `Nguyen lieu "${item.row.ingredient_name}" phai co don vi g de tinh dinh duong`,
          );
        }

        const ingredient = await ingredientRepository.findOne({
          where: { ingredient_id: item.ingredient_id },
        });

        if (!ingredient) {
          throw new BadRequestException(
            `Khong tim thay nguyen lieu #${item.ingredient_id}`,
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
  async listBatches(): Promise<RecipeImportBatch[]> {
    return this.batchRepo.find({
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Lay ket qua cac dong cua mot dot import.
   */
  async getBatchItems(batch_id: number): Promise<RecipeImportItem[]> {
    const batch = await this.batchRepo.findOne({
      where: { batch_id },
    });

    if (!batch) {
      throw new NotFoundException(
        `Khong tim thay dot import #${batch_id}`,
      );
    }

    return this.itemRepo.find({
      where: { batch_id },
      order: { row_number: 'ASC' },
    });
  }
}
