import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ValidationError } from '../../errors/ValidationError';
import { InputCarDTO } from '../../interfaces/InputCarDTO';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { MongoUtils } from '../../utils/MongoUtils';
import { Validators } from '../../utils/Validators';

export class UpdateCarService {
  private carsRepository: ICarsRepository;

  constructor(carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute(id: string, input: Partial<InputCarDTO>) {
    const errors = Validators.validateUpdateCarInputData(input);
    const isValidId = MongoUtils.isValidId(id);

    if (!isValidId) {
      throw new InvalidParameterError('Invalid ID');
    }

    if (errors) {
      throw new ValidationError('Error validating data!', errors);
    }

    const updatedCar = await this.carsRepository.update(id, input, '-__v');

    if (!updatedCar) {
      throw new NotFoundError('Car not found!');
    }

    return updatedCar;
  }
}
