import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PaymentTransaction } from './payment-transaction.entity';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

/**
 * 1 ky goi premium da THANH TOAN THANH CONG (khong tao truoc khi payment success).
 * Hien tai chi co 1 loai goi ("monthly") - xem SubscriptionService.
 */
@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unique: true })
  transaction_id: number;

  @OneToOne(() => PaymentTransaction)
  @JoinColumn({ name: 'transaction_id' })
  transaction: PaymentTransaction;

  @Column({ default: 'monthly' })
  plan_type: string;

  // Gia da tra, luu lai phong khi gia thay doi sau nay.
  @Column('float')
  amount: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

  @Column({ type: 'timestamp', nullable: true })
  cancelled_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
