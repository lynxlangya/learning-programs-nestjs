import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 当前的上下文
    const response = ctx.getResponse<Response>(); // 获取响应对象
    // const request = ctx.getRequest<Request>(); // 获取请求对象
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null; // 获取异常响应

    const errorResponse: ApiResponse<null> = {
      status,
      message: exceptionResponse['message'], // 获取异常信息
      error: exceptionResponse['message'] || null, // 获取异常信息
    }; // 构建异常响应

    response.status(status).json(errorResponse); // 返回异常响应
  }
}
