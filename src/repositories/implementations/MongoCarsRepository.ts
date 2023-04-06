import { InputCarDTO } from '../../interfaces/InputCarDTO';
import { OutputCarDTO } from '../../interfaces/OutputCarDTO';
import { ICarsRepository } from '../ICarsRepository';
import { CarSchema } from '../../schemas/CarSchema';

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
    fields: string = ''
  ): Promise<{ cars: OutputCarDTO[]; documentsCount: number }> {
    const skipCount = offset ? (offset - 1) * limit : 0;
    const [cars, documentsCount] = await Promise.all([
      CarSchema.find().select(fields).skip(skipCount).limit(limit),
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
  ): Promise<OutputCarDTO | string> {
    const car = await CarSchema.findById(carId).select(fields);
    if (!car) {
      return 'Car not found.';
    }

    const accessoryIndex = car.accessories.findIndex(
      (acessory) => acessory._id === accessoryId
    );

    if (accessoryIndex == -1) {
      return 'Acessory not found.';
    }

    if (car.accessories[accessoryIndex].description == input.description) {
      car.accessories.splice(accessoryIndex, 1);
    } else {
      car.accessories[accessoryIndex].description = input.description;
    }

    await car.save();

    return car;
  }
}
