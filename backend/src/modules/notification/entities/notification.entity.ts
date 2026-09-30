import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificationType {
  SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS',
  SUBSCRIPTION_EXPIRING = 'SUBSCRIPTION_EXPIRING',
  SUBSCRIPTION_EXPIRED = 'SUBSCRIPTION_EXPIRED',
  SUBSCRIPTION_CANCELLED = 'SUBSCRIPTION_CANCELLED',
  CONTENT_COMMENT = 'CONTENT_COMMENT',
  CONTENT_VOTE = 'CONTENT_VOTE',
}

/**
 * ref_type/ref_id dung chung pattern voi content_type/content_id o Comment/Vote:
 * VD ref_type='subscription', ref_id=<subscription_id>, hoac ref_type='blog', ref_id=<blog_id>.
 */
@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  ref_type: string;

  @Column({ nullable: true })
  ref_id: number;

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn()
  created_at: Date;
}
