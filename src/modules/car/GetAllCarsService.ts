import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { ValidationError } from '../../errors/ValidationError';
import { InputCarDTO } from '../../interfaces/InputCarDTO';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { PaginationUtils } from '../../utils/PaginationUtils';
import { Validators } from '../../utils/Validators';

export class GetAllCarsService {
  private carsRepository: ICarsRepository;

  constructor(carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(
    limit: number,
    offset: number,
    query: Partial<InputCarDTO> = {}
  ) {
    const isValidPagination = PaginationUtils.validatePagination(limit, offset);

    if (!isValidPagination) {
      throw new InvalidParameterError(
        'Limit and offset must be numbers and greater than or equal to 0.'
      );
    }

    if (Object.keys(query).length > 0) {
      const queryErrors = Validators.validateQueryCar(query);
      if (queryErrors) {
        throw new ValidationError('Error validating query!', queryErrors);
      }
    }

    const cars = await this.carsRepository.index(limit, offset, query, '-__v');
    return cars;
  }
}
