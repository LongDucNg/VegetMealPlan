import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity('nutrition_infos')
export class NutritionInfo {
  @PrimaryGeneratedColumn()
  nutrition_id: number;

  @Column({ unique: true })
  recipe_id: number;

  @OneToOne(() => Recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column('float', { nullable: true })
  calories: number;

  @Column('float', { nullable: true })
  protein: number;

  @Column('float', { nullable: true })
  carbs: number;

  @Column('float', { nullable: true })
  fat: number;

  @Column('float', { nullable: true })
  fiber: number;

  @UpdateDateColumn()
  updated_at: Date;
}
