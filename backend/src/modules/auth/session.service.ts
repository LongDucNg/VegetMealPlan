import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { createHash, randomBytes, randomUUID } from 'crypto';
import { UserSession } from './entities/user-session.entity';
import { User, UserStatus } from '../users/entities/user.entity';
import { ErrorCode } from '../../common/constants/error-codes.enum';

export interface SessionMeta {
  userAgent?: string | null;
  ip?: string | null;
}

const DEFAULT_REFRESH_DAYS = 30;
const REUSE_GRACE_MS = 30_000;

/** Refresh token là chuỗi ngẫu nhiên 48 byte; DB chỉ giữ SHA-256 của nó. */
export const hashRefreshToken = (token: string) => createHash('sha256').update(token).digest('hex');

@Injectable()
export class SessionService {
  private readonly refreshDays: number;

  constructor(
    @InjectRepository(UserSession)
    private readonly sessionRepo: Repository<UserSession>,
    config: ConfigService,
  ) {
    const days = Number(config.get<string>('JWT_REFRESH_EXPIRES_DAYS'));
    this.refreshDays = Number.isFinite(days) && days > 0 ? days : DEFAULT_REFRESH_DAYS;
  }

  /** Đăng nhập (mật khẩu, Google, đăng ký): mở phiên mới cho thiết bị này. */
  async create(user_id: number, meta: SessionMeta = {}): Promise<{ session: UserSession; refreshToken: string }> {
    const refreshToken = this.newToken();
    const session = await this.sessionRepo.save(
      this.sessionRepo.create({
        session_id: randomUUID(),
        user_id,
        refresh_token_hash: hashRefreshToken(refreshToken),
        previous_token_hash: null,
        expires_at: this.expiry(),
        revoked_at: null,
        user_agent: meta.userAgent?.slice(0, 255) ?? null,
        ip: meta.ip?.slice(0, 64) ?? null,
        last_used_at: new Date(),
      }),
    );
    return { session, refreshToken };
  }

  /**
   * POST /auth/refresh: đổi refresh token cũ lấy cặp token mới (xoay vòng).
   * - Không tìm thấy, hết hạn, đã thu hồi, user bị khoá: 401.
   * - Token cũ (đã bị xoay) được gửi lại: coi là bị đánh cắp, thu hồi luôn phiên đó rồi 401.
   */
  async rotate(refreshToken: string): Promise<{ session: UserSession; refreshToken: string }> {
    const hash = hashRefreshToken(refreshToken);
    const session = await this.sessionRepo.findOne({ where: { refresh_token_hash: hash }, relations: ['user'] });

    if (!session) {
      const reused = await this.sessionRepo.findOne({ where: { previous_token_hash: hash, revoked_at: IsNull() } });
      // Cho 30 giây "ân hạn": FE gửi 2 lệnh refresh gần như cùng lúc (2 tab, 2 request hết hạn một lượt)
      // thì lệnh thứ hai chỉ bị từ chối, không thu hồi phiên. Quá 30 giây mới coi là bị đánh cắp.
      const withinGrace = reused?.last_used_at && Date.now() - reused.last_used_at.getTime() < REUSE_GRACE_MS;
      if (reused && !withinGrace) {
        reused.revoked_at = new Date();
        await this.sessionRepo.save(reused);
      }
      throw this.invalidRefresh();
    }

    if (session.revoked_at || session.expires_at.getTime() <= Date.now()) throw this.invalidRefresh();
    if (!session.user) throw this.invalidRefresh();
    if (session.user.status === UserStatus.LOCKED) throw this.locked();

    const nextToken = this.newToken();
    session.previous_token_hash = hash;
    session.refresh_token_hash = hashRefreshToken(nextToken);
    session.expires_at = this.expiry();
    session.last_used_at = new Date();
    await this.sessionRepo.save(session);

    return { session, refreshToken: nextToken };
  }

  /**
   * Gọi ở MỌI request có Bearer token (JwtStrategy). Trả user mới nhất từ DB để role/trạng thái
   * thay đổi có hiệu lực ngay, không phải chờ token hết hạn.
   */
  async validateSession(session_id: string): Promise<User> {
    const session = await this.sessionRepo.findOne({ where: { session_id }, relations: ['user'] });
    if (!session || session.revoked_at || session.expires_at.getTime() <= Date.now() || !session.user) {
      throw new UnauthorizedException({
        code: ErrorCode.AUTH_UNAUTHORIZED,
        message: 'Phiên đăng nhập đã kết thúc, vui lòng đăng nhập lại',
      });
    }
    if (session.user.status === UserStatus.LOCKED) throw this.locked();
    return session.user;
  }

  /** Đăng xuất thiết bị hiện tại. Gọi lại nhiều lần không lỗi. */
  async revoke(session_id: string, user_id: number): Promise<void> {
    await this.sessionRepo.update({ session_id, user_id, revoked_at: IsNull() }, { revoked_at: new Date() });
  }

  /** Đăng xuất mọi thiết bị (lộ tài khoản, đổi mật khẩu, admin khoá). Trả về số phiên vừa thu hồi. */
  async revokeAll(user_id: number): Promise<number> {
    const result = await this.sessionRepo.update({ user_id, revoked_at: IsNull() }, { revoked_at: new Date() });
    return result.affected ?? 0;
  }

  /** Đổi mật khẩu: đăng xuất mọi thiết bị khác, giữ lại phiên đang thao tác. */
  async revokeOthers(user_id: number, keep_session_id: string): Promise<number> {
    const result = await this.sessionRepo
      .createQueryBuilder()
      .update(UserSession)
      .set({ revoked_at: () => 'now()' })
      .where('user_id = :user_id AND revoked_at IS NULL AND session_id <> :keep', { user_id, keep: keep_session_id })
      .execute();
    return result.affected ?? 0;
  }

  private newToken() {
    return randomBytes(48).toString('base64url');
  }

  private expiry() {
    return new Date(Date.now() + this.refreshDays * 24 * 60 * 60 * 1000);
  }

  private invalidRefresh() {
    return new UnauthorizedException({
      code: ErrorCode.AUTH_REFRESH_TOKEN_INVALID,
      message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại',
    });
  }

  private locked() {
    return new UnauthorizedException({ code: ErrorCode.AUTH_ACCOUNT_LOCKED, message: 'Tài khoản đã bị khóa' });
  }
}
