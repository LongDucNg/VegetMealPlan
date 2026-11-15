import { ErrorCode } from '../../common/constants/error-codes.enum';
import { assertRecipeDietCompatible } from '../../common/utils/diet-compat.util';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { UpdateRecipeStatusDto, RecipeReviewStatus } from './dto/update-recipe-status.dto';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { RecipeCategory } from './entities/recipe-category.entity';
import { RecipeService } from './recipe.service';

/**
 * Nghiệp vụ dành cho admin: danh sách món theo trạng thái, xem chi tiết, duyệt hoặc từ chối món.
 * Tách từ RecipeService; lấy nguyên liệu để kiểm tra chế độ ăn qua RecipeService.
 */
@Injectable()
export class RecipeAdminService {
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
  // ADMIN RECIPE REVIEW
  // =========================

  async findAllForAdmin(
    status?: string,
    categoryId?: number,
    page?: number,
    limit?: number,
  ): Promise<any> {
    const value = status?.trim().toLowerCase();
    if (value && !Object.values(RecipeStatus).includes(value as RecipeStatus)) {
      throw new BadRequestException('Trạng thái công thức không hợp lệ');
    }

    if (categoryId !== undefined && (isNaN(categoryId) || categoryId <= 0)) {
      throw new BadRequestException('ID danh mục phải là số nguyên dương');
    }

    // Validate phân trang
    if (page !== undefined && (isNaN(page) || page < 1)) {
      throw new BadRequestException('Số trang phải là số nguyên dương');
    }
    if (limit !== undefined) {
      if (isNaN(limit) || limit < 1) {
        throw new BadRequestException('Số lượng công thức mỗi trang phải là số nguyên dương');
      }
      if (limit > 100) {
        throw new BadRequestException('Số lượng công thức mỗi trang vượt quá giới hạn cho phép');
      }
    }

    // Chỉ dùng phân trang phía server khi client yêu cầu (có page hoặc limit).
    // Nếu không, trả về mảng đầy đủ cho frontend tự phân trang.
    const wantsPagination = page !== undefined || limit !== undefined;
    const pageNum = page ?? 1;
    const limitNum = limit ?? 20;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (value) {
      where.status = value as RecipeStatus;
    } else {
      where.status = Not(RecipeStatus.REMOVED);
    }

    // Lọc theo danh mục PHẢI áp dụng TRƯỚC khi phân trang, nếu không trang
    // hiện tại có thể rỗng dù DB có món thuộc danh mục, và `total` không
    // phản ánh đúng số món của danh mục đó.
    if (categoryId !== undefined) {
      const rcRecords = await this.recipeCategoryRepo.find({
        where: { category_id: categoryId },
        select: { recipe_id: true },
      });

      const recipeIds = [...new Set(rcRecords.map((rc) => rc.recipe_id))];

      if (recipeIds.length === 0) {
        if (wantsPagination) {
          return {
            data: [],
            pagination: {
              page: pageNum,
              limit: limitNum,
              total: 0,
            },
            message: 'Lấy danh sách công thức quản trị thành công.',
          };
        }

        return [];
      }

      where.recipe_id = In(recipeIds);
    }

    // Đếm tổng
    const total = await this.recipeRepo.count({ where });

    // Có page/limit -> trả về object có phân trang (contract đã dùng ở BE2).
    // Không có page/limit -> trả về mảng (contract mà frontend admin đang dùng,
    // frontend tự phân trang phía client).
    const recipes = wantsPagination
      ? await this.recipeRepo.find({
          where,
          order: { created_at: 'DESC' },
          skip,
          take: limitNum,
        })
      : await this.recipeRepo.find({
          where,
          order: { created_at: 'DESC' },
        });

    if (recipes.length > 0) {
      const ids = recipes.map((r) => r.recipe_id);
      const [nutritions, rcRecords, riRecords] = await Promise.all([
        this.nutritionRepo.find({
          where: { recipe_id: In(ids) },
        }),
        this.recipeCategoryRepo.find({
          where: { recipe_id: In(ids) },
          relations: ['category'],
        }),
        this.recipeIngredientRepo.find({
          where: { recipe_id: In(ids) },
          relations: ['ingredient'],
        }),
      ]);

      const nutritionMap = new Map(nutritions.map((n) => [n.recipe_id, n]));
      const categoriesByRecipe = new Map<number, string[]>();
      const rcByRecipe = new Map<number, any[]>();
      for (const rc of rcRecords) {
        const catName = rc.category?.category_name;
        if (!catName) continue;
        const list = categoriesByRecipe.get(rc.recipe_id) ?? [];
        if (rc.category?.category_type === 'recipe_type') {
          list.unshift(catName);
        } else {
          list.push(catName);
        }
        categoriesByRecipe.set(rc.recipe_id, list);

        const rcs = rcByRecipe.get(rc.recipe_id) ?? [];
        if (rc.category?.category_type === 'recipe_type') {
          rcs.unshift(rc);
        } else {
          rcs.push(rc);
        }
        rcByRecipe.set(rc.recipe_id, rcs);
      }

      const riByRecipe = new Map<number, any[]>();
      for (const ri of riRecords) {
        const list = riByRecipe.get(ri.recipe_id) ?? [];
        list.push(ri);
        riByRecipe.set(ri.recipe_id, list);
      }

      for (const recipe of recipes as any[]) {
        const nut = nutritionMap.get(recipe.recipe_id) || null;
        const cats = categoriesByRecipe.get(recipe.recipe_id) || [];
        recipe.category = cats.length > 0 ? cats[0] : null;
        recipe.categories = cats;
        recipe.recipeCategories = rcByRecipe.get(recipe.recipe_id) || [];
        const ings = riByRecipe.get(recipe.recipe_id) || [];
        recipe.recipeIngredients = ings;
        recipe.ingredients = ings;

        const totalIngKcal = ings.reduce((sum: number, item: any) => {
          if (item.is_optional) return sum;
          const calPer100 = Number(item.ingredient?.calories_per_100g ?? 0);
          return sum + (calPer100 * Number(item.quantity ?? 0)) / 100;
        }, 0);

        if (totalIngKcal > 0) {
          const finalCal = Math.round(totalIngKcal * 100) / 100;
          recipe.calories = finalCal;
          if (nut) {
            nut.calories = finalCal;
          }
        }
        recipe.nutrition = nut;
      }
    }

    if (wantsPagination) {
      return {
        data: recipes,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
        },
        message: 'Lấy danh sách công thức quản trị thành công.',
      };
    }

    return recipes;
  }

  
  async findOneForAdmin(recipe_id: number) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id },
    });

    if (!recipe) {
      throw new NotFoundException({
        code: ErrorCode.RECIPE_NOT_FOUND,
        message: `Không tìm thấy công thức #${recipe_id}`,
      });
    }

    const [ingredients, nutrition, rcRecords] = await Promise.all([
      this.recipeIngredientRepo.find({
        where: { recipe_id },
        relations: ['ingredient'],
      }),
      this.nutritionRepo.findOne({
        where: { recipe_id },
      }),
      this.recipeCategoryRepo.find({
        where: { recipe_id },
        relations: ['category'],
      }),
    ]);

    const categories = rcRecords
      .map((rc) => rc.category?.category_name)
      .filter(Boolean);

    const totalIngKcal = (ingredients || []).reduce((sum, item) => {
      if (item.is_optional) return sum;
      const calPer100 = Number(item.ingredient?.calories_per_100g ?? 0);
      return sum + (calPer100 * Number(item.quantity ?? 0)) / 100;
    }, 0);

    if (totalIngKcal > 0) {
      const finalCal = Math.round(totalIngKcal * 100) / 100;
      (recipe as any).calories = finalCal;
      if (nutrition) {
        nutrition.calories = finalCal;
      }
    }

    return {
      ...recipe,
      category: categories.length > 0 ? categories[0] : null,
      categories,
      recipeCategories: rcRecords,
      ingredients,
      recipeIngredients: ingredients,
      nutrition,
    };
  }

  async updateRecipeStatus(
    recipeId: number,
    adminId: number,
    dto: UpdateRecipeStatusDto,
  ) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }

    const status = dto.status;

    if (
      status !== RecipeReviewStatus.APPROVED &&
      status !== RecipeReviewStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Trạng thái công thức chỉ có thể là approved hoặc rejected',
      );
    }

    const reason = dto.reason?.trim();

    // Lý do từ chối là tùy chọn (không bắt buộc)

    // Chỉ kiểm tra khi DUYỆT. Luồng từ chối giữ nguyên: công thức vẫn được
    // lưu, chuyển sang trạng thái rejected và lưu lý do (review_reason).
    //
    // Kiểm tra lại tại thời điểm duyệt là bắt buộc vì nội dung công thức có
    // thể đã bị sửa (hoặc dữ liệu cũ tồn tại từ trước khi có luồng kiểm tra).
    if (status === RecipeReviewStatus.APPROVED) {
      const recipeIngredients = await this.recipeService.getRecipeIngredientsForCheck(
        recipeId,
      );

      assertRecipeDietCompatible(recipe.diet_type, recipeIngredients);
    }

    recipe.status = status as unknown as RecipeStatus;

    if (status === RecipeReviewStatus.APPROVED) {
      recipe.approved_at = new Date();
      recipe.approved_by = adminId;
      recipe.review_reason = null;
    } else {
      recipe.approved_at = null;
      recipe.approved_by = null;
      recipe.review_reason = reason ?? null;
    }

    return this.recipeRepo.save(recipe);
  }
}
