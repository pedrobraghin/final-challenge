import { IUsersRepository } from '../../repositories/IUsersRepository';
import { MongoUsersRepository } from '../../repositories/implementations/MongoUsersRepository';

export const UsersRepository: IUsersRepository = new MongoUsersRepository();
