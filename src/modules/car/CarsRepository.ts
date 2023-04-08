import { ICarsRepository } from '../../repositories/ICarsRepository';
import { MongoCarsRepository } from '../../repositories/implementations/MongoCarsRepository';

export const CarsRepository: ICarsRepository = new MongoCarsRepository();
