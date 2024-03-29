import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ValidationError } from '../../errors/ValidationError';
import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import FetchAddress from '../../utils/FetchAddress';
import { MongoUtils } from '../../utils/MongoUtils';
import { PasswordUtils } from '../../utils/PasswordUtils';
import { Validators } from '../../utils/Validators';

export class UpdateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: string, input: Partial<InputUserDTO>) {
    if (!MongoUtils.isValidId(id)) {
      throw new InvalidParameterError('Invalid ID!');
    }

    // check if object is empty
    if (Object.keys(input).length === 0) {
      throw new ValidationError('Invalid body!', {
        error: 'At least one field is required to update!',
      });
    }

    const errors = Validators.validateUpdateUserInputData(input);

    if (errors) {
      throw new ValidationError('Invalid fields!', errors);
    }

    if (input.password) {
      input.password = await PasswordUtils.hashPass(input.password);
    }

    if (input.cep) {
      const address = await FetchAddress.fetchByCep(input.cep);
      Object.assign(input, address);
    }

    const updatedUser = await this.usersRepository.update(id, input, '-__v');

    if (!updatedUser) {
      throw new NotFoundError('User not found!');
    }

    return updatedUser;
  }
}
