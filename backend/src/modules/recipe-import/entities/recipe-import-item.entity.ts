import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecipeImportBatch } from './recipe-import-batch.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';

export enum ImportItemStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum ImportFailReason {
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  UNKNOWN_INGREDIENT = 'UNKNOWN_INGREDIENT',
  INGREDIENT_CONFLICT = 'INGREDIENT_CONFLICT',
}

@Entity('recipe_import_items')
export class RecipeImportItem {
  @PrimaryGeneratedColumn()
  import_item_id: number;

  @Column()
  batch_id: number;

  @ManyToOne(() => RecipeImportBatch, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batch_id' })
  batch: RecipeImportBatch;

  @Column()
  row_number: number;

  @Column()
  recipe_title: string;

  @Column({ type: 'enum', enum: ImportItemStatus })
  status: ImportItemStatus;

  @Column({ type: 'enum', enum: ImportFailReason, nullable: true })
  fail_reason: ImportFailReason;

  @Column({ type: 'text', nullable: true })
  fail_detail: string;

  @Column({ nullable: true })
  recipe_id: number;

  @ManyToOne(() => Recipe, { nullable: true })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
