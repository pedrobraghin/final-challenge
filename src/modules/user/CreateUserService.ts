import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { OutputUserDTO } from '../../interfaces/OutputUserDTO';
import { IUserRespository } from '../../repositories/IUsersRepository';
import FetchAddress from '../../utils/FetchAddress';

export class CreateUserService {
  private usersRepository: IUserRespository;

  constructor(usersRepository: IUserRespository) {
    this.usersRepository = usersRepository;
  }

  async execute(input: InputUserDTO): Promise<OutputUserDTO> {
    const address = await FetchAddress.fetchByCep(input.cep);
    const userData = Object.assign(input, address);

    const user = await this.usersRepository.create(userData);
    return user;
  }
}
