import { BaseError } from './BaseError';

export class DriverLicenseMissingError extends BaseError {
  constructor(message: string) {
    super(403, message);
    this.name = 'DriverLicenseMissingError';
  }
}
