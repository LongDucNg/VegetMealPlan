import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from '../constants/error-codes.enum';

/**
 * Guard xác thực tuỳ chọn (dành cho các endpoint phục vụ cả khách và user đăng nhập như Chatbot AI).
 * - Không có header Authorization -> cho qua (request.user = undefined).
 * - Có header Authorization hợp lệ -> gắn request.user.
 * - Token sai hoặc hết hạn -> ném lỗi 401 AUTH_UNAUTHORIZED (không âm thầm coi là khách).
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.['authorization'];

    // Không có Authorization header -> cho qua như khách
    if (!authHeader) {
      return true;
    }

    // Có Authorization header -> kiểm tra tính hợp lệ bằng Passport JWT
    return (await super.canActivate(context)) as boolean;
  }

  handleRequest<TUser>(err: unknown, user: TUser | false) {
    if (err instanceof HttpException) throw err;
    if (err || !user) {
      throw new UnauthorizedException({
        code: ErrorCode.AUTH_UNAUTHORIZED,
        message: 'Token xác thực không hợp lệ hoặc đã hết hạn',
      });
    }
    return user;
  }
}
