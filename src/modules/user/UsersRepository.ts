import { IUsersRepository } from '../../repositories/IUsersRepository';
import { MongoUsersRespotirory } from '../../repositories/implementations/MongoUsersRepository';

export const UsersRepository: IUsersRepository = new MongoUsersRespotirory();
