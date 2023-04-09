import { BaseError } from './BaseError';

export class DataConflictError extends BaseError {
  public readonly errors: object;
  constructor(message: string, errors: object) {
    super(409, message);
    this.name = 'DataConflictError';
    this.errors = errors;
  }
}
