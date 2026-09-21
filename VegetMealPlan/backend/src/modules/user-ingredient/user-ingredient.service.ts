import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserIngredient } from './entities/user-ingredient.entity';
import { CreateUserIngredientDto } from './dto/create-user-ingredient.dto';

@Injectable()
export class UserIngredientService {
  constructor(
    @InjectRepository(UserIngredient)
    private readonly repo: Repository<UserIngredient>,
  ) {}

  findAllByUser(user_id: number): Promise<UserIngredient[]> {
    return this.repo.find({ where: { user_id }, relations: ['ingredient'] });
  }

  create(user_id: number, dto: CreateUserIngredientDto): Promise<UserIngredient> {
    const entity = this.repo.create({ ...dto, user_id });
    return this.repo.save(entity);
  }

  async remove(user_ingredient_id: number): Promise<void> {
    await this.repo.delete({ user_ingredient_id });
  }

  /** Trả về mảng ingredient_id user đang có — RecommendationService dùng cái này làm input. */
  async getAvailableIngredientIds(user_id: number): Promise<number[]> {
    const rows = await this.repo.find({ where: { user_id } });
    return rows.map((r) => r.ingredient_id);
  }
}
