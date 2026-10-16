import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('comments')
@Index('IDX_comments_content', ['content_type', 'content_id'])
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  content_type: string; // 'blog' | 'video' — polymorphic, KHÔNG có FK constraint thật ở DB

  @Column()
  content_id: number;

  @Column('text')
  comment_text: string;

  @Column({ nullable: true })
  moderation_status: string;

  @CreateDateColumn()
  created_at: Date;
}