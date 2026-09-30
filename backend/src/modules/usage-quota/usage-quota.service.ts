import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsageQuota, UsageActionType } from './entities/usage-quota.entity';

function startOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

@Injectable()
export class UsageQuotaService {
  constructor(
    @InjectRepository(UsageQuota)
    private readonly quotaRepo: Repository<UsageQuota>,
  ) {}

  /**
   * Kiem tra + tang usage_count cho 1 actor (user_id XOR session_id).
   * Premium user KHONG duoc goi ham nay - caller phai tu check isPremium truoc
   * (xem ChatbotService) va bo qua hoan toan buoc quota neu premium.
   */
  async checkAndIncrement(params: {
    user_id?: number;
    session_id?: string;
    action_type: UsageActionType;
    limit: number;
  }): Promise<void> {
    const { user_id, session_id, action_type, limit } = params;
    if (!user_id && !session_id) {
      throw new Error('checkAndIncrement can user_id hoac session_id');
    }

    const where = user_id ? { user_id, action_type } : { session_id, action_type };
    let quota = await this.quotaRepo.findOne({ where });

    const currentPeriod = startOfCurrentMonth();
    if (!quota) {
      quota = this.quotaRepo.create({
        user_id,
        session_id,
        action_type,
        usage_count: 0,
        period_start: currentPeriod,
      });
    } else if (quota.period_start.getTime() < currentPeriod.getTime()) {
      // Sang thang moi -> reset quota.
      quota.usage_count = 0;
      quota.period_start = currentPeriod;
    }

    if (quota.usage_count >= limit) {
      throw new ForbiddenException(
        'Ban da dung het luot trong thang nay. Nang cap goi premium de dung khong gioi han.',
      );
    }

    quota.usage_count += 1;
    await this.quotaRepo.save(quota);
  }
}
