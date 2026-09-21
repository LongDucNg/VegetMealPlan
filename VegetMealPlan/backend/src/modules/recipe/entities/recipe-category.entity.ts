import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Category } from '../../category/entities/category.entity';

// Bảng trung gian M:N — 1 Recipe có thể thuộc nhiều Category và ngược lại.
@Entity('recipe_categories')
export class RecipeCategory {
  @PrimaryColumn()
  recipe_id: number;

  @PrimaryColumn()
  category_id: number;

  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
