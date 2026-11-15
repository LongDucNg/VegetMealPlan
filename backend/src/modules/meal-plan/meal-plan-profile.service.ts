import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MealPlanProfile } from './entities/meal-plan-profile.entity';
import { ProfileAllergy } from './entities/profile-allergy.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

/**
 * Dị ứng của hồ sơ người thân (meal_plan_profiles + profile_allergies).
 * Tách từ MealPlanService, logic giữ nguyên.
 */
@Injectable()
export class MealPlanProfileService {
  constructor(
    @InjectRepository(MealPlanProfile)
    private readonly mealPlanProfileRepo: Repository<MealPlanProfile>,

    @InjectRepository(ProfileAllergy)
    private readonly profileAllergyRepo: Repository<ProfileAllergy>,
  ) {}

  // =========================================================
  // DỊ ỨNG CỦA HỒ SƠ NGƯỜI THÂN
  // =========================================================

  private async findOwnedProfile(user_id: number, profile_id: number) {
    const profile = await this.mealPlanProfileRepo.findOne({
      where: { profile_id, user_id },
    });

    if (!profile) {
      throw new NotFoundException(
        'Không tìm thấy hồ sơ người thân hoặc bạn không có quyền sử dụng hồ sơ này',
      );
    }

    return profile;
  }

  async getProfileAllergies(user_id: number, profile_id: number) {
    await this.findOwnedProfile(user_id, profile_id);

    const rows = await this.profileAllergyRepo.find({
      where: { profile_id },
      relations: ['ingredient'],
    });

    return rows.map((row) => ({
      ingredient_id: row.ingredient_id,
      ingredient_name: row.ingredient?.ingredient_name,
    }));
  }

  // Thay toàn bộ danh sách dị ứng của hồ sơ bằng danh sách mới.
  async setProfileAllergies(
    user_id: number,
    profile_id: number,
    ingredientIds: number[],
  ) {
    await this.findOwnedProfile(user_id, profile_id);

    const ids = [...new Set(ingredientIds)];

    if (ids.length > 0) {
      const validCount = await this.profileAllergyRepo.manager
        .getRepository(Ingredient)
        .count({ where: { ingredient_id: In(ids) } });

      if (validCount !== ids.length) {
        throw new BadRequestException('Có ingredient_id không tồn tại');
      }
    }

    await this.profileAllergyRepo.manager.transaction(async (manager) => {
      await manager.delete(ProfileAllergy, { profile_id });

      if (ids.length > 0) {
        await manager.insert(
          ProfileAllergy,
          ids.map((ingredient_id) => ({ profile_id, ingredient_id })),
        );
      }
    });

    return this.getProfileAllergies(user_id, profile_id);
  }
}
