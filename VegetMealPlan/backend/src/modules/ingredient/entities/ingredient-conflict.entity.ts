import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';

// Composite PK (ingredient_id_1, ingredient_id_2).
// QUY ƯỚC BẮT BUỘC ở tầng service: luôn insert với ingredient_id_1 < ingredient_id_2
// để (A,B) và (B,A) không tạo thành 2 dòng khác nhau — DB không tự enforce được điều này.
@Entity('ingredient_conflicts')
export class IngredientConflict {
  @PrimaryColumn()
  ingredient_id_1: number;

  @PrimaryColumn()
  ingredient_id_2: number;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id_1' })
  ingredient_1: Ingredient;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id_2' })
  ingredient_2: Ingredient;

  @Column({ nullable: true })
  reason: string;
}
