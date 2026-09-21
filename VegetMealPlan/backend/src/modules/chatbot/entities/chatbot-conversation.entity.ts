import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('chatbot_conversations')
export class ChatbotConversation {
  @PrimaryGeneratedColumn()
  conversation_id: number;

  @Column({ nullable: true })
  user_id: number; // null nếu là Unauthorized User (trial)

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  session_id: string;

  @Column('text')
  question: string;

  @Column('text', { nullable: true })
  answer: string;

  @CreateDateColumn()
  created_at: Date;
}
