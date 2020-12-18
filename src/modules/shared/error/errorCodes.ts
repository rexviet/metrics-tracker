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
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_OTP = 'INVALID_OTP',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_OR_PHONE_EXISTS = 'EMAIL_OR_PHONE_EXISTS',
  HTTP_CALL_ERROR = 'HTTP_CALL_ERROR',
  REFERENCE_ERROR = 'REFERENCE_ERROR',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  USER_EXISTED = 'USER_EXISTED',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  PRODUCT_NOT_EXIST = 'PRODUCT_NOT_EXIST',
  CATEGORY_NOT_EXIST = 'CATEGORY_NOT_EXIST',
  CART_NOT_FOUND = 'CART_NOT_FOUND',
  CART_ITEM_NOT_EXIST = 'CART_ITEM_NOT_EXIST',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  CUSTOMER_NOT_EXIST = 'CUSTOMER_NOT_EXIST',
  SHIPPING_ADDRESS_NOT_EXIST = 'SHIPPING_ADDRESS_NOT_EXIST',
  SUPPLIER_NOT_EXIST = 'SUPPLIER_NOT_EXIST',
  DUPLICATE_PRODUCT_CODE = 'DUPLICATE_PRODUCT_CODE',
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
  [ERROR_CODE.HTTP_CALL_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Call http error',
  },
  [ERROR_CODE.UNEXPECTED_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Unexpected error',
  },
  [ERROR_CODE.UNAUTHORIZED]: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Invalid email or password',
  },
  [ERROR_CODE.INVALID_OTP]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Invalid OTP',
  },
  [ERROR_CODE.USER_NOT_FOUND]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'User not found',
  },
  [ERROR_CODE.EMAIL_OR_PHONE_EXISTS]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Email or phone exists',
  },
  [ERROR_CODE.REFERENCE_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Cannot get reference info',
  },
  [ERROR_CODE.ROLE_NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Role not found',
  },
  [ERROR_CODE.RESOURCE_NOT_FOUND]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Resource not found',
  },
  [ERROR_CODE.USER_EXISTED]: {
    statusCode: HttpStatus.CONFLICT,
    message: 'User existed',
  },
  [ERROR_CODE.INVALID_PASSWORD]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message:
      'Password must has upper case, lower case, digits and must not has space',
  },
  [ERROR_CODE.PRODUCT_NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Product not found',
  },
  [ERROR_CODE.PRODUCT_NOT_EXIST]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Product not exist',
  },
  [ERROR_CODE.CATEGORY_NOT_EXIST]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Category not exist',
  },
  [ERROR_CODE.CART_NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Cart not found',
  },
  [ERROR_CODE.CART_ITEM_NOT_EXIST]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Cart item not exist',
  },
  [ERROR_CODE.PERMISSION_DENIED]: {
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Permission denied',
  },
  [ERROR_CODE.CUSTOMER_NOT_EXIST]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Customer not exist',
  },
  [ERROR_CODE.SHIPPING_ADDRESS_NOT_EXIST]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Shipping Address not exist',
  },
  [ERROR_CODE.SUPPLIER_NOT_EXIST]: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Shipping Address not exist',
  },
  [ERROR_CODE.DUPLICATE_PRODUCT_CODE]: {
    statusCode: HttpStatus.CONFLICT,
    message: 'Product code already existed in this Supplier',
  },
};

export { ErrorDetails, ERROR_CODE, ErrorList };
