// AppError.js
class AppError extends Error {
  constructor(message, statusCode = 500, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? "fail" : "error";
    this.details = details; // array of error details (for validation, etc.)
    this.isOperational = true;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
