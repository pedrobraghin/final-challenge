import { OutputUserDTO } from '../../interfaces/OutputUserDTO';
import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { UserSchema } from '../../schemas/UserSchema';
import { IUserRespository } from '../IUsersRepository';

export class MongoUsersRespotirory implements IUserRespository {
  async findById(
    id: string,
    fields: string = ''
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findById(id).select(fields);
    return user;
  }

  async findByEmail(
    email: string,
    fields: string = ''
  ): Promise<OutputUserDTO | null> {
    const user = await UserSchema.findOne({ email }).select(fields);
    return user;
  }

  async index(fields: string = ''): Promise<OutputUserDTO[]> {
    const users = await UserSchema.find().select(fields);
    return users;
  }

  async delete(id: string): Promise<void> {
    await UserSchema.findByIdAndRemove(id);
    return;
  }

  async update(
    id: string,
    input: Partial<InputUserDTO>
  ): Promise<OutputUserDTO | null> {
    const updatedUser = await UserSchema.findByIdAndUpdate(id, input, {
      new: true,
    });
    return updatedUser;
  }

  async create(input: InputUserDTO): Promise<OutputUserDTO> {
    const user = await UserSchema.create(input);
    return user;
  }
}
