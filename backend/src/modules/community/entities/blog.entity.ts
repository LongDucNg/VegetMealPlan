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

export enum ContentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REMOVED = 'removed',
}

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  blog_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  category_id: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  title: string;

  @Column('text')
  content: string;

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

  @Column({ nullable: true })
  approved_by: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}