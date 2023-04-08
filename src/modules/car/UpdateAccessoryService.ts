import { BaseError } from '../../error/BaseError';
import { InvalidParameterError } from '../../error/InvalidParameterError';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class UpdateAccessoryService {
  private carsRepository: ICarsRepository;
  constructor(carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(carId: string, accessoryId: string, description: string) {
    const isValidCarId = MongoUtils.isValidId(carId);
    const isValidAccessoryId = MongoUtils.isValidId(accessoryId);

    if (!isValidCarId) {
      throw new InvalidParameterError('Invalid car id!');
    }

    if (!isValidAccessoryId) {
      throw new InvalidParameterError('Invalid accessory id!');
    }

    const result = await this.carsRepository.updateAccessory(
      carId,
      accessoryId,
      { description },
      '-__v'
    );

    if (result instanceof BaseError) {
      throw result;
    }

    return result;
  }
}
