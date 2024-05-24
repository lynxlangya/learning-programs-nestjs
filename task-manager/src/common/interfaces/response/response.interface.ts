import { ServerResponseCode, ServerResponseMessage } from '@/common/enums';

/**
 * @description Interface for API response
 * @interface ApiResponse
 * @template T
 * @property {number} status - Status code of the response
 */
export interface ApiResponse<T> {
  status: ServerResponseCode;
  message: ServerResponseMessage;
  data?: T;
  error?: any;
}
