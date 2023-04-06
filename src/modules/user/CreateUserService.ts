import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { OutputUserDTO } from '../../interfaces/OutputUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { PasswordUtils } from '../../utils/PasswordUtils';
import FetchAddress from '../../utils/FetchAddress';
import { Validators } from '../../utils/Validators';
import { ValidationError } from '../../error/ValidationError';
export class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(input: InputUserDTO): Promise<OutputUserDTO> {
    const errors = Validators.validateCreateUserInputData(input);

    if (errors) {
      throw new ValidationError(errors);
    }

    const address = await FetchAddress.fetchByCep(input.cep);
    const userData = Object.assign(input, address);

    userData.password = await PasswordUtils.hashPass(input.password);

    const user = await this.usersRepository.create(userData);
    return user;
  }
}
