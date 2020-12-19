import { HttpStatus } from '@nestjs/common';

interface ErrorDetails {
  message: string;
  key: string;
  code: string;
}

enum ERROR_CODE {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  PARAM_INVALID = 'PARAM_INVALID',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

const ErrorList = {
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  [ERROR_CODE.PARAM_INVALID]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Parameters invalid',
  },
  [ERROR_CODE.UNEXPECTED_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Unexpected error',
  },
};

export { ErrorDetails, ERROR_CODE, ErrorList };
