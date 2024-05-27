import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * 自定义装饰器，从请求对象中获取当前用户。
 * @param data - 装饰器参数。
 * @param ctx - 执行上下文。
 * @returns 当前用户对象。
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
