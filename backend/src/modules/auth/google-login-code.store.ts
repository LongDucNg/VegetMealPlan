import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

interface PendingLogin {
  userId: number;
  isNewUser: boolean;
  expiresAt: number;
}

const CODE_TTL_MS = 60_000;

/**
 * Mã dùng một lần để FE đổi lấy access_token sau khi Google redirect về.
 *
 * Vì sao cần: oopsy giao token qua cookie refresh_token, còn VegetMealPlan chỉ có access_token
 * gửi bằng header Bearer và chưa có refresh token. Không muốn để JWT nằm trên URL (lọt vào lịch sử
 * trình duyệt, log server, header Referer), nên callback chỉ gắn một mã ngẫu nhiên sống 60 giây,
 * dùng được đúng một lần; FE gọi POST /auth/google/exchange để lấy token thật.
 *
 * Giới hạn: lưu trong bộ nhớ của tiến trình, nên restart server là mất mã đang chờ, và không dùng được
 * khi chạy nhiều instance. Đủ cho đồ án; muốn mở rộng thì chuyển sang bảng DB hoặc Redis.
 */
@Injectable()
export class GoogleLoginCodeStore {
  private readonly pending = new Map<string, PendingLogin>();

  issue(userId: number, isNewUser: boolean): string {
    this.sweepExpired();
    const code = randomBytes(32).toString('base64url');
    this.pending.set(code, { userId, isNewUser, expiresAt: Date.now() + CODE_TTL_MS });
    return code;
  }

  /** Trả về thông tin đăng nhập và xoá mã ngay, kể cả khi đã hết hạn (dùng một lần). */
  consume(code: string): { userId: number; isNewUser: boolean } | null {
    const entry = this.pending.get(code);
    if (!entry) return null;
    this.pending.delete(code);
    if (entry.expiresAt < Date.now()) return null;
    return { userId: entry.userId, isNewUser: entry.isNewUser };
  }

  private sweepExpired() {
    const now = Date.now();
    for (const [code, entry] of this.pending) {
      if (entry.expiresAt < now) this.pending.delete(code);
    }
  }
}
