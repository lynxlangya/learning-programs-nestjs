export enum ServerResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ServerResponseMessage {
  SUCCESS = 'Request successful',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Resource not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}

export const ServerResponseMessageMap = {
  [ServerResponseCode.SUCCESS]: ServerResponseMessage.SUCCESS,
  [ServerResponseCode.BAD_REQUEST]: ServerResponseMessage.BAD_REQUEST,
  [ServerResponseCode.UNAUTHORIZED]: ServerResponseMessage.UNAUTHORIZED,
  [ServerResponseCode.FORBIDDEN]: ServerResponseMessage.FORBIDDEN,
  [ServerResponseCode.NOT_FOUND]: ServerResponseMessage.NOT_FOUND,
  [ServerResponseCode.INTERNAL_SERVER_ERROR]:
    ServerResponseMessage.INTERNAL_SERVER_ERROR,
};
