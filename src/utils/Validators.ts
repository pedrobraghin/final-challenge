/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputUserDTO } from '../interfaces/InputUserDTO';
import {
  createUserSchema,
  updateUserSchema,
} from '../validators/userValidator';
import { ValidationError, ValidationResult } from 'joi';

interface IndexableObject {
  [index: string]: any;
}

export class Validators {
  static validateCreateUserInputData(input: InputUserDTO) {
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

  static validateUpdateUserInputData(input: Partial<InputUserDTO>) {
    const err: ValidationResult<Partial<InputUserDTO>> =
      updateUserSchema.validate(input, {
        abortEarly: false,
      });
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
