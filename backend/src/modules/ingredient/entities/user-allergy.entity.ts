import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ingredient } from './ingredient.entity';

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
