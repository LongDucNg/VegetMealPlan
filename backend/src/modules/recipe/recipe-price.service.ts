import { ErrorCode } from '../../common/constants/error-codes.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe, RecipeStatus } from './entities/recipe.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { UserRecipePrice } from './entities/user-recipe-price.entity';
import { calculateIngredientCost } from './recipe-cost.util';

/**
 * Giá món ăn: chi phí ước tính theo nguyên liệu, giá cộng đồng nhập,
 * và giá riêng của từng người dùng.
 * Tách từ RecipeService, logic giữ nguyên.
 */
@Injectable()
export class RecipePriceService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(UserRecipePrice)
    private readonly userRecipePriceRepo: Repository<UserRecipePrice>,
  ) {}

  // =========================
  // RECIPE COST
  // =========================

  async getRecipeCost(recipe_id: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        recipe_id,
        status: RecipeStatus.APPROVED,
      },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipe_id}` });
    }

    const rows = await this.recipeIngredientRepo.find({
      where: { recipe_id },
      relations: ['ingredient'],
    });

    let hasIncompletePrice = false;

    const ingredients = rows.map((row) => {
      const ingredient = row.ingredient;
      const price = Number(ingredient?.avg_price_per_unit ?? 0);
      const hasPrice = ingredient?.avg_price_per_unit != null;
      const quantity = Number(row.quantity ?? 0);

      if (!hasPrice) {
        hasIncompletePrice = true;
      }

      // Quy đổi đơn vị của công thức sang đơn vị tính giá của nguyên liệu.
      const { cost, converted } = calculateIngredientCost(
        quantity,
        row.unit,
        ingredient?.unit,
        price,
      );

      return {
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
        quantity,
        unit: row.unit,
        price_unit: ingredient?.unit ?? null,
        unit_price: hasPrice ? price : null,
        cost: hasPrice ? Math.round(cost) : null,
        // false: không quy đổi được đơn vị, chi phí chỉ là ước tính
        unit_converted: hasPrice ? converted : false,
        calories_per_100g: ingredient?.calories_per_100g != null ? Math.round(Number(ingredient.calories_per_100g) * 100) / 100 : null,
        calories: ingredient?.calories_per_100g != null
          ? Math.round(((Number(row.quantity ?? 0) / 100) * Number(ingredient.calories_per_100g)) * 100) / 100
          : null,
      };
    });

    // total_cost là chi phí CẢ MÓN (nguyên liệu khai báo cho cả món);
    // cost_per_serving = cả món / số khẩu phần.
    const servings =
      recipe.servings && recipe.servings > 0 ? recipe.servings : 1;

    if (hasIncompletePrice) {
      return {
        recipe_id: recipe.recipe_id,
        recipe_title: recipe.title,
        servings,
        total_cost: null,
        cost_per_serving: null,
        cost_is_incomplete: true,
        ingredients,
      };
    }

    const total_cost = ingredients.reduce(
      (sum, item) => sum + (item.cost ?? 0),
      0,
    );

    return {
      recipe_id: recipe.recipe_id,
      recipe_title: recipe.title,
      servings,
      total_cost: Math.round(total_cost),
      cost_per_serving: Math.round(total_cost / servings),
      cost_is_incomplete: false,
      ingredients,
    };
  }

  // =========================
  // COMMUNITY PRICES
  // =========================

  async getRecipeCommunityPrices(recipeId: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        recipe_id: recipeId,
        status: RecipeStatus.APPROVED,
      },
    });

    if (!recipe) {
      throw new NotFoundException({
        code: ErrorCode.RECIPE_NOT_FOUND,
        message: 'Không tìm thấy công thức hoặc công thức chưa được phép sử dụng.',
      });
    }

    const prices = await this.userRecipePriceRepo.find({
      where: { recipe_id: recipeId },
      order: { updated_at: 'DESC' },
    });

    const estimatedCost =
      recipe.estimated_cost != null ? Number(recipe.estimated_cost) : null;

    // Luôn trả estimated_cost
    const base: Record<string, any> = {
      recipe_id: recipeId,
      recipe_title: recipe.title,
      estimated_cost: estimatedCost,
      has_contributions: prices.length > 0,
    };

    if (prices.length === 0) {
      return {
        ...base,
        latest_price: null,
        latest_updated_at: null,
        diff_from_estimated: null,
        stats: null,
        contributions: [],
        message: 'Chưa có giá tham khảo từ người dùng.',
        notice: 'Giá cộng đồng chỉ mang tính tham khảo và có thể thay đổi theo nơi mua.',
      };
    }

    const latest = prices[0];
    const actualPrices = prices.map((p) => Number(p.actual_price));
    const avg = actualPrices.reduce((s, v) => s + v, 0) / actualPrices.length;
    const min = Math.min(...actualPrices);
    const max = Math.max(...actualPrices);

    const latestPrice = Number(latest.actual_price);

    const contributions = prices.map((p) => {
      const actual = Number(p.actual_price);
      return {
        actual_price: actual,
        diff:
          estimatedCost !== null
            ? Math.round((actual - estimatedCost) * 100) / 100
            : null,
        updated_at: p.updated_at,
      };
    });

    return {
      ...base,
      latest_price: latestPrice,
      latest_updated_at: latest.updated_at,
      diff_from_estimated:
        estimatedCost !== null
          ? Math.round((latestPrice - estimatedCost) * 100) / 100
          : null,
      stats: {
        average_price: Math.round(avg * 100) / 100,
        min_price: min,
        max_price: max,
        total_contributions: prices.length,
      },
      contributions,
      message: 'Giá cộng đồng được lấy từ lần cập nhật gần nhất.',
      notice: 'Giá cộng đồng chỉ mang tính tham khảo và có thể thay đổi theo nơi mua.',
    };
  }

  // =========================
  // USER RECIPE PRICES
  // =========================

  async getMyRecipePrices(userId: number) {
    const prices = await this.userRecipePriceRepo.find({
      where: { user_id: userId },
      relations: ['recipe'],
      order: { updated_at: 'DESC' },
    });

    return prices.map((item) => {
      const recipe = item.recipe;
      const isApproved = recipe?.status === RecipeStatus.APPROVED;
      const estimatedCost =
        recipe?.estimated_cost != null
          ? Number(recipe.estimated_cost)
          : null;

      return {
        recipe_id: item.recipe_id,
        // Chỉ trả recipe object khi công thức được duyệt, không lộ công thức ẩn
        recipe: isApproved ? recipe : null,
        actual_price: Number(item.actual_price),
        estimated_cost: estimatedCost,
        diff:
          estimatedCost !== null
            ? Number(item.actual_price) - estimatedCost
            : null,
        updated_at: item.updated_at,
      };
    });
  }

  async setMyRecipePrice(
    userId: number,
    recipeId: number,
    actualPrice: number,
  ) {
    const recipe = await this.recipeRepo.findOne({
      where: { recipe_id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: `Không tìm thấy công thức #${recipeId}` });
    }

    if (recipe.status !== RecipeStatus.APPROVED) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: 'Không tìm thấy công thức hoặc công thức chưa được phép sử dụng.' });
    }

    let price = await this.userRecipePriceRepo.findOne({
      where: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });

    if (price) {
      price.actual_price = actualPrice;
    } else {
      price = this.userRecipePriceRepo.create({
        user_id: userId,
        recipe_id: recipeId,
        actual_price: actualPrice,
      });
    }

    const saved = await this.userRecipePriceRepo.save(price);

    const estimatedCost =
      recipe.estimated_cost != null
        ? Number(recipe.estimated_cost)
        : null;

    const actual = Number(saved.actual_price);
    const diff =
      estimatedCost !== null
        ? Math.round((actual - estimatedCost) * 100) / 100
        : null;
    const diffPercentage =
      estimatedCost !== null && estimatedCost > 0
        ? Math.round(((actual - estimatedCost) / estimatedCost) * 10000) / 100
        : null;

    return {
      message: 'Cập nhật giá thực tế của bạn cho món ăn thành công.',
      recipe_id: recipeId,
      recipe_title: recipe.title,
      actual_price: actual,
      estimated_cost: estimatedCost,
      diff,
      diff_percentage: diffPercentage,
      updated_at: saved.updated_at,
    };
  }

  async removeMyRecipePrice(
    userId: number,
    recipeId: number,
  ) {
    const price = await this.userRecipePriceRepo.findOne({
      where: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });

    if (!price) {
      throw new NotFoundException({ code: ErrorCode.RECIPE_NOT_FOUND, message: 'Không tìm thấy giá thực tế do bạn đóng góp cho công thức này.' });
    }

    await this.userRecipePriceRepo.remove(price);

    return {
      message: 'Đã xóa giá thực tế do bạn đóng góp.',
      recipe_id: recipeId,
    };
  }
}
