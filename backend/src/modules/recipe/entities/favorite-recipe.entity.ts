import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Recipe } from './recipe.entity';

@Entity('favorite_recipes')
export class FavoriteRecipe {
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

  @CreateDateColumn()
  created_at: Date;
}
