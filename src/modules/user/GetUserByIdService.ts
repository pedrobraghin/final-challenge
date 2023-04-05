import { IUsersRepository } from '../../repositories/IUsersRepository';

export class GetUserByIdService {
  private usersRepository: IUsersRepository;
  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: string) {
    const user = await this.usersRepository.findById(id, '-__v');
    return user;
  }
}
