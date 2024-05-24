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

enum PrismaErrorCode {
  /**
   * 未找到资源
   * @see https://www.prisma.io/docs/orm/reference/error-reference#p2025
   */
  NotFound = 'P2025',

  /**
   * 输入错误
   * @see https://www.prisma.io/docs/orm/reference/error-reference#p2019
   */
  InputError = 'P2019',
}

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

    switch (exception.code) {
      case PrismaErrorCode.NotFound:
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found - 「资源不存在」';
        break;
      case PrismaErrorCode.InputError:
        status = HttpStatus.BAD_REQUEST;
        message = 'Input error - 「输入错误」';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'unknown error - 「未知错误」';
        break;
    }

    response
      .status(status)
      .json(failRes(ServerResponseCode.INTERNAL_SERVER_ERROR, message));
  }
}
