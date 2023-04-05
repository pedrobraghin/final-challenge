import { IUserRespository } from '../../repositories/IUsersRepository';
import { MongoUsersRespotirory } from '../../repositories/implementations/MongoUsersRepository';

export const UsersRepository: IUserRespository = new MongoUsersRespotirory();
