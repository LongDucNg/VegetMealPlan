import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeImportBatch } from './entities/recipe-import-batch.entity';
import {
  RecipeImportItem,
  ImportItemStatus,
  ImportFailReason,
} from './entities/recipe-import-item.entity';
import { Recipe, RecipeStatus } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { IngredientService } from '../ingredient/ingredient.service';
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
  ) {}

  /**
   * Import hang loat: cong thuc nao co van de thi BO QUA (khong tao), chi import
   * nhung cong thuc OK. 3 ly do bo qua (theo yeu cau): thieu field bat buoc,
   * nguyen lieu la (khong ton tai trong he thong), hoac nguyen lieu xung khac
   * voi nhau trong cung cong thuc.
   *
   * Khac voi luong tao thu cong (RecipeService.checkIngredientConflicts chi CANH
   * BAO): import khong co nguoi ngoi xem tung dong nen tu dong loai bo cho an toan.
   */
  async importRows(
    admin_user_id: number,
    file_name: string,
    rows: ImportRecipeRow[],
  ): Promise<{ batch: RecipeImportBatch; items: RecipeImportItem[] }> {
    const items: RecipeImportItem[] = [];
    let success_count = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const row_number = i + 1;
      const item = await this.importOneRow(row, row_number);
      items.push(item);
      if (item.status === ImportItemStatus.SUCCESS) success_count += 1;
    }

    const batch = await this.batchRepo.save(
      this.batchRepo.create({
        imported_by: admin_user_id,
        file_name,
        total_rows: rows.length,
        success_count,
        failed_count: rows.length - success_count,
      }),
    );

    for (const item of items) {
      item.batch_id = batch.batch_id;
    }
    const savedItems = await this.itemRepo.save(items);

    return { batch, items: savedItems };
  }

  private async importOneRow(
    row: ImportRecipeRow,
    row_number: number,
  ): Promise<RecipeImportItem> {
    const recipe_title = row.title || `(khong co tieu de - dong ${row_number})`;

    // 1) Thieu field bat buoc.
    const missingFields: string[] = [];
    if (!row.title) missingFields.push('title');
    if (!row.instructions) missingFields.push('instructions');
    if (!row.ingredients || row.ingredients.length === 0) missingFields.push('ingredients');
    if (missingFields.length > 0) {
      return this.itemRepo.create({
        row_number,
        recipe_title,
        status: ImportItemStatus.FAILED,
        fail_reason: ImportFailReason.MISSING_REQUIRED_FIELD,
        fail_detail: `Thieu field bat buoc: ${missingFields.join(', ')}`,
      });
    }

    // 2) Nguyen lieu la - khong ton tai trong he thong.
    const resolved: { ingredient_id: number; row: (typeof row.ingredients)[number] }[] = [];
    const unknownNames: string[] = [];
    for (const ing of row.ingredients) {
      const found = await this.ingredientService.findByName(ing.ingredient_name);
      if (!found) {
        unknownNames.push(ing.ingredient_name);
      } else {
        resolved.push({ ingredient_id: found.ingredient_id, row: ing });
      }
    }
    if (unknownNames.length > 0) {
      return this.itemRepo.create({
        row_number,
        recipe_title,
        status: ImportItemStatus.FAILED,
        fail_reason: ImportFailReason.UNKNOWN_INGREDIENT,
        fail_detail: `Nguyen lieu khong co trong he thong: ${unknownNames.join(', ')}`,
      });
    }

    // 3) Nguyen lieu xung khac voi nhau trong cung cong thuc.
    const ingredientIds = resolved.map((r) => r.ingredient_id);
    const conflicts = await this.ingredientService.findConflictsAmong(ingredientIds);
    if (conflicts.length > 0) {
      const detail = conflicts
        .map((c) => `(${c.ingredient_id_1}, ${c.ingredient_id_2})${c.reason ? ': ' + c.reason : ''}`)
        .join('; ');
      return this.itemRepo.create({
        row_number,
        recipe_title,
        status: ImportItemStatus.FAILED,
        fail_reason: ImportFailReason.INGREDIENT_CONFLICT,
        fail_detail: `Cac cap nguyen lieu xung khac: ${detail}`,
      });
    }

    // OK -> tao Recipe + RecipeIngredient (status=pending_review, cho Admin duyet nhu thuong).
    const recipe = await this.recipeRepo.save(
      this.recipeRepo.create({
        title: row.title,
        description: row.description,
        instructions: row.instructions,
        prep_time: row.prep_time,
        cook_time: row.cook_time,
        servings: row.servings,
        meal_type: row.meal_type,
        status: RecipeStatus.PENDING_REVIEW,
      }),
    );

    await this.recipeIngredientRepo.save(
      resolved.map((r) =>
        this.recipeIngredientRepo.create({
          recipe_id: recipe.recipe_id,
          ingredient_id: r.ingredient_id,
          quantity: r.row.quantity,
          unit: r.row.unit,
          is_optional: r.row.is_optional ?? false,
        }),
      ),
    );

    return this.itemRepo.create({
      row_number,
      recipe_title,
      status: ImportItemStatus.SUCCESS,
      recipe_id: recipe.recipe_id,
    });
  }

  listBatches(): Promise<RecipeImportBatch[]> {
    return this.batchRepo.find({ order: { created_at: 'DESC' } });
  }

  getBatchItems(batch_id: number): Promise<RecipeImportItem[]> {
    return this.itemRepo.find({ where: { batch_id }, order: { row_number: 'ASC' } });
  }
}
