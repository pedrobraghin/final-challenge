import { InputReservationDTO } from './InputReservationDTO';

export interface OutputReservationDTO extends InputReservationDTO {
  _id: string;
  final_value: number;
}
