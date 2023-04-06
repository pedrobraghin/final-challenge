import { InvalidParameterError } from '../../error/InvalidParameterError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

export class GetAllUsersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(limit: number, offset: number) {
    if (limit < 0 || offset < 0) {
      throw new InvalidParameterError(
        'Limit and offset must be numbers and greater than or equal to 0.'
      );
    }

    const users = await this.usersRepository.index(limit, offset, '-__v');
    return users;
  }
}
