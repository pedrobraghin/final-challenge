import { InputUserDTO } from './InputUserDTO';

export interface OutputUserDTO extends InputUserDTO {
  _id: string;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
}
