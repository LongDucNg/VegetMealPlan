import { ErrorCode } from '../../common/constants/error-codes.enum';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { QueryRecipeDto } from './dto/query-recipe.dto';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { buildRecipeCsv, RecipeExportRow, deriveCategoryFromTitle } from './recipe-export.util';
import { RecipeService } from './recipe.service';

/**
 * Xuất danh sách món ra file CSV (tải về từ trang công thức).
 * Tách từ RecipeService: lấy danh sách món qua RecipeService.findAll để dùng đúng bộ lọc,
 * rồi ghép nguyên liệu, dinh dưỡng, danh mục thành từng dòng CSV.
 */
@Injectable()
export class RecipeExportService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

    @InjectRepository(RecipeCategory)
    private readonly recipeCategoryRepo: Repository<RecipeCategory>,

    private readonly recipeService: RecipeService,
  ) {}

  // =========================
  // EXPORT CÔNG THỨC (CSV)
  // =========================

  /**
   * Lấy danh sách công thức để export.
   *
   * - `ids` được ưu tiên: export đúng các món có ID trong danh sách.
   *   ID trùng được loại bỏ; ID không tồn tại -> báo lỗi rõ ràng.
   * - Không có `ids`: dùng bộ lọc hiện có (diet_type, status, q, meal_type...).
   *   Tái sử dụng đúng logic lọc của GET /recipes nên không lệch hành vi.
   *
   * `approvedOnly = true` (mặc định, route công khai): chỉ export món đã duyệt.
   * Admin có thể đặt `approvedOnly = false` để export mọi trạng thái.
   */
  async getRecipesForExport(
    ids: string | undefined,
    query: QueryRecipeDto,
    options: { approvedOnly?: boolean; maxIds?: number } = {},
  ): Promise<Recipe[]> {
    const approvedOnly = options.approvedOnly ?? true;
    const maxIds = options.maxIds ?? 200;

    const parsedIds = this.parseRecipeIds(ids);

    if (parsedIds !== null) {
      if (parsedIds.length === 0) {
        throw new BadRequestException(
          'ids không hợp lệ. Ví dụ hợp lệ: 15 hoặc 15,20,35',
        );
      }

      if (parsedIds.length > maxIds) {
        throw new BadRequestException(
          `Chỉ được export tối đa ${maxIds} công thức mỗi request (đang gửi ${parsedIds.length}).`,
        );
      }

      // Chỉ lấy các món ĐÃ DUYỆT để export công khai không lộ công thức
      // nháp / riêng tư / chưa duyệt.
      const qb = this.recipeRepo
        .createQueryBuilder('recipe')
        .where('recipe.recipe_id IN (:...ids)', { ids: parsedIds });

      if (approvedOnly) {
        qb.andWhere('recipe.status = :status', {
          status: RecipeStatus.APPROVED,
        });
      }

      const recipes = await qb.getMany();

      // Báo rõ ID nào không tồn tại (hoặc không được phép xem).
      const foundIds = new Set(recipes.map((r) => r.recipe_id));
      const missingIds = parsedIds.filter((id) => !foundIds.has(id));

      if (missingIds.length > 0) {
        throw new NotFoundException({
          code: ErrorCode.RECIPE_NOT_FOUND,
          message:
            `Không tìm thấy công thức với ID: ${missingIds.join(', ')}` +
            (approvedOnly
              ? '. Chỉ export được công thức đã duyệt.'
              : '.'),
        });
      }

      // Giữ đúng thứ tự ID client gửi lên.
      const byId = new Map(recipes.map((r) => [r.recipe_id, r]));
      return parsedIds.map((id) => byId.get(id)!);
    }

    // Không có ids -> dùng bộ lọc hiện có. Tái sử dụng đúng logic của findAll.
    const result = await this.recipeService.findAll(
      { ...query, page: 1, limit: 1000 },
      { approvedOnly },
    );

    return result.data;
  }

  /**
   * Parse chuỗi `ids` thành danh sách số nguyên dương, loại bỏ trùng lặp.
   * Trả null nếu client không gửi `ids` (khi đó dùng bộ lọc).
   */
  private parseRecipeIds(ids?: string): number[] | null {
    if (ids === undefined || ids === null) {
      return null;
    }

    const parts = ids
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part.length > 0);

    if (parts.length === 0) {
      return [];
    }

    const parsed: number[] = [];

    for (const part of parts) {
      if (!/^\d+$/.test(part)) {
        throw new BadRequestException(
          `ID công thức không hợp lệ: "${part}". ID phải là số nguyên dương.`,
        );
      }

      const id = Number(part);

      if (!Number.isInteger(id) || id <= 0) {
        throw new BadRequestException(
          `ID công thức không hợp lệ: "${part}". ID phải là số nguyên dương.`,
        );
      }

      // Loại bỏ ID trùng lặp, giữ thứ tự gốc.
      if (!parsed.includes(id)) {
        parsed.push(id);
      }
    }

    return parsed;
  }

  /**
   * Chuyển danh sách công thức thành các dòng dữ liệu cho file CSV export.
   * Gộp nguyên liệu, dinh dưỡng và danh mục của từng công thức.
   */
  async buildRecipeExportRows(recipes: Recipe[]): Promise<RecipeExportRow[]> {
    if (recipes.length === 0) {
      return [];
    }

    const recipeIds = recipes.map((r) => r.recipe_id);

    const [ingredientRows, nutritionRows, categoryRows] = await Promise.all([
      this.recipeIngredientRepo.find({
        where: { recipe_id: In(recipeIds) },
        relations: ['ingredient'],
      }),
      this.nutritionRepo.find({
        where: { recipe_id: In(recipeIds) },
      }),
      this.recipeCategoryRepo.find({
        where: { recipe_id: In(recipeIds) },
        relations: ['category'],
      }),
    ]);

    const ingredientsByRecipe = new Map<number, RecipeIngredient[]>();
    for (const row of ingredientRows) {
      const list = ingredientsByRecipe.get(row.recipe_id) ?? [];
      list.push(row);
      ingredientsByRecipe.set(row.recipe_id, list);
    }

    const nutritionMap = new Map(
      nutritionRows.map((n) => [n.recipe_id, n]),
    );

    const categoriesByRecipe = new Map<number, string[]>();
    for (const row of categoryRows) {
      if (row.category?.category_type === 'food_type') continue;
      const name = row.category?.category_name;
      if (!name) continue;
      const list = categoriesByRecipe.get(row.recipe_id) ?? [];
      list.push(name);
      categoriesByRecipe.set(row.recipe_id, list);
    }

    return recipes.map((recipe) => {
      const ingredients = ingredientsByRecipe.get(recipe.recipe_id) ?? [];
      const nutrition = nutritionMap.get(recipe.recipe_id);

      return {
        recipe_id: recipe.recipe_id,
        title: recipe.title ?? '',
        description: recipe.description ?? '',
        diet_type: recipe.diet_type ?? '',
        meal_type: recipe.meal_type ?? '',
        suitable_meals: recipe.suitable_meals ?? '',
        difficulty: recipe.difficulty ?? '',
        servings: recipe.servings ?? null,
        prep_time: recipe.prep_time ?? null,
        cook_time: recipe.cook_time ?? null,
        ingredient_count: ingredients.length,
        ingredient_ids: ingredients
          .map((i) => i.ingredient_id)
          .join(', '),
        ingredients: ingredients
          .map(
            (i) =>
              `${i.ingredient?.ingredient_name ?? `#${i.ingredient_id}`} ` +
              `(${i.quantity ?? 0}${i.unit ?? ''}` +
              `${i.is_optional ? ', tuỳ chọn' : ''}` +
              `${i.note ? `, ${i.note}` : ''})`,
          )
          .join('; '),
        recipe_ingredients: ingredients.map((i) => ({
          ingredient_id: i.ingredient_id,
          ingredient_name: i.ingredient?.ingredient_name ?? '',
          quantity: i.quantity,
          unit: i.unit,
          is_optional: i.is_optional,
        })),
        calories: nutrition?.calories ?? null,
        protein: nutrition?.protein ?? null,
        carbs: nutrition?.carbs ?? null,
        fat: nutrition?.fat ?? null,
        fiber: nutrition?.fiber ?? null,
        estimated_cost: recipe.estimated_cost ?? null,
        categories:
          (categoriesByRecipe.get(recipe.recipe_id) &&
            categoriesByRecipe.get(recipe.recipe_id)!.length > 0)
            ? categoriesByRecipe.get(recipe.recipe_id)!.join(', ')
            : deriveCategoryFromTitle(recipe.title, recipe.meal_type),
        instructions: recipe.instructions ?? '',
        image_url: recipe.image_url ?? '',
        status: recipe.status ?? '',
        created_by: recipe.created_by ?? null,
        created_at: recipe.created_at
          ? new Date(recipe.created_at).toISOString()
          : '',
      };
    });
  }

  /**
   * Sinh nội dung file CSV export công thức.
   * Trả về { filename, content } - controller sẽ trả thẳng ra response.
   */
  async exportRecipesCsv(
    ids: string | undefined,
    query: QueryRecipeDto,
    options: { approvedOnly?: boolean; maxIds?: number } = {},
  ): Promise<{ filename: string; content: string }> {
    const recipes = await this.getRecipesForExport(ids, query, options);

    if (recipes.length === 0) {
      throw new NotFoundException({
        code: ErrorCode.RECIPE_NOT_FOUND,
        message: 'Không có công thức nào khớp để export.',
      });
    }

    const rows = await this.buildRecipeExportRows(recipes);
    const content = buildRecipeCsv(rows);

    return {
      filename: this.buildExportFilename(ids, rows),
      content,
    };
  }

  /** Tên file export có thông tin ngữ cảnh (theo ID hoặc theo bộ lọc). */
  private buildExportFilename(
    ids: string | undefined,
    rows: RecipeExportRow[],
  ): string {
    const stamp = new Date()
      .toISOString()
      .slice(0, 16)
      .replace(/[:T]/g, '-');

    if (ids !== undefined && ids.trim() !== '') {
      const count = rows.length;
      return `cong-thuc-${count}-mon-${stamp}.csv`;
    }

    return `cong-thuc-${rows.length}-mon-${stamp}.csv`;
  }
}
