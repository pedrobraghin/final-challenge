import { InputCarDTO } from './InputCarDTO';

export interface OutputCarDTO extends InputCarDTO {
  _id: string;
  accessories: Array<{
    _id: string;
    description: string;
  }>;
}
