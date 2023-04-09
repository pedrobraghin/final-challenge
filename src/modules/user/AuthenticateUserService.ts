import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { JWTHandler } from '../../jwt/JWTHandler';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { PasswordUtils } from '../../utils/PasswordUtils';

export class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new InvalidParameterError('Email and Password must be provided!');
    }

    const user = await this.usersRepository.findByEmail(email, 'password');

    if (!user) {
      throw new UnauthorizedError('Invalid email or password!');
    }

    const validPass = await PasswordUtils.comparePass(password, user.password);

    if (!validPass) {
      throw new UnauthorizedError('Invalid email or password!');
    }

    const token = JWTHandler.generateToken(user._id);
    return token;
  }
}
