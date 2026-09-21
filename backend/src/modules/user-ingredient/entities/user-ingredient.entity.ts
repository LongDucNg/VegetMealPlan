import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

export enum IngredientSource {
  MANUAL = 'MANUAL',
  PHOTO_SCAN = 'PHOTO_SCAN',
}

@Entity('user_ingredients')
export class UserIngredient {
  @PrimaryGeneratedColumn()
  user_ingredient_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  ingredient_id: number;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column('float', { nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @Column({ nullable: true })
  freshness_status: string;

  @Column({ type: 'enum', enum: IngredientSource, default: IngredientSource.MANUAL })
  source: IngredientSource;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
