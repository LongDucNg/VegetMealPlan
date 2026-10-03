import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../modules/users/entities/user.entity';
import { ErrorCode } from '../constants/error-codes.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (requiredRoles.includes(user?.role)) return true;

    // TRƯỚC ĐÂY: trả false, Nest tự sinh 403 "Forbidden resource" (tiếng Anh, không có code).
    // Giờ: ném 403 kèm mã AUTH_FORBIDDEN và message tiếng Việt để FE xử lý thống nhất.
    throw new ForbiddenException({
      code: ErrorCode.AUTH_FORBIDDEN,
      message: 'Bạn không có quyền thực hiện thao tác này',
    });
  }
}
