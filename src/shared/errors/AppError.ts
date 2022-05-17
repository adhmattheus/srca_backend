import ExtendableError from './ExtendableError';

class AppError extends ExtendableError {
  public readonly statusCode: number;
  public readonly cause: Error | undefined;

  constructor(message: string, statusCode = 400, cause?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

export default AppError;
