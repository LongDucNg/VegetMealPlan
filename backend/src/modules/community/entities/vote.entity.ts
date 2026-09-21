import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  vote_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  content_type: string; // 'blog' | 'video'

  @Column()
  content_id: number;

  @Column()
  vote_type: string; // 'up' | 'down'

  @CreateDateColumn()
  created_at: Date;
}
