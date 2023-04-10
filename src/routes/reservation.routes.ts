import { Router } from 'express';
import { auth } from '../middlewares/auth';
import ReservationsController from '../modules/reservations/ReservationsController';
const reservationRouter = Router();

reservationRouter.use(auth);
reservationRouter.post('/', ReservationsController.createReservation);
reservationRouter.get('/', ReservationsController.getAllReservations);
reservationRouter.get('/:id', ReservationsController.getReservationById);
reservationRouter.put('/:id', ReservationsController.updateReservation);
reservationRouter.delete('/:id', ReservationsController.deleteReservation);

export { reservationRouter };
