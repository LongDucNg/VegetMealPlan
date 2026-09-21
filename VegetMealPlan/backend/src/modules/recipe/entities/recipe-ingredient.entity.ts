import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

@Entity('recipe_ingredients')
export class RecipeIngredient {
  @PrimaryColumn()
  recipe_id: number;

  @PrimaryColumn()
  ingredient_id: number;

  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column('float')
  quantity: number;

  @Column()
  unit: string;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  is_optional: boolean;
}
