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
import { Category } from '../../category/entities/category.entity';
import { ContentStatus } from './blog.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  video_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  category_id: number | null;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail_url: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column()
  video_url: string;

  @Column({ type: 'varchar', nullable: true })
  duration: string | null;

  @Column('text', { nullable: true })
  transcript_summary: string | null;

  @Column({ type: 'varchar', nullable: true })
  cuisine: string | null;

  @Column({ type: 'varchar', nullable: true })
  difficulty: string | null;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  ingredients: Array<{ name: string; amount: string }>;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  steps: string[];

  @Column({ type: 'int', nullable: true })
  kcal: number | null;

  @Column({ type: 'int', nullable: true, default: 1 })
  servings: number;

  @Column('text', { array: true, default: () => "'{}'" })
  tags: string[];

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  @Column({ type: 'boolean', default: false })
  is_flagged: boolean;

  @Column({ type: 'text', nullable: true })
  flag_reason: string | null;

  @Column({ type: 'text', nullable: true })
  reject_reason: string | null;

  @Column({ type: 'int', nullable: true })
  reviewed_by: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'reviewed_by' })
  reviewer: User;

  @Column({ type: 'timestamp', nullable: true })
  reviewed_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date | null;

  @Column({ type: 'int', nullable: true })
  approved_by: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}