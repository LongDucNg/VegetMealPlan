import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MealPlanProfile } from './meal-plan-profile.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

/** Dị ứng riêng của từng hồ sơ người thân (khác với user_allergies của chủ tài khoản). */
/**
 * Dị ứng của một hồ sơ NGƯỜI THÂN (meal_plan_profiles) khi tạo thực đơn cho người khác.
 * Khác với user_allergies (dị ứng của chính chủ tài khoản, ingredient/entities/user-allergy.entity.ts).
 */
@Entity('profile_allergies')
export class ProfileAllergy {
  @PrimaryColumn()
  profile_id: number;

  @PrimaryColumn()
  ingredient_id: number;

  @ManyToOne(() => MealPlanProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile: MealPlanProfile;

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
