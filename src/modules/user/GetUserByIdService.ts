import { InvalidParameterError } from '../../error/InvalidParameterError';
import { NotFoundError } from '../../error/NotFoundError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class GetUserByIdService {
  private usersRepository: IUsersRepository;
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: string) {
    if (!MongoUtils.isValidId(id)) {
      throw new InvalidParameterError('Invalid id!');
    }

    const user = await this.usersRepository.findById(id, '-__v');

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }
}
