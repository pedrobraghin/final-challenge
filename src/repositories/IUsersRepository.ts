/* eslint-disable no-unused-vars */

import { OutputUserDTO } from '../interfaces/OutputUserDTO';
import { InputUserDTO } from '../interfaces/InputUserDTO';

export interface IUsersRepository {
  create(input: InputUserDTO): Promise<OutputUserDTO>;
  findById(id: string, fields?: string): Promise<OutputUserDTO | null>;
  findByEmail(email: string, fields?: string): Promise<OutputUserDTO | null>;
  index(
    limit: number,
    offset: number,
    fields?: string
  ): Promise<{ users: OutputUserDTO[]; documentsCount: number }>;
  delete(id: string): Promise<OutputUserDTO | null>;
  update(
    id: string,
    input: Partial<InputUserDTO>
  ): Promise<OutputUserDTO | null>;
}
