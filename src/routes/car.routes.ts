import { Router } from 'express';
import CarsController from '../modules/car/CarsController';
import { auth } from '../middlewares/auth';
const carRouter = Router();

carRouter.get('/:id', CarsController.getCarById);
carRouter.get('/', CarsController.getAllCars);

carRouter.use(auth);

carRouter.post('/', CarsController.createCar);
carRouter.patch(
  '/:carId/accessories/:accessoryId',
  CarsController.updateAccessory
);
carRouter.put('/:id', CarsController.updateCar);
carRouter.delete('/:id', CarsController.deleteCar);

export { carRouter };
