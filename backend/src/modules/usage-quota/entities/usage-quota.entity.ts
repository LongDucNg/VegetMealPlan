import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

export enum UsageActionType {
  CHATBOT_QUERY = 'CHATBOT_QUERY',
  MEAL_PLAN_CREATE = 'MEAL_PLAN_CREATE',
}

/**
 * Thay the TrialUsage cu. Actor la user_id (da dang nhap) HOAC session_id (guest),
 * khong bao gio ca hai. Premium bypass hoan toan - khong tao row o day cho premium user
 * (xem UsageQuotaService.checkAndIncrement, goi truoc boi service dung SubscriptionService.isPremium).
 */
@Entity('usage_quotas')
export class UsageQuota {
  @PrimaryGeneratedColumn()
  usage_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  session_id: string;

  @Column({ type: 'enum', enum: UsageActionType })
  action_type: UsageActionType;

  @Column({ default: 0 })
  usage_count: number;

  // Dau ky tinh quota (dau thang duong lich) - qua thang moi thi reset ve 0.
  @Column({ type: 'timestamp' })
  period_start: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
