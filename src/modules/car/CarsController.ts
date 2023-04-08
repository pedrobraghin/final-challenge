import { UpdateAccessoryService } from './UpdateAccessoryService';
import { GetAllCarsService } from './GetAllCarsService';
import { CreateCarService } from './CreateCarService';
import { Request, Response, NextFunction } from 'express';
import { CatchExpressError } from '../../decorators/CatchExpressError';
import { InputCarDTO } from '../../interfaces/InputCarDTO';
import { CarsRepository } from './CarsRepository';
import { PaginationUtils } from '../../utils/PaginationUtils';
import { UpdateCarService } from './UpdateCarService';
import { DeleteCarService } from './DeleteCarService';
import { GetCarByIdService } from './GetCarByIdService';

export class CarsController {
  @CatchExpressError
  async createCar(req: Request, res: Response, _next: NextFunction) {
    const createCarService = new CreateCarService(CarsRepository);
    const input: InputCarDTO = req.body;
    const car = await createCarService.excute(input);

    return res.status(201).json({
      status: 'success',
      data: car,
    });
  }

  @CatchExpressError
  async getAllCars(req: Request, res: Response, _next: NextFunction) {
    const getAllCarsService = new GetAllCarsService(CarsRepository);
    const limit = Number(req.query.limit) || 0;
    const offset = Number(req.query.offset) || 0;
    const documents = await getAllCarsService.execute(limit, offset, req.query);
    const offsets = PaginationUtils.calculateOffsets(
      limit,
      documents.documentsCount
    );

    return res.status(200).json({
      status: 'success',
      results: documents.cars.length,
      limit: limit || documents.documentsCount,
      offset,
      offsets,
      data: documents.cars,
    });
  }

  @CatchExpressError
  async getCarById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const getCarByIdService = new GetCarByIdService(CarsRepository);
    const car = await getCarByIdService.execute(id);

    return res.status(200).json({
      status: 'success',
      data: car,
    });
  }

  @CatchExpressError
  async updateAccessory(req: Request, res: Response, _next: NextFunction) {
    const { carId, accessoryId } = req.params;
    const { description } = req.body;

    const updateAccessoryService = new UpdateAccessoryService(CarsRepository);
    const updatedCard = await updateAccessoryService.execute(
      carId,
      accessoryId,
      description
    );

    return res.status(200).json({
      status: 'success',
      data: updatedCard,
    });
  }

  @CatchExpressError
  async updateCar(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const input: InputCarDTO = req.body;
    const updateCarService = new UpdateCarService(CarsRepository);
    const updatedCar = await updateCarService.execute(id, input);

    return res.status(200).json({
      status: 'success',
      data: updatedCar,
    });
  }

  @CatchExpressError
  async deleteCar(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const deleteCarService = new DeleteCarService(CarsRepository);
    await deleteCarService.execute(id);

    return res.status(204).send();
  }
}

export default new CarsController();
