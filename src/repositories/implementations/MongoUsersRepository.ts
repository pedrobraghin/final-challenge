import { OutputUserDTO } from '../../interfaces/OutputUserDTO';
import { InputUserDTO } from '../../interfaces/InputUserDTO';
import { UserSchema } from '../../schemas/UserSchema';
import { IUsersRepository } from '../IUsersRepository';

export class MongoUsersRepository implements IUsersRepository {
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

  async index(
    limit: number,
    offset: number,
    fields: string = ''
  ): Promise<{ users: OutputUserDTO[]; documentsCount: number }> {
    const skipCount = offset ? (offset - 1) * limit : 0;
    const [users, documentsCount] = await Promise.all([
      UserSchema.find().select(fields).skip(skipCount).limit(limit),
      UserSchema.countDocuments(),
    ]);
    return { users, documentsCount };
  }

  async delete(id: string): Promise<OutputUserDTO | null> {
    const deletedUser = await UserSchema.findByIdAndRemove(id);

    return deletedUser;
  }

  async update(
    id: string,
    input: Partial<InputUserDTO>,
    fields: string = ''
  ): Promise<OutputUserDTO | null> {
    const updatedUser = await UserSchema.findByIdAndUpdate(id, input, {
      new: true,
    }).select(fields);
    return updatedUser;
  }

  async create(input: InputUserDTO): Promise<OutputUserDTO> {
    const user = await UserSchema.create(input);
    return user;
  }
}
