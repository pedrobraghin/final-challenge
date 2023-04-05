/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputUserDTO } from '../interfaces/InputUserDTO';
import { createUserSchema } from '../validators/userValidator';
import { ValidationError, ValidationResult } from 'joi';

interface IndexableObject {
  [index: string]: any;
}

export class Validators {
  static validateUser(input: InputUserDTO) {
    const err: ValidationResult<InputUserDTO> = createUserSchema.validate(
      input,
      {
        abortEarly: false,
      }
    );
    if (err.error) {
      return this.parseError(err.error);
    }
    return null;
  }

  static parseError(err: ValidationError) {
    const errorObj: IndexableObject = {};
    err.details.forEach((err) => {
      if (err.context?.label) {
        errorObj[err.context.label] = err.message;
      }
    });
    return errorObj;
  }
}
