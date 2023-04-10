/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputCarDTO } from '../interfaces/InputCarDTO';
import { InputReservationDTO } from '../interfaces/InputReservationDTO';
import { InputUserDTO } from '../interfaces/InputUserDTO';
import {
  carQueryValidator,
  createCarInputValidator,
  updateCarInputValidator,
} from '../validators/carValidator';
import {
  createReservationInputValidator,
  updateReservationInputValidator,
} from '../validators/reservationValidator';
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

  static validateCreateCarInputData(input: InputCarDTO) {
    const err: ValidationResult<InputCarDTO> = createCarInputValidator.validate(
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

  static validateUpdateCarInputData(input: Partial<InputCarDTO>) {
    const err: ValidationResult<Partial<InputCarDTO>> =
      updateCarInputValidator.validate(input, {
        abortEarly: false,
      });
    if (err.error) {
      return this.parseError(err.error);
    }
    return null;
  }

  static validateQueryCar(query: Partial<InputCarDTO>) {
    const err: ValidationResult<Partial<InputCarDTO>> =
      carQueryValidator.validate(query, {
        abortEarly: false,
      });
    if (err.error) {
      return this.parseError(err.error);
    }
    return null;
  }

  static validateCreateReservationInputData(query: InputReservationDTO) {
    const err: ValidationResult<InputReservationDTO> =
      createReservationInputValidator.validate(query, {
        abortEarly: false,
      });
    if (err.error) {
      return this.parseError(err.error);
    }
    return null;
  }

  static validateUpdateReservationInputData(
    query: Partial<InputReservationDTO>
  ) {
    const err: ValidationResult<Partial<InputReservationDTO>> =
      updateReservationInputValidator.validate(query, {
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
