import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { IReservationsRepository } from '../../repositories/IReservationsRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class DeleteReservationService {
  private reservationsRepository: IReservationsRepository;

  constructor(reservationsRepository: IReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError('Invalid ID!');
    }

    const deletedReservation = await this.reservationsRepository.delete(id);

    if (!deletedReservation) {
      throw new NotFoundError('Reservation not found!');
    }

    return deletedReservation;
  }
}
