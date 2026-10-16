import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from '../session.service';
import { ErrorCode } from '../../../common/constants/error-codes.enum';

export interface JwtPayload {
  sub: number; // user_id
  email: string;
  role: string;
  sid: string; // session_id trong bảng user_sessions
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly sessionService: SessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Chữ ký đúng chưa đủ: tra phiên trong DB để logout, khoá tài khoản và đổi role có hiệu lực ngay.
  // Giá trị trả về được gắn vào req.user.
  async validate(payload: JwtPayload) {
    if (!payload.sid) {
      // Token phát hành trước khi có bảng user_sessions: bắt đăng nhập lại.
      throw new UnauthorizedException({
        code: ErrorCode.AUTH_UNAUTHORIZED,
        message: 'Phiên đăng nhập đã kết thúc, vui lòng đăng nhập lại',
      });
    }
    const user = await this.sessionService.validateSession(payload.sid);
    return { user_id: user.user_id, email: user.email, role: user.role, sid: payload.sid };
  }
}
