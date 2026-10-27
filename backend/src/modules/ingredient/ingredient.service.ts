import { ErrorCode } from '../../common/constants/error-codes.enum';
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Ingredient, IngredientStatus } from './entities/ingredient.entity';
import { UserAllergy } from './entities/user-allergy.entity';
import { IngredientConflict } from './entities/ingredient-conflict.entity';
import { UserIngredientPrice } from './entities/user-ingredient-price.entity';

import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeIngredient } from '../recipe/entities/recipe-ingredient.entity';
import { NutritionInfo } from '../nutrition/entities/nutrition-info.entity';
import { calculateNutritionPerServing } from '../recipe/recipe-nutrition.util';



export interface RecipeIngredientRow {
  ingredient_id: number;
  quantity: number;
  unit: string;
}

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepo: Repository<Ingredient>,

    @InjectRepository(UserAllergy)
    private readonly userAllergyRepo: Repository<UserAllergy>,

    @InjectRepository(IngredientConflict)
    private readonly conflictRepo: Repository<IngredientConflict>,

    @InjectRepository(UserIngredientPrice)
    private readonly priceOverrideRepo: Repository<UserIngredientPrice>,

    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,

    @InjectRepository(RecipeIngredient)
    private readonly recipeIngredientRepo: Repository<RecipeIngredient>,

    @InjectRepository(NutritionInfo)
    private readonly nutritionRepo: Repository<NutritionInfo>,

  ) { }

  // =========================
  // GET ALL INGREDIENTS
  // =========================

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepo.find();
  }

  // =========================
  // GET INGREDIENT BY ID
  // =========================

  async findOne(ingredient_id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepo.findOne({
      where: { ingredient_id },
    });

    if (!ingredient) {
      throw new NotFoundException({ code: ErrorCode.INGREDIENT_NOT_FOUND, message: `Không tìm thấy nguyên liệu #${ingredient_id}` });
    }

    return ingredient;
  }

  // =========================
  // FIND INGREDIENT BY NAME
  // =========================

  async findByName(
    ingredient_name: string,
  ): Promise<Ingredient | null> {
    const trimmed = ingredient_name.trim();
    if (!trimmed) return null;

    const exact = await this.ingredientRepo
      .createQueryBuilder('i')
      .where('LOWER(i.ingredient_name) = LOWER(:name)', { name: trimmed })
      .getOne();

    if (exact) return exact;

    return this.ingredientRepo
      .createQueryBuilder('i')
      .where('LOWER(i.ingredient_name) ILIKE :like OR :trimmed ILIKE (\'%\' || LOWER(i.ingredient_name) || \'%\')', {
        like: `%${trimmed.toLowerCase()}%`,
        trimmed: trimmed.toLowerCase(),
      })
      .getOne();
  }

  // =========================
  // ADMIN CONFLICT MANAGEMENT
  // =========================

  async findAllConflicts(): Promise<IngredientConflict[]> {
    return this.conflictRepo.find({
      relations: ['ingredient_1', 'ingredient_2'],
      order: { ingredient_id_1: 'ASC', ingredient_id_2: 'ASC' },
    });
  }

  async createConflict(id1: number, id2: number, reason?: string): Promise<IngredientConflict> {
    if (id1 === id2) {
      throw new BadRequestException('Hai nguyên liệu xung khắc phải khác nhau');
    }
    const ingredient_id_1 = Math.min(id1, id2);
    const ingredient_id_2 = Math.max(id1, id2);

    await this.findOne(ingredient_id_1);
    await this.findOne(ingredient_id_2);

    const existing = await this.conflictRepo.findOne({
      where: { ingredient_id_1, ingredient_id_2 },
    });

    if (existing) {
      if (reason) existing.reason = reason;
      return this.conflictRepo.save(existing);
    }

    const conflict = new IngredientConflict();
    conflict.ingredient_id_1 = ingredient_id_1;
    conflict.ingredient_id_2 = ingredient_id_2;
    conflict.reason = reason || '';
    return this.conflictRepo.save(conflict);
  }

  async deleteConflict(id1: number, id2: number): Promise<{ success: true; message: string }> {
    const ingredient_id_1 = Math.min(id1, id2);
    const ingredient_id_2 = Math.max(id1, id2);

    const conflict = await this.conflictRepo.findOne({
      where: { ingredient_id_1, ingredient_id_2 },
    });

    if (!conflict) {
      throw new NotFoundException('Không tìm thấy cặp nguyên liệu kỵ nhau này');
    }

    await this.conflictRepo.remove(conflict);
    return { success: true, message: 'Đã xoá cặp nguyên liệu kỵ nhau thành công' };
  }

  // =========================
  // FIND INGREDIENTS BY IDS
  // =========================

  findByIds(ids: number[]): Promise<Ingredient[]> {
    if (!ids.length) {
      return Promise.resolve([]);
    }

    return this.ingredientRepo.find({
      where: {
        ingredient_id: In(ids),
      },
    });
  }

  // =========================
  // GET USER ALLERGIES
  // =========================

  async getAllergyIngredientIds(
    user_id: number,
  ): Promise<number[]> {
    const rows = await this.userAllergyRepo.find({
      where: { user_id },
    });

    return rows.map((r) => r.ingredient_id);
  }

  // =========================
  // FIND INGREDIENT CONFLICTS
  // =========================

  async findConflictsAmong(
    ingredientIds: number[],
  ): Promise<IngredientConflict[]> {
    const uniqueIds = [...new Set(ingredientIds)];

    if (uniqueIds.length < 2) {
      return [];
    }

    const allConflicts = await this.conflictRepo.find({
      where: [
        {
          ingredient_id_1: In(uniqueIds),
        },
        {
          ingredient_id_2: In(uniqueIds),
        },
      ],
    });

    const idSet = new Set(uniqueIds);

    return allConflicts.filter(
      (c) =>
        idSet.has(c.ingredient_id_1) &&
        idSet.has(c.ingredient_id_2),
    );
  }

  // =========================
  // GET EFFECTIVE PRICE
  // =========================
  // Nếu user có giá riêng -> dùng giá riêng.
  // Nếu không -> dùng giá trung bình của hệ thống.

  async getEffectivePrice(
    user_id: number,
    ingredient_id: number,
  ): Promise<number | null> {
    const override = await this.priceOverrideRepo.findOne({
      where: {
        user_id,
        ingredient_id,
      },
    });

    if (override) {
      return override.price_per_unit;
    }

    const ingredient = await this.ingredientRepo.findOne({
      where: {
        ingredient_id,
      },
    });

    return ingredient?.avg_price_per_unit ?? null;
  }

  // =========================
  // SET USER PRICE
  // =========================


  async setUserPrice(
    user_id: number,
    ingredient_id: number,
    price_per_unit: number,
  ): Promise<UserIngredientPrice> {
    // Kiểm tra nguyên liệu có tồn tại không
    await this.findOne(ingredient_id);

    let override = await this.priceOverrideRepo.findOne({
      where: {
        user_id,
        ingredient_id,
      },
    });

    if (!override) {
      override = this.priceOverrideRepo.create({
        user_id,
        ingredient_id,
        price_per_unit,
      });
    } else {
      override.price_per_unit = price_per_unit;
    }

    return this.priceOverrideRepo.save(override);
  }

  // =========================
  // CALCULATE RECIPE INGREDIENT COST
  // =========================
  //
  // unit = "g"
  // -> avg_price_per_unit được hiểu là giá/kg
  // -> cost = quantity * price / 1000
  //
  // Các unit khác:
  // củ, quả, miếng, ổ, tép, tờ, trái...
  // -> tính theo số lượng
  // -> cost = quantity * price

  async getRecipeCost(
    recipeIngredients: RecipeIngredientRow[],
    user_id?: number,
  ) {
    if (!recipeIngredients.length) {
      return {
        total_cost: 0,
        ingredients: [],
      };
    }

    const ids = recipeIngredients.map(
      (r) => r.ingredient_id,
    );

    const ingredients = await this.findByIds(ids);

    const ingredientMap = new Map(
      ingredients.map((i) => [
        i.ingredient_id,
        i,
      ]),
    );

    const calculatedIngredients = await Promise.all(
      recipeIngredients.map(async (row) => {
        const ingredient = ingredientMap.get(
          row.ingredient_id,
        );

        // Giá mặc định của hệ thống
        let price =
          ingredient?.avg_price_per_unit ?? 0;

        // Nếu có user_id thì ưu tiên giá riêng của user
        if (user_id) {
          const effectivePrice =
            await this.getEffectivePrice(
              user_id,
              row.ingredient_id,
            );

          price = effectivePrice ?? 0;
        }

        let cost = 0;

        // Gram -> giá/kg
        if (row.unit === 'g') {
          cost =
            (row.quantity * price) / 1000;
        } else {
          // Các đơn vị khác -> giá/1 đơn vị
          cost =
            row.quantity * price;
        }

        return {
          ingredient_id: row.ingredient_id,
          ingredient_name:
            ingredient?.ingredient_name ?? '',
          quantity: row.quantity,
          unit: row.unit,
          price_per_unit: price,
          cost: Math.round(cost),
        };
      }),
    );

    const total_cost =
      calculatedIngredients.reduce(
        (sum, item) => sum + item.cost,
        0,
      );

    return {
      total_cost: Math.round(total_cost),
      ingredients: calculatedIngredients,
    };
  }

  // =========================
  // ADMIN CREATE INGREDIENT
  // =========================

  async createIngredient(
    dto: CreateIngredientDto,
  ): Promise<Ingredient> {
    const trimmedName = dto.ingredient_name.trim();

    const existing = await this.findByName(
      trimmedName,
    );

    if (existing) {
      throw new ConflictException({ code: ErrorCode.INGREDIENT_NAME_CONFLICT, message: 'Nguyên liệu này đã tồn tại trong hệ thống.' });
    }

    const ingredient = this.ingredientRepo.create({
      ingredient_name: trimmedName,
      unit: dto.unit,
      description: dto.description,
      vegan_flag: dto.vegan_flag ?? true,
      avg_price_per_unit:
        dto.avg_price_per_unit,
      calories_per_100g:
        dto.calories_per_100g,
      protein_per_100g:
        dto.protein_per_100g,
      carb_per_100g:
        dto.carb_per_100g,
      fat_per_100g:
        dto.fat_per_100g,
      fiber_per_100g:
        dto.fiber_per_100g,
      is_seasonal:
        dto.is_seasonal ?? false,
      season_months:
        dto.season_months,
      status:
        dto.status ?? IngredientStatus.ACTIVE,
    });

    return this.ingredientRepo.save(ingredient);
  }

  // =========================
  // ADMIN UPDATE INGREDIENT
  // =========================

  async updateIngredient(
    ingredient_id: number,
    dto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const ingredient =
      await this.ingredientRepo.findOne({
        where: { ingredient_id },
      });

      if (!ingredient) {
      throw new NotFoundException({ code: ErrorCode.INGREDIENT_NOT_FOUND, message: 'Không tìm thấy nguyên liệu cần cập nhật.' });
    }

    if (dto.ingredient_name !== undefined) {
      const trimmedName = dto.ingredient_name.trim();

      if (!trimmedName) {
        throw new BadRequestException({ code: ErrorCode.INGREDIENT_NAME_EMPTY, message: 'Tên nguyên liệu không được để trống.' });
      }

      const existing =
        await this.findByName(
          trimmedName,
        );

      if (
        existing &&
        existing.ingredient_id !== ingredient_id
      ) {
        throw new ConflictException({ code: ErrorCode.INGREDIENT_NAME_CONFLICT, message: 'Nguyên liệu này đã tồn tại trong hệ thống.' });
      }

      ingredient.ingredient_name = trimmedName;
    }

    Object.assign(ingredient, {
      unit:
        dto.unit ??
        ingredient.unit,

      description:
        dto.description ??
        ingredient.description,

      vegan_flag:
        dto.vegan_flag ??
        ingredient.vegan_flag,

      avg_price_per_unit:
        dto.avg_price_per_unit != null && dto.avg_price_per_unit > 0
          ? dto.avg_price_per_unit
          : ingredient.avg_price_per_unit,

      calories_per_100g:
        dto.calories_per_100g ??
        ingredient.calories_per_100g,

      protein_per_100g:
        dto.protein_per_100g ??
        ingredient.protein_per_100g,

      carb_per_100g:
        dto.carb_per_100g ??
        ingredient.carb_per_100g,

      fat_per_100g:
        dto.fat_per_100g ??
        ingredient.fat_per_100g,

      fiber_per_100g:
        dto.fiber_per_100g ??
        ingredient.fiber_per_100g,

      is_seasonal:
        dto.is_seasonal ??
        ingredient.is_seasonal,

      season_months:
        dto.season_months ??
        ingredient.season_months,

      status:
        dto.status ??
        ingredient.status,
    });

    const saved = await this.ingredientRepo.save(ingredient);

    // Sửa giá trị dinh dưỡng của nguyên liệu => các công thức chứa nguyên liệu
    // đó phải tính lại nutrition_infos, nếu không thực đơn vẫn dùng số calo cũ.
    const nutritionChanged =
      dto.calories_per_100g !== undefined ||
      dto.protein_per_100g !== undefined ||
      dto.carb_per_100g !== undefined ||
      dto.fat_per_100g !== undefined ||
      dto.fiber_per_100g !== undefined;

    if (nutritionChanged) {
      await this.syncAffectedRecipes(ingredient_id);
    }

    return saved;
  }

  // =========================================================
  // TÍNH LẠI DINH DƯỠNG CHO CÔNG THỨC CHỨA NGUYÊN LIỆU NÀY
  // =========================================================

  /**
   * Tính lại nutrition_infos cho mọi công thức có nguyên liệu `ingredient_id`.
   * Dùng CHUNG công thức calculateNutritionPerServing với luồng tạo/cập nhật công thức.
   */
  private async syncAffectedRecipes(
    ingredient_id: number,
  ): Promise<void> {
    const rows = await this.recipeIngredientRepo.find({
      where: { ingredient_id },
    });

    if (rows.length === 0) {
      return;
    }

    const recipeIds = [
      ...new Set(rows.map((row) => row.recipe_id)),
    ];

    const [recipes, nutritionRows] = await Promise.all([
      this.recipeRepo.find({
        where: { recipe_id: In(recipeIds) },
      }),
      this.nutritionRepo.find({
        where: { recipe_id: In(recipeIds) },
      }),
    ]);

    const recipeMap = new Map(
      recipes.map((item) => [item.recipe_id, item]),
    );
    const nutritionMap = new Map(
      nutritionRows.map((item) => [item.recipe_id, item]),
    );

    // relations: ['ingredient'] => lấy luôn giá trị dinh dưỡng MỚI của nguyên liệu
    // (vừa được update ở trên) trong cùng một lần truy vấn.
    const recipeIngredients = await this.recipeIngredientRepo.find({
      where: { recipe_id: In(recipeIds) },
      relations: ['ingredient'],
    });

    const rowsByRecipe = new Map<number, RecipeIngredient[]>();

    for (const row of recipeIngredients) {
      const list = rowsByRecipe.get(row.recipe_id) ?? [];
      list.push(row);
      rowsByRecipe.set(row.recipe_id, list);
    }

    for (const recipeId of recipeIds) {
      const recipe = recipeMap.get(recipeId);
      const recipeRows = rowsByRecipe.get(recipeId) ?? [];

      if (!recipe || recipeRows.length === 0) {
        continue;
      }

      const nutrition = calculateNutritionPerServing(
        recipeRows.map((row) => ({
          quantity: Number(row.quantity ?? 0),
          is_optional: row.is_optional,
          ingredient: row.ingredient,
        })),
        recipe.servings,
      );

      let nutritionInfo = nutritionMap.get(recipeId);

      if (!nutritionInfo) {
        nutritionInfo = this.nutritionRepo.create({
          recipe_id: recipeId,
        });
      }

      Object.assign(nutritionInfo, {
        calories: Math.round(nutrition.calories * 100) / 100,
        protein: Math.round(nutrition.protein * 100) / 100,
        carbs: Math.round(nutrition.carbs * 100) / 100,
        fat: Math.round(nutrition.fat * 100) / 100,
        fiber: Math.round(nutrition.fiber * 100) / 100,
      });

      await this.nutritionRepo.save(nutritionInfo);
    }
  }
}