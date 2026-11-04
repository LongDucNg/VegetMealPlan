import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UsageQuota, UsageActionType } from './entities/usage-quota.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';

/**
 * Tính thời điểm bắt đầu ngày hiện tại theo múi giờ Việt Nam (UTC+7, 00:00).
 * Đặt lại lúc 00:00 giờ Việt Nam.
 */
export function startOfCurrentDayVN(): Date {
  // TODO: Chu kỳ tính lượt mặc định theo ngày (00:00 giờ Việt Nam), có thể cấu hình lại nếu thay đổi nghiệp vụ.
  const now = new Date();
  const vnTime = new Date(now.getTime() + 7 * 3600 * 1000);
  const year = vnTime.getUTCFullYear();
  const month = vnTime.getUTCMonth();
  const date = vnTime.getUTCDate();
  return new Date(Date.UTC(year, month, date) - 7 * 3600 * 1000);
}

@Injectable()
export class UsageQuotaService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Khoá advisory theo (actor, action) trong giao dịch hiện tại rồi đọc dòng hạn mức.
   * reserveQuota và refundQuota dùng chung để 2 request đồng thời không cùng đọc một số lượt.
   */
  private async lockAndFind(
    manager: EntityManager,
    actor: { user_id?: number; session_id?: string },
    action_type: UsageActionType,
  ): Promise<UsageQuota | null> {
    const actorKey = actor.user_id ? `u_${actor.user_id}` : `s_${actor.session_id}`;
    await manager.query(`SELECT pg_advisory_xact_lock(hashtext($1))`, [`quota_${actorKey}_${action_type}`]);
    const where = actor.user_id
      ? { user_id: actor.user_id, action_type }
      : { session_id: actor.session_id, action_type };
    return manager.findOne(UsageQuota, { where });
  }

  /**
   * Giữ chỗ lượt nguyên tử cho 1 actor (user_id XOR session_id).
   * Dùng khoá PostgreSQL advisory lock theo (actor, action) để đảm bảo 2 request gửi đồng thời
   * ở lượt cuối chỉ có 1 request thành công, chống race condition.
   * Thất bại ném 429 CHATBOT_QUOTA_EXCEEDED.
   */
  async reserveQuota(params: {
    user_id?: number;
    session_id?: string;
    action_type: UsageActionType;
    limit: number;
  }): Promise<{ remaining: number; usage_count: number }> {
    const { user_id, session_id, action_type, limit } = params;
    if (!user_id && !session_id) {
      throw new Error('reserveQuota cần user_id hoặc session_id');
    }

    const currentPeriod = startOfCurrentDayVN();

    return await this.dataSource.transaction(async (manager) => {
      let quota = await this.lockAndFind(manager, { user_id, session_id }, action_type);

      if (!quota) {
        quota = manager.create(UsageQuota, {
          user_id,
          session_id,
          action_type,
          usage_count: 0,
          period_start: currentPeriod,
        });
      } else if (quota.period_start.getTime() < currentPeriod.getTime()) {
        // Đã qua ngày mới (sau 00:00 VN) -> reset số lượt
        quota.usage_count = 0;
        quota.period_start = currentPeriod;
      }

      if (quota.usage_count >= limit) {
        if (action_type === UsageActionType.PHOTO_SCAN) {
          throw new HttpException(
            {
              code: ErrorCode.PHOTO_SCAN_QUOTA_EXCEEDED,
              message: `Bạn đã dùng hết hạn mức ${limit} lượt quét ảnh nguyên liệu trong ngày. Vui lòng quay lại vào ngày mai (sau 00:00).`,
            },
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }

        const message = user_id
          ? `Bạn đã dùng hết ${limit} lượt trò chuyện miễn phí hôm nay. Vui lòng nâng cấp gói Premium để trò chuyện không giới hạn, hoặc quay lại vào ngày mai (sau 00:00).`
          : `Bạn đã dùng hết ${limit} lượt dùng thử cho khách trong ngày. Vui lòng đăng ký hoặc đăng nhập để tiếp tục sử dụng.`;

        throw new HttpException(
          {
            code: ErrorCode.CHATBOT_QUOTA_EXCEEDED,
            message,
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      quota.usage_count += 1;
      await manager.save(UsageQuota, quota);

      return {
        remaining: Math.max(0, limit - quota.usage_count),
        usage_count: quota.usage_count,
      };
    });
  }

  /**
   * Hoàn lại lượt (giảm 1) nếu lần gọi AI gặp sự cố kỹ thuật hoặc vi phạm an toàn,
   * để lỗi hệ thống không làm người dùng mất lượt.
   */
  async refundQuota(params: {
    user_id?: number;
    session_id?: string;
    action_type: UsageActionType;
  }): Promise<void> {
    const { user_id, session_id, action_type } = params;
    if (!user_id && !session_id) return;

    await this.dataSource.transaction(async (manager) => {
      const quota = await this.lockAndFind(manager, { user_id, session_id }, action_type);
      if (quota && quota.usage_count > 0) {
        quota.usage_count -= 1;
        await manager.save(UsageQuota, quota);
      }
    });
  }
}
