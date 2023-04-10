import { IReservationsRepository } from '../../repositories/IReservationsRepository';
import { MongoReservationRepository } from '../../repositories/implementations/MongoReservationsRepository';

export const ReservationsRepository: IReservationsRepository =
  new MongoReservationRepository();
