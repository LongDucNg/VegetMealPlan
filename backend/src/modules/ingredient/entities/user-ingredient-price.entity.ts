import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ingredient } from './ingredient.entity';

/**
 * Gia rieng cua 1 user cho 1 ingredient - override avg_price_per_unit (gia trung binh
 * he thong) cho DUY NHAT user nay. User khac van dung avg_price_per_unit mac dinh.
 * Ly do: moi user co the o khu vuc khac nhau nen gia thuc te khac nhau.
 */
@Entity('user_ingredient_prices')
export class UserIngredientPrice {
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

  @Column('float')
  price_per_unit: number;

  @UpdateDateColumn()
  updated_at: Date;
}
