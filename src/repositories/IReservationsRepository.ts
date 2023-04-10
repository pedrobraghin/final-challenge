import { BaseError } from '../errors/BaseError';
import { InputReservationDTO } from './../interfaces/InputReservationDTO';
import { OutputReservationDTO } from './../interfaces/OutputReservationDTO';

export interface IReservationsRepository {
  create(input: InputReservationDTO): Promise<OutputReservationDTO | BaseError>;
  findById(id: string, fields?: string): Promise<OutputReservationDTO | null>;
  index(
    limit: number,
    offset: number,
    query: Partial<InputReservationDTO>,
    fields?: string
  ): Promise<{ reservations: OutputReservationDTO[]; documentsCount: number }>;
  update(
    id: string,
    input: Partial<InputReservationDTO>,
    fields?: string
  ): Promise<OutputReservationDTO | BaseError | null>;
  delete(id: string): Promise<OutputReservationDTO | null>;
}
