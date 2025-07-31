class ApiError extends Error {
  constructor(statusCode, message, error = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.error = error;
  }
}

export default ApiError;
