import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

/** Phần profile Google mà hệ thống cần, rút gọn từ dữ liệu Google trả về. */
export interface GoogleProfile {
  googleId: string;
  email: string;
  fullName: string;
}

// Giá trị giả khi chưa cấu hình: Strategy bắt buộc có clientID/clientSecret lúc khởi tạo,
// thiếu thì Nest crash ngay khi start. GoogleConfiguredGuard chặn route trước khi dùng tới chúng.
export const GOOGLE_NOT_CONFIGURED = 'not-configured';

/**
 * Luồng OAuth2 redirect phía server (giống oopsy): backend chuyển trình duyệt sang Google,
 * Google gọi lại GOOGLE_CALLBACK_URL kèm mã, passport đổi mã lấy profile rồi gọi validate().
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID') || GOOGLE_NOT_CONFIGURED,
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET') || GOOGLE_NOT_CONFIGURED,
      callbackURL:
        config.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  // Trả null thay vì ném lỗi: GoogleAuthCallbackGuard coi null là "đăng nhập thất bại"
  // để controller luôn kết thúc bằng redirect về FE, không trả JSON giữa luồng trình duyệt.
  validate(_accessToken: string, _refreshToken: string, profile: Profile): GoogleProfile | null {
    const email = profile.emails?.[0]?.value;
    if (!email) return null;

    // Chỉ tin email Google đã xác minh, vì email này dùng để gắn vào tài khoản có sẵn.
    if (profile._json?.email_verified === false) return null;

    const normalized = email.trim().toLowerCase();
    return {
      googleId: profile.id,
      email: normalized,
      fullName: profile.displayName?.trim() || normalized.split('@')[0],
    };
  }
}
