import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { NotFoundError } from '../../errors/NotFoundError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { MongoUtils } from '../../utils/MongoUtils';

export class DeleteUserByIdService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: string) {
    if (!MongoUtils.isValidId(id)) {
      throw new InvalidParameterError('Invalid ID!');
    }

    const deletedUser = await this.usersRepository.delete(id);

    if (!deletedUser) {
      throw new NotFoundError('User not found!');
    }
  }
}
