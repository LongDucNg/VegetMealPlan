import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ingredient } from './ingredient.entity';

/**
 * Dị ứng của CHÍNH người dùng (hồ sơ tài khoản): API /users/me/allergies.
 * Khác với profile_allergies (dị ứng của từng hồ sơ người thân khi tạo thực đơn cho người khác,
 * xem meal-plan/entities/profile-allergy.entity.ts). Hai bảng phục vụ hai việc, không gộp.
 */
@Entity('user_allergies')
export class UserAllergy {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  ingredient_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
