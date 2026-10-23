import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User, DietType } from '../../users/entities/user.entity';

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
  meal_type: string; // breakfast / lunch / snack / any - phân loại bữa chính

  // Danh sách bữa ăn phù hợp, cách nhau dấu phẩy (vd. "lunch,dinner").
  // Không có giá trị thì lọc/generate thực đơn dùng meal_type.
  @Column({ type: 'varchar', length: 100, nullable: true })
  suitable_meals: string;

  @Column({ type: 'enum', enum: DietType, nullable: true })
  diet_type: DietType;

  @Column({ nullable: true })
  source_video_id: number;

  // Cột nullable: null = chưa tính được tổng giá (thiếu giá nguyên liệu hoặc
  // có nguyên liệu tính theo đơn vị đếm chưa quy đổi được sang gram).
  @Column('float', { nullable: true })
  estimated_cost: number | null;

  @Column({ nullable: true })
  created_by: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ type: 'enum', enum: RecipeStatus, default: RecipeStatus.DRAFT })
  status: RecipeStatus;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date | null;

  @Column({ nullable: true })
  approved_by: number | null;

  @Column({ type: 'text', nullable: true })
  review_reason: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}