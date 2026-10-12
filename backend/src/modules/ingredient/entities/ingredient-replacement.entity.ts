import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ingredient } from './ingredient.entity';

@Entity('ingredient_replacements')
export class IngredientReplacement {
  @PrimaryGeneratedColumn()
  replacement_id: number;

  @Column()
  original_ingredient_id: number;

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'original_ingredient_id' })
  original_ingredient: Ingredient;

  @Column()
  replacement_ingredient_id: number;

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'replacement_ingredient_id' })
  replacement_ingredient: Ingredient;

  @Column({ type: 'varchar', length: 500 })
  ratio: string;

  @Column({ type: 'varchar', length: 500 })
  reason: string;

  @Column({ type: 'varchar', length: 500 })
  applicable_when: string;

  @Column({ type: 'varchar', length: 500 })
  note: string;

  @CreateDateColumn()
  created_at: Date;
}