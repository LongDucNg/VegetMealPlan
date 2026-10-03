import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  user_id: number;
  email: string;
  role: string;
}

/** Lấy user từ JWT: @CurrentUser() user  hoặc  @CurrentUser('user_id') id */
export const CurrentUser = createParamDecorator(
  (field: keyof AuthUser | undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user as AuthUser;
    return field ? user?.[field] : user;
  },
);
