import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  public readonly errors: object;

  constructor(message: string, errors: object) {
    super(400, message);
    this.errors = errors;
    this.name = 'ValidationError';
  }
}
