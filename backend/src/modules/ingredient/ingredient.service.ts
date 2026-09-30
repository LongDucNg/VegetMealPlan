import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { UserAllergy } from './entities/user-allergy.entity';
import { IngredientConflict } from './entities/ingredient-conflict.entity';
import { UserIngredientPrice } from './entities/user-ingredient-price.entity';

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
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepo.find();
  }

  async findOne(ingredient_id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepo.findOne({ where: { ingredient_id } });
    if (!ingredient) throw new NotFoundException(`Ingredient #${ingredient_id} not found`);
    return ingredient;
  }

  /** Tra nguoc theo ten (khong phan biet hoa/thuong) - dung khi import tu file. */
  findByName(ingredient_name: string): Promise<Ingredient | null> {
    return this.ingredientRepo
      .createQueryBuilder('i')
      .where('LOWER(i.ingredient_name) = LOWER(:name)', { name: ingredient_name.trim() })
      .getOne();
  }

  findByIds(ids: number[]): Promise<Ingredient[]> {
    if (!ids.length) return Promise.resolve([]);
    return this.ingredientRepo.find({ where: { ingredient_id: In(ids) } });
  }

  /** Trả về danh sách ingredient_id mà user bị dị ứng — dùng bởi RecommendationService. */
  async getAllergyIngredientIds(user_id: number): Promise<number[]> {
    const rows = await this.userAllergyRepo.find({ where: { user_id } });
    return rows.map((r) => r.ingredient_id);
  }

  /**
   * Kiem tra TAT CA cac cap nguyen lieu xung khac trong 1 danh sach (dung khi
   * them/sua nguyen lieu cho 1 recipe, hoac khi import hang loat). Duyet tung
   * cap trong danh sach - KHONG chi so sanh 1-1 voi nguyen lieu vua them, vi
   * 1 recipe co the co 3+ nguyen lieu.
   */
  async findConflictsAmong(ingredientIds: number[]): Promise<IngredientConflict[]> {
    const uniqueIds = [...new Set(ingredientIds)];
    if (uniqueIds.length < 2) return [];

    const allConflicts = await this.conflictRepo.find({
      where: [
        { ingredient_id_1: In(uniqueIds) },
        { ingredient_id_2: In(uniqueIds) },
      ],
    });

    const idSet = new Set(uniqueIds);
    return allConflicts.filter(
      (c) => idSet.has(c.ingredient_id_1) && idSet.has(c.ingredient_id_2),
    );
  }

  /**
   * Gia dung de tinh estimated_cost cho 1 user cu the: uu tien gia user tu cap nhat
   * (UserIngredientPrice), khong co thi fallback ve gia trung binh he thong.
   */
  async getEffectivePrice(user_id: number, ingredient_id: number): Promise<number | null> {
    const override = await this.priceOverrideRepo.findOne({ where: { user_id, ingredient_id } });
    if (override) return override.price_per_unit;

    const ingredient = await this.ingredientRepo.findOne({ where: { ingredient_id } });
    return ingredient?.avg_price_per_unit ?? null;
  }

  /** User tu cap nhat gia "di cho" rieng cho minh - dung lai cho nhung lan tinh sau. */
  async setUserPrice(
    user_id: number,
    ingredient_id: number,
    price_per_unit: number,
  ): Promise<UserIngredientPrice> {
    let override = await this.priceOverrideRepo.findOne({ where: { user_id, ingredient_id } });
    if (!override) {
      override = this.priceOverrideRepo.create({ user_id, ingredient_id, price_per_unit });
    } else {
      override.price_per_unit = price_per_unit;
    }
    return this.priceOverrideRepo.save(override);
  }
}
