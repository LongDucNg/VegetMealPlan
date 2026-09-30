import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum PaymentGateway {
  VNPAY = 'VNPAY',
}

export enum PaymentTransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

/**
 * Ghi lai MOI lan thu thanh toan (pending/success/failed), khong chi lan thanh cong.
 * Chi khi status = success thi service moi tao 1 dong Subscription tuong ung.
 */
@Entity('payment_transactions')
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('float')
  amount: number;

  @Column({ type: 'enum', enum: PaymentGateway, default: PaymentGateway.VNPAY })
  gateway: PaymentGateway;

  // Ma don hang phia minh sinh ra, gui cho VNPay (vnp_TxnRef).
  @Column()
  gateway_txn_ref: string;

  // Ma giao dich VNPay tra ve sau khi thanh toan (vnp_TransactionNo).
  @Column({ nullable: true })
  gateway_transaction_no: string;

  @Column({ type: 'enum', enum: PaymentTransactionStatus, default: PaymentTransactionStatus.PENDING })
  status: PaymentTransactionStatus;

  // Luu response goc tu VNPay (IPN callback) de doi soat khi co tranh chap.
  @Column({ type: 'text', nullable: true })
  raw_response: string;

  @Column({ type: 'timestamp', nullable: true })
  paid_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
