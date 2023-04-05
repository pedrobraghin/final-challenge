import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  public readonly errors: object;

  constructor(errors: object) {
    super(400, 'Error validating data');
    this.errors = errors;
    this.name = 'ValidationError';
  }
}
