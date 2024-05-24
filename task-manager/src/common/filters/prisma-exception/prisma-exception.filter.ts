import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';

/**
 * Prisma Exception Filter - 统一处理 Prisma 异常
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'Resource not found - 「资源不存在」';
    }

    response
      .status(status)
      .json(failRes(ServerResponseCode.INTERNAL_SERVER_ERROR, message));
  }
}
