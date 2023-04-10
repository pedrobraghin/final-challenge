import { BaseError } from '../../errors/BaseError';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ValidationError } from '../../errors/ValidationError';
import { InputReservationDTO } from '../../interfaces/InputReservationDTO';
import { IReservationsRepository } from '../../repositories/IReservationsRepository';
import { MongoUtils } from '../../utils/MongoUtils';
import { Validators } from '../../utils/Validators';

export class UpdateReservationService {
  private reservationsRepository: IReservationsRepository;

  constructor(reservationsRepository: IReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async execute(id: string, input: Partial<InputReservationDTO>) {
    if (!MongoUtils.isValidId(id)) {
      throw new InvalidParameterError('Invalid ID!');
    }

    const errors = Validators.validateUpdateReservationInputData(input);

    if (errors) {
      throw new ValidationError('Error validating data!', errors);
    }

    if (Object.keys(input).length < 1) {
      throw new InvalidParameterError(
        'At least one field must be provided to update the reservation!'
      );
    }

    const result = await this.reservationsRepository.update(id, input, '-__v');

    if (result instanceof BaseError) {
      throw result;
    }

    return result;
  }
}
