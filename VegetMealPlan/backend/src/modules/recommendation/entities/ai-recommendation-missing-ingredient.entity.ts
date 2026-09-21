import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AiRecommendation } from './ai-recommendation.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

// Bảng con: 1 recommendation có thể thiếu NHIỀU ingredient — không lưu
// missing_ingredients thành 1 field CSV string (vi phạm 1NF).
@Entity('ai_recommendation_missing_ingredients')
export class AiRecommendationMissingIngredient {
  @PrimaryColumn()
  recommendation_id: number;

  @PrimaryColumn()
  ingredient_id: number;

  @ManyToOne(() => AiRecommendation, (r) => r.missing_ingredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recommendation_id' })
  recommendation: AiRecommendation;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column('float', { nullable: true })
  quantity_needed: number;

  @Column({ nullable: true })
  unit: string;
}
