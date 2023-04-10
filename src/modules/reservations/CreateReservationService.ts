import { BaseError } from '../../errors/BaseError';
import { DriverLicenseMissingError } from '../../errors/DriverLicenseMissingError';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ValidationError } from '../../errors/ValidationError';
import { InputReservationDTO } from '../../interfaces/InputReservationDTO';
import { OutputUserDTO } from '../../interfaces/OutputUserDTO';
import { IReservationsRepository } from '../../repositories/IReservationsRepository';
import { MongoUtils } from '../../utils/MongoUtils';
import { Validators } from '../../utils/Validators';

export class CreateReservationService {
  private reservationsRepository: IReservationsRepository;

  constructor(reservationsRepository: IReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async execute(input: InputReservationDTO, user: OutputUserDTO) {
    if (!user.qualified) {
      throw new DriverLicenseMissingError(
        'User not qualified. You must to have a driver license to create a reservation.'
      );
    }

    const errors = Validators.validateCreateReservationInputData(input);

    if (errors) {
      throw new ValidationError('Error validating data!', errors);
    }

    if (!MongoUtils.isValidId(input.id_car)) {
      throw new InvalidParameterError('Invalid car ID!');
    }

    const reservationData = Object.assign(input, { id_user: user._id });

    const result = await this.reservationsRepository.create(reservationData);

    if (result instanceof BaseError) {
      throw result;
    }

    return result;
  }
}
