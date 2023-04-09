import { InputCarDTO } from '../../interfaces/InputCarDTO';
import { OutputCarDTO } from '../../interfaces/OutputCarDTO';
import { ICarsRepository } from '../ICarsRepository';
import { CarSchema } from '../../schemas/CarSchema';
import { NotFoundError } from '../../errors/NotFoundError';
import { InvalidParameterError } from '../../errors/InvalidParameterError';

export class MongoCarsRepository implements ICarsRepository {
  async create(input: InputCarDTO): Promise<OutputCarDTO> {
    const car = await CarSchema.create(input);
    return car;
  }

  async findById(
    id: string,
    fields: string = ''
  ): Promise<OutputCarDTO | null> {
    const car = await CarSchema.findById(id).select(fields);
    return car;
  }

  async index(
    limit: number,
    offset: number,
    query: Partial<InputCarDTO>,
    fields: string = ''
  ): Promise<{ cars: OutputCarDTO[]; documentsCount: number }> {
    const skipCount = offset ? (offset - 1) * limit : 0;

    const [cars, documentsCount] = await Promise.all([
      CarSchema.find(query).select(fields).skip(skipCount).limit(limit),
      CarSchema.countDocuments(),
    ]);

    return { cars, documentsCount };
  }

  async delete(id: string): Promise<OutputCarDTO | null> {
    const deletedCar = await CarSchema.findByIdAndRemove(id);
    return deletedCar;
  }

  async update(
    id: string,
    input: Partial<InputCarDTO>,
    fields: string = ''
  ): Promise<OutputCarDTO | null> {
    const updatedCar = await CarSchema.findByIdAndUpdate(id, input, {
      new: true,
    }).select(fields);

    return updatedCar;
  }

  async updateAccessory(
    carId: string,
    accessoryId: string,
    input: { description: string },
    fields: string = ''
  ): Promise<OutputCarDTO | NotFoundError> {
    const car = await CarSchema.findById(carId).select(fields);
    if (!car) {
      return new NotFoundError('Car not found.');
    }

    const accessoryIndex = car.accessories.findIndex(
      (acessory) => acessory._id.toString() === accessoryId
    );

    if (accessoryIndex == -1) {
      return new NotFoundError('Accessory not found.');
    }

    if (car.accessories[accessoryIndex].description == input.description) {
      if (car.accessories.length == 1) {
        return new InvalidParameterError(
          'Could not update accessory: car must have at least one accessory.'
        );
      }
      car.accessories.splice(accessoryIndex, 1);
    } else {
      car.accessories[accessoryIndex].description = input.description;
    }

    const updatedCars = await car.save();

    return updatedCars;
  }
}
