import { IUsersRepository } from '../../repositories/IUsersRepository';

export class GetAllUsersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute() {
    const users = await this.usersRepository.index('-__v');
    return users;
  }
}
