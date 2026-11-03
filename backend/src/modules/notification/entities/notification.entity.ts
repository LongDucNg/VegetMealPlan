import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificationType {
  SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS',
  SUBSCRIPTION_EXPIRING = 'SUBSCRIPTION_EXPIRING',
  SUBSCRIPTION_EXPIRED = 'SUBSCRIPTION_EXPIRED',
  SUBSCRIPTION_CANCELLED = 'SUBSCRIPTION_CANCELLED',
  CONTENT_COMMENT = 'CONTENT_COMMENT',
  CONTENT_VOTE = 'CONTENT_VOTE',
  RECIPE_SUBMITTED = 'RECIPE_SUBMITTED',
  RECIPE_APPROVED = 'RECIPE_APPROVED',
  RECIPE_REJECTED = 'RECIPE_REJECTED',
  FORUM_POST_SUBMITTED = 'FORUM_POST_SUBMITTED',
  FORUM_POST_APPROVED = 'FORUM_POST_APPROVED',
  FORUM_POST_REJECTED = 'FORUM_POST_REJECTED',
  SYSTEM_WELCOME = 'SYSTEM_WELCOME',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
}

/**
 * ref_type/ref_id dùng chung pattern với content_type/content_id ở Comment/Vote:
 * VD ref_type='subscription', ref_id=<subscription_id>, hoặc ref_type='recipe', ref_id=<recipe_id>.
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

  @Column({ type: 'varchar', default: NotificationType.SYSTEM_WELCOME })
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
