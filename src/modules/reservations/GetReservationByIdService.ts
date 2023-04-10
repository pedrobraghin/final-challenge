import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { IReservationsRepository } from '../../repositories/IReservationsRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class GetReservationByIdService {
  private reservationsRepository: IReservationsRepository;

  constructor(reservationsRepository: IReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError('Invalid ID!');
    }

    const reservation = await this.reservationsRepository.findById(id, '-__v');

    if (!reservation) {
      throw new NotFoundError('Reservation not found!');
    }

    return reservation;
  }
}
