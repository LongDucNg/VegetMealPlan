import { ErrorCode } from '../../common/constants/error-codes.enum';
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Ingredient, IngredientStatus } from './entities/ingredient.entity';
import { UserAllergy } from './entities/user-allergy.entity';
import { IngredientConflict } from './entities/ingredient-conflict.entity';
import { UserIngredientPrice } from './entities/user-ingredient-price.entity';



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

  findByName(
    ingredient_name: string,
  ): Promise<Ingredient | null> {
    return this.ingredientRepo
      .createQueryBuilder('i')
      .where(
        'LOWER(i.ingredient_name) = LOWER(:name)',
        {
          name: ingredient_name.trim(),
        },
      )
      .getOne();
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
    const existing = await this.findByName(
      dto.ingredient_name,
    );

    if (existing) {
      throw new BadRequestException(
        'Ingredient name already exists',
      );
    }

    const ingredient = this.ingredientRepo.create({
      ingredient_name: dto.ingredient_name.trim(),
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
      throw new NotFoundException({ code: ErrorCode.INGREDIENT_NOT_FOUND, message: `Không tìm thấy nguyên liệu #${ingredient_id}` });
    }

    if (dto.ingredient_name) {
      const existing =
        await this.findByName(
          dto.ingredient_name,
        );

      if (
        existing &&
        existing.ingredient_id !== ingredient_id
      ) {
        throw new BadRequestException(
          'Ingredient name already exists',
        );
      }
    }

    Object.assign(ingredient, {
      ingredient_name:
        dto.ingredient_name ??
        ingredient.ingredient_name,

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
        dto.avg_price_per_unit ??
        ingredient.avg_price_per_unit,

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

    return this.ingredientRepo.save(ingredient);
  }
}