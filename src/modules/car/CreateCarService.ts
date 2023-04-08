import { ICarsRepository } from './../../repositories/ICarsRepository';
import { InputCarDTO } from '../../interfaces/InputCarDTO';
import { Validators } from '../../utils/Validators';
import { ValidationError } from '../../error/ValidationError';

export class CreateCarService {
  private carsRepository: ICarsRepository;

  constructor(carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository;
  }

  async excute(input: InputCarDTO) {
    const errors = Validators.validateCreateCarInputData(input);

    if (errors) {
      throw new ValidationError(errors);
    }

    const car = await this.carsRepository.create(input);

    return car;
  }
}
