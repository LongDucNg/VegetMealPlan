import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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

  @Column({ nullable: true })
  category_id: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  title: string;

  @Column()
  video_url: string;

  @Column('text', { nullable: true })
  transcript_summary: string;

  @Column({ type: 'enum', enum: ContentStatus, default: ContentStatus.DRAFT })
  status: ContentStatus;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date;

  @Column({ nullable: true })
  approved_by: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @CreateDateColumn()
  created_at: Date;
}
