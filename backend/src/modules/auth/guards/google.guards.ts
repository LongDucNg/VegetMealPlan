import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from '../../../common/constants/error-codes.enum';

/** Chặn route Google khi server chưa có GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (app vẫn chạy bình thường). */
@Injectable()
export class GoogleConfiguredGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(): boolean {
    if (!this.config.get<string>('GOOGLE_CLIENT_ID') || !this.config.get<string>('GOOGLE_CLIENT_SECRET')) {
      throw new ServiceUnavailableException({
        code: ErrorCode.AUTH_GOOGLE_NOT_CONFIGURED,
        message: 'Đăng nhập Google chưa được cấu hình trên server',
      });
    }
    return true;
  }
}

/** GET /auth/google: chuyển trình duyệt sang trang đồng ý của Google. Không dùng session server. */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions() {
    return { session: false, prompt: 'select_account' };
  }
}

/**
 * GET /auth/google/callback: không bao giờ ném lỗi. Khi user bấm "Từ chối", Google trả lỗi,
 * hay profile không hợp lệ thì req.user = null, để controller redirect về trang đăng nhập của FE
 * thay vì hiện JSON lỗi trên trình duyệt.
 */
@Injectable()
export class GoogleAuthCallbackGuard extends AuthGuard('google') {
  getAuthenticateOptions() {
    return { session: false };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);
    } catch {
      context.switchToHttp().getRequest().user = null;
    }
    return true;
  }

  // Chữ ký khớp với AuthGuard của @nestjs/passport (kiểu any là của thư viện).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: any, user: any): any {
    if (err || !user) return null;
    return user;
  }
}
