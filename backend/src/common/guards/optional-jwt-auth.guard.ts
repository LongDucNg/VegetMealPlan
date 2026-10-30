import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard xác thực tuỳ chọn (dành cho các endpoint phục vụ cả khách và user đăng nhập như Chatbot AI).
 * - Không có header Authorization -> cho qua như khách (request.user = undefined).
 * - Có header Authorization hợp lệ -> gắn request.user.
 * - Token sai hoặc hết hạn -> cho qua như khách (request.user = undefined), không ném 401 gây hỏng luồng chat của người dùng.
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
    try {
      return (await super.canActivate(context)) as boolean;
    } catch {
      // Nếu token hết hạn hoặc sai định dạng -> cho qua như khách
      return true;
    }
  }

  handleRequest<TUser>(err: unknown, user: TUser | false) {
    if (err || !user) {
      // Coi như khách chưa đăng nhập (request.user = undefined)
      return undefined as unknown as TUser;
    }
    return user;
  }
}
