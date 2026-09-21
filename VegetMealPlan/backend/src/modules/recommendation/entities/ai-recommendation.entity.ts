import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';
import { AiRecommendationMissingIngredient } from './ai-recommendation-missing-ingredient.entity';

@Entity('ai_recommendations')
export class AiRecommendation {
  @PrimaryGeneratedColumn()
  recommendation_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  recipe_id: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column('float', { nullable: true })
  match_score: number;

  @Column('float', { nullable: true })
  match_percentage: number;

  @Column({ nullable: true })
  reason: string;

  @OneToMany(() => AiRecommendationMissingIngredient, (m) => m.recommendation)
  missing_ingredients: AiRecommendationMissingIngredient[];

  @CreateDateColumn()
  created_at: Date;
}
