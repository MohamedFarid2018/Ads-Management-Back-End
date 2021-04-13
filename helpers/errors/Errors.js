const ErrorCodes = require("./errorCodes");

/**
 * id: Number (Error unique id)
 * name: String (Error name)
 * status: Number (http response status)
 * message: String (Error message)
 */
class BaseError extends Error {
  constructor(
    code = 0,
    name = "Error",
    status = 500,
    message = "Internal server error",
    message_ar = "خطأ فى الوصول"
  ) {
    super(message, message_ar);

    this.code = code;
    this.name = name;
    this.status = status;
    this.message = message;
    this.message_ar = message_ar;
  }

  toJson() {
    return {
      error: this.name,
      message: this.message,
      arMessage: this.message_ar,
    };
  }
}

// Authentication & Authorization
class NotFoundError extends BaseError {
  constructor(code = 0, message = "Error 404", message_ar = "غير موجود") {
    super(code, "NotFoundError", 404, message, message_ar);
  }
}

class UnauthenticatedError extends BaseError {
  constructor(
    code = 0,
    message = "Authentication failed",
    message_ar = "المصادقة فشلت"
  ) {
    super(code, "UnauthenticatedError", 403, message, message_ar);
  }
}

class UnauthorizedError extends BaseError {
  constructor(
    code = 0,
    message = "Unauthorized Access",
    message_ar = "دخول غير مرخص"
  ) {
    super(code, "UnauthorizedError", 401, message, message_ar);
  }
}

class ValidationError extends BaseError {
  constructor(
    code = 0,
    message = "Bad Request",
    message_ar = "طلب غير صالح",
    errors
  ) {
    super(code, "ValidationError", 400, message, message_ar);
    this.errors = errors;
  }
}

class DuplicationError extends BaseError {
  constructor(
    code = 0,
    message = "Duplication Error",
    message_ar = "خطأ تكرار",
    errors
  ) {
    super(code, "DuplicationError", 409, message, message_ar);
    this.errors = errors;
  }
}

class UnexpectedError extends BaseError {
  constructor(
    code = 0,
    message = "Internal Server Error 500",
    message_ar = "خطأ فى السيرفر 500"
  ) {
    super(code, "UnexpectedError", 500, message, message_ar);
  }
}

class PaymentError extends BaseError {
  constructor(
    code = 0,
    message = "Payment Error",
    message_ar = "خطأ فى الدفع",
    errors
  ) {
    super(code, "PaymentError", 400, message, message_ar);
    this.errors = errors;
  }
}

class BusinessError extends BaseError {
  constructor(
    code = 0,
    message = "Business error",
    message_ar = "خطأ في العمل",
    errors
  ) {
    super(code, message, message_ar, errors);
  }
}

module.exports = {
  Error: BaseError,
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
  DuplicationError,
  UnexpectedError,
  NotFoundError,
  ErrorCodes,
  PaymentError,
  BusinessError,
};
