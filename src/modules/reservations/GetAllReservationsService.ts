import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { InputReservationDTO } from '../../interfaces/InputReservationDTO';
import { IReservationsRepository } from '../../repositories/IReservationsRepository';
import { PaginationUtils } from '../../utils/PaginationUtils';

export class GetAllReservationsService {
  private reservationsRepository: IReservationsRepository;

  constructor(reservationsRepository: IReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async execute(
    userId: string,
    limit: number,
    offset: number,
    query: Partial<InputReservationDTO> = {}
  ) {
    const isValidPagination = PaginationUtils.validatePagination(limit, offset);

    if (!isValidPagination) {
      throw new InvalidParameterError(
        'Limit and offset must be numbers and greater than or equal to 0.'
      );
    }

    const reservations = await this.reservationsRepository.index(
      userId,
      limit,
      offset,
      query,
      '-__v'
    );

    return reservations;
  }
}
