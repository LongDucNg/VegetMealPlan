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

@Entity('votes')
@Index('UQ_votes_user_content', ['user_id', 'content_type', 'content_id'], { unique: true })
export class Vote {
  @PrimaryGeneratedColumn()
  vote_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  content_type: string; // 'blog' | 'video' | 'comment'

  @Column()
  content_id: number;

  @Column()
  vote_type: string; // 'up' | 'down'

  @CreateDateColumn()
  created_at: Date;
}