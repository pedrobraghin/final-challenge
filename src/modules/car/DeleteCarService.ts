import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class DeleteCarService {
  private carsRepository: ICarsRepository;

  constructor(carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(id: string) {
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError('Invalid id!');
    }

    const deletedCar = await this.carsRepository.delete(id);

    if (!deletedCar) {
      throw new NotFoundError('Car not found!');
    }

    return deletedCar;
  }
}
