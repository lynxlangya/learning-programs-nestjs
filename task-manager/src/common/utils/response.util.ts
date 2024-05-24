import { ApiResponse } from '@/common/interfaces';
import {
  ServerResponseCode,
  ServerResponseMessage,
  ServerResponseMessageMap,
} from '@/common/enums';

export const returnResponse = <T>(
  data: T,
  status: ServerResponseCode = ServerResponseCode.SUCCESS,
  message: ServerResponseMessage = ServerResponseMessage.SUCCESS,
  error?: any,
): ApiResponse<T> => {
  return {
    status,
    message,
    data,
    error,
  };
};

/**
 * 成功响应
 * @param data 返回数据
 * @param status 状态码
 */
export const successRes = <T>(data: T): ApiResponse<T> => {
  return returnResponse(data);
};

/**
 * 失败响应
 * @param status 状态码
 * @param error 错误
 */
export const failRes = (
  status: ServerResponseCode,
  error: any,
): ApiResponse<null> => {
  return returnResponse(
    null,
    status,
    ServerResponseMessageMap[status] ||
      ServerResponseMessage.INTERNAL_SERVER_ERROR,
    error,
  );
};
