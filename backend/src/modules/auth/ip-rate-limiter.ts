import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorCode } from '../../common/constants/error-codes.enum';

/**
 * Giới hạn số lần gọi theo IP, lưu trong bộ nhớ (đủ cho một server; chạy nhiều server thì chuyển sang Redis).
 * Dùng cho /auth/forgot-password: cooldown 60 giây chỉ tính theo email, nên nếu không chặn theo IP
 * thì một máy có thể spam OTP tới hàng loạt email khác nhau.
 */
@Injectable()
export class IpRateLimiter {
  private readonly hits = new Map<string, number[]>();

  hit(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      throw new HttpException(
        { code: ErrorCode.AUTH_OTP_RATE_LIMITED, message: 'Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 10_000) this.prune(now, windowMs);
  }

  private prune(now: number, windowMs: number) {
    for (const [key, times] of this.hits) {
      if (times.every((t) => now - t >= windowMs)) this.hits.delete(key);
    }
  }
}
