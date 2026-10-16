import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Recipe } from './recipe.entity';

@Entity('user_recipe_prices')
export class UserRecipePrice {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  recipe_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column('float')
  actual_price: number;

  @UpdateDateColumn()
  updated_at: Date;
}