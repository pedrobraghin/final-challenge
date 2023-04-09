import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class GetCarByIdService {
  private carsRepository: ICarsRepository;
  constructor(carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError('Invalid ID!');
    }

    const car = await this.carsRepository.findById(id, '-__v');

    if (!car) {
      throw new NotFoundError('Car not found!');
    }

    return car;
  }
}
