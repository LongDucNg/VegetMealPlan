import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Subscription, SubscriptionStatus } from './entities/subscription.entity';
import {
  PaymentTransaction,
  PaymentTransactionStatus,
} from './entities/payment-transaction.entity';
import { User } from '../users/entities/user.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/entities/notification.entity';

const MONTHLY_PLAN_PRICE = Number(process.env.MONTHLY_PLAN_PRICE) || 99000;
const PLAN_DURATION_DAYS = 30;
const EXPIRING_SOON_DAYS = 3;

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(PaymentTransaction)
    private readonly transactionRepo: Repository<PaymentTransaction>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  /** User dang co goi premium con hieu luc khong (dung o guard/quota check). */
  async isPremium(user_id: number): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { user_id } });
    if (!user || !user.premium_until) return false;
    return user.premium_until.getTime() > Date.now();
  }

  /**
   * Buoc 1 cua flow VNPay: tao 1 giao dich pending, tra ve gateway_txn_ref
   * de controller dung xay dung URL redirect sang VNPay.
   * TODO: build URL VNPay that (vnp_TmnCode/vnp_HashSecret lay tu .env,
   * ky HMAC theo tai lieu VNPay) - chua co merchant that nen chi stub o day.
   */
  async createPendingTransaction(user_id: number): Promise<PaymentTransaction> {
    const gateway_txn_ref = `VMP-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const transaction = this.transactionRepo.create({
      user_id,
      amount: MONTHLY_PLAN_PRICE,
      gateway_txn_ref,
      status: PaymentTransactionStatus.PENDING,
    });
    return this.transactionRepo.save(transaction);
  }

  /**
   * Xu ly IPN callback tu VNPay bao thanh toan thanh cong.
   * TODO: verify chu ky (vnp_SecureHash) truoc khi tin raw_response - bat buoc
   * voi payment that, chua lam o day vi chua co vnp_HashSecret that.
   */
  async confirmPaymentSuccess(
    gateway_txn_ref: string,
    gateway_transaction_no: string,
    raw_response: string,
  ): Promise<Subscription> {
    const transaction = await this.transactionRepo.findOne({ where: { gateway_txn_ref } });
    if (!transaction) throw new NotFoundException('Khong tim thay giao dich');
    if (transaction.status === PaymentTransactionStatus.SUCCESS) {
      // Da xu ly roi (VNPay co the goi IPN lap) -> tra ve subscription cu, khong tao trung.
      const existing = await this.subscriptionRepo.findOne({
        where: { transaction_id: transaction.transaction_id },
      });
      if (existing) return existing;
    }

    transaction.status = PaymentTransactionStatus.SUCCESS;
    transaction.gateway_transaction_no = gateway_transaction_no;
    transaction.raw_response = raw_response;
    transaction.paid_at = new Date();
    await this.transactionRepo.save(transaction);

    const start_date = new Date();
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + PLAN_DURATION_DAYS);

    const subscription = this.subscriptionRepo.create({
      user_id: transaction.user_id,
      transaction_id: transaction.transaction_id,
      plan_type: 'monthly',
      amount: transaction.amount,
      start_date,
      end_date,
      status: SubscriptionStatus.ACTIVE,
    });
    const saved = await this.subscriptionRepo.save(subscription);

    await this.userRepo.update({ user_id: transaction.user_id }, { premium_until: end_date });

    await this.notificationService.create({
      user_id: transaction.user_id,
      type: NotificationType.SUBSCRIPTION_SUCCESS,
      title: 'Dang ky goi thang thanh cong',
      message: `Ban da kich hoat goi premium den het ngay ${end_date.toLocaleDateString('vi-VN')}.`,
      ref_type: 'subscription',
      ref_id: saved.subscription_id,
    });

    return saved;
  }

  async confirmPaymentFailed(gateway_txn_ref: string, raw_response: string): Promise<void> {
    await this.transactionRepo.update(
      { gateway_txn_ref },
      { status: PaymentTransactionStatus.FAILED, raw_response },
    );
  }

  /**
   * Huy goi - KHONG hoan tien tu dong (ngoai scope do an), chi danh dau cancelled.
   * User van dung premium den het end_date da tra tien (vi la goi 1 lan, khong auto-renew).
   */
  async cancel(user_id: number, subscription_id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepo.findOne({
      where: { subscription_id, user_id },
    });
    if (!subscription) throw new NotFoundException('Khong tim thay goi dang ky');
    if (subscription.status !== SubscriptionStatus.ACTIVE) {
      throw new BadRequestException('Goi nay khong o trang thai active');
    }
    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.cancelled_at = new Date();
    const saved = await this.subscriptionRepo.save(subscription);

    await this.notificationService.create({
      user_id,
      type: NotificationType.SUBSCRIPTION_CANCELLED,
      title: 'Da huy goi thang',
      message: 'Ban van dung duoc premium den het han da tra tien.',
      ref_type: 'subscription',
      ref_id: subscription.subscription_id,
    });

    return saved;
  }

  /**
   * Chay dinh ky (cron - TODO wiring @nestjs/schedule o main.ts):
   * bao truoc EXPIRING_SOON_DAYS ngay, khong lap lai neu da bao roi.
   */
  async notifyExpiringSoon(): Promise<void> {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() + EXPIRING_SOON_DAYS);

    const expiringSoon = await this.subscriptionRepo
      .createQueryBuilder('s')
      .where('s.status = :status', { status: SubscriptionStatus.ACTIVE })
      .andWhere('s.end_date <= :threshold', { threshold })
      .getMany();

    for (const sub of expiringSoon) {
      const alreadyNotified = await this.notificationService.existsFor(
        'subscription',
        sub.subscription_id,
        NotificationType.SUBSCRIPTION_EXPIRING,
      );
      if (alreadyNotified) continue;

      await this.notificationService.create({
        user_id: sub.user_id,
        type: NotificationType.SUBSCRIPTION_EXPIRING,
        title: 'Goi premium sap het han',
        message: `Goi cua ban het han ngay ${sub.end_date.toLocaleDateString('vi-VN')}. He thong KHONG tu dong gia han.`,
        ref_type: 'subscription',
        ref_id: sub.subscription_id,
      });
    }
  }

  /** Chay dinh ky: chuyen subscription qua han thanh 'expired' + bao cho user. */
  async expireOverdueSubscriptions(): Promise<void> {
    const now = new Date();
    const overdue = await this.subscriptionRepo
      .createQueryBuilder('s')
      .where('s.status = :status', { status: SubscriptionStatus.ACTIVE })
      .andWhere('s.end_date < :now', { now })
      .getMany();

    for (const sub of overdue) {
      sub.status = SubscriptionStatus.EXPIRED;
      await this.subscriptionRepo.save(sub);

      await this.notificationService.create({
        user_id: sub.user_id,
        type: NotificationType.SUBSCRIPTION_EXPIRED,
        title: 'Goi premium da het han',
        message: 'Ban van xem duoc du lieu cu, nhung khong tao moi duoc nua. Gia han de tiep tuc dung premium.',
        ref_type: 'subscription',
        ref_id: sub.subscription_id,
      });
    }
  }
}
