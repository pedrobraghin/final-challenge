import { BaseError } from '../errors/BaseError';
import { InputCarDTO } from '../interfaces/InputCarDTO';
import { OutputCarDTO } from '../interfaces/OutputCarDTO';

export interface ICarsRepository {
  create(input: InputCarDTO): Promise<OutputCarDTO>;
  findById(id: string, fields?: string): Promise<OutputCarDTO | null>;
  index(
    limit: number,
    offset: number,
    query: Partial<InputCarDTO>,
    fields?: string
  ): Promise<{ cars: OutputCarDTO[]; documentsCount: number }>;
  delete(id: string): Promise<OutputCarDTO | null>;
  update(
    id: string,
    input: Partial<InputCarDTO>,
    fields?: string
  ): Promise<OutputCarDTO | null>;
  updateAccessory(
    carId: string,
    accessoryId: string,
    input: { description: string },
    fields?: string
  ): Promise<OutputCarDTO | BaseError>;
}
