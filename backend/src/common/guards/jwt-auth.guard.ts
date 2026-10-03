import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ErrorCode } from '../constants/error-codes.enum';

/**
 * Guard đăng nhập dùng TOÀN CỤC (đăng ký bằng APP_GUARD trong AppModule).
 * Route nào công khai thì gắn @Public(). Route khác mặc định phải có Bearer token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  // Passport mặc định ném UnauthorizedException trơn (không có code). Ném lại kèm mã để FE
  // phân biệt "hết phiên, cần đăng nhập lại" với các lỗi 4xx khác.
  handleRequest<TUser>(err: unknown, user: TUser | false) {
    if (err || !user) {
      throw new UnauthorizedException({
        code: ErrorCode.AUTH_UNAUTHORIZED,
        message: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn',
      });
    }
    return user;
  }
}
