/* eslint-disable no-unused-vars */

import { OutputUserDTO } from '../interfaces/OutputUserDTO';
import { InputUserDTO } from '../interfaces/InputUserDTO';

export interface IUserRespository {
  create(input: InputUserDTO): Promise<OutputUserDTO>;
  findById(id: string, fields?: string): Promise<OutputUserDTO | null>;
  findByEmail(email: string, fields?: string): Promise<OutputUserDTO | null>;
  index(fields?: string): Promise<OutputUserDTO[]>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    input: Partial<InputUserDTO>
  ): Promise<OutputUserDTO | null>;
}
