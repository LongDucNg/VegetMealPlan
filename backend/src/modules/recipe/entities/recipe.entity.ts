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
import { DietType } from '../../users/entities/user.entity';

export enum RecipeStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REMOVED = 'removed',
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  recipe_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('text')
  instructions: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  prep_time: number; // phút

  @Column({ nullable: true })
  cook_time: number; // phút

  @Column({ nullable: true })
  servings: number;

  @Column({ type: 'enum', enum: Difficulty, nullable: true })
  difficulty: Difficulty;

  @Column({ nullable: true })
  meal_type: string; // breakfast / lunch / dinner / any

  @Column({ type: 'enum', enum: DietType, nullable: true })
  diet_type: DietType;

  @Column({ nullable: true })
  source_video_id: number;

  @Column('float', { nullable: true })
  estimated_cost: number; // cached, derived từ RecipeIngredient

  @Column({ nullable: true })
  created_by: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ type: 'enum', enum: RecipeStatus, default: RecipeStatus.DRAFT })
  status: RecipeStatus;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date;

  @Column({ nullable: true })
  approved_by: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
