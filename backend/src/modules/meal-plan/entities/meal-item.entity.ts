import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DailyMeal } from './daily-meal.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity('meal_items')
export class MealItem {
  @PrimaryGeneratedColumn()
  meal_item_id: number;

  @Column()
  daily_meal_id: number;

  @ManyToOne(() => DailyMeal, (d) => d.meal_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'daily_meal_id' })
  daily_meal: DailyMeal;

  @Column()
  recipe_id: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column({ default: false })
  is_ai_suggested: boolean;

  @Column({ default: false })
  added_by_user: boolean;

  @Column('float', { default: 1 })
  portion_multiplier: number;
}
