import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum IngredientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  ingredient_id: number;

  @Column()
  ingredient_name: string;

  @Column()
  unit: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  vegan_flag: boolean;

  @Column('float', { nullable: true })
  avg_price_per_unit: number;

  @Column('float', { nullable: true })
  calories_per_100g: number;

  @Column('float', { nullable: true })
  protein_per_100g: number;

  @Column('float', { nullable: true })
  carb_per_100g: number;

  @Column('float', { nullable: true })
  fat_per_100g: number;

  @Column('float', { nullable: true })
  fiber_per_100g: number;

  @Column({ default: false })
  is_seasonal: boolean;

  @Column({ nullable: true })
  season_months: string;

  @Column({ type: 'enum', enum: IngredientStatus, default: IngredientStatus.ACTIVE })
  status: IngredientStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
