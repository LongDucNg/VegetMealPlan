import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { UserAllergy } from './entities/user-allergy.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepo: Repository<Ingredient>,
    @InjectRepository(UserAllergy)
    private readonly userAllergyRepo: Repository<UserAllergy>,
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepo.find();
  }

  async findOne(ingredient_id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepo.findOne({ where: { ingredient_id } });
    if (!ingredient) throw new NotFoundException(`Ingredient #${ingredient_id} not found`);
    return ingredient;
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
}
