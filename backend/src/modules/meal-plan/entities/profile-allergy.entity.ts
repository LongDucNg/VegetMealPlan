import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MealPlanProfile } from './meal-plan-profile.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

/** Dị ứng riêng của từng hồ sơ người thân (khác với user_allergies của chủ tài khoản). */
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
