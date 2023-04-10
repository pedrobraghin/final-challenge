import { ReservationSchema } from './../../schemas/ReservationsSchema';
import { BaseError } from '../../errors/BaseError';
import { InvalidParameterError } from '../../errors/InvalidParameterError';
import { InputReservationDTO } from '../../interfaces/InputReservationDTO';
import { OutputReservationDTO } from '../../interfaces/OutputReservationDTO';
import { CarSchema } from '../../schemas/CarSchema';
import { DateUtils } from '../../utils/DateUtils';
import { IReservationsRepository } from '../IReservationsRepository';
import { DataConflictError } from '../../errors/DataConflictError';
import { MongoUtils } from '../../utils/MongoUtils';
import { NotFoundError } from '../../errors/NotFoundError';

export class MongoReservationRepository implements IReservationsRepository {
  async create(
    input: InputReservationDTO
  ): Promise<OutputReservationDTO | BaseError> {
    const car = await CarSchema.findById(input.id_car);

    if (!car) {
      return new InvalidParameterError('Car not found!');
    }

    const dateConflictQuery = MongoUtils.generateDateConflictQuery(
      input.start_date,
      input.end_date
    );

    const userReservationsCollision = await ReservationSchema.find({
      id_user: input.id_user,
      $or: dateConflictQuery,
    });

    if (userReservationsCollision.length > 0) {
      const userUnavaibleDates = userReservationsCollision.map((r) => {
        return { start_date: r.start_date, end_date: r.end_date };
      });

      return new DataConflictError(
        'You already have rental cars for that date. Please choose another date.',
        {
          userUnavaibleDates,
        }
      );
    }

    const carReservationsCollision = await ReservationSchema.findOne({
      id_car: input.id_car,
      $or: dateConflictQuery,
    });

    if (carReservationsCollision) {
      const alreadyTakenDates = await ReservationSchema.find({
        id_car: input.id_car,
        $or: dateConflictQuery,
      });

      const unavailable_dates = alreadyTakenDates.map((d) => {
        return { start_date: d.start_date, end_date: d.end_date };
      });

      return new DataConflictError(
        'The date you chose is unavailable! Please choose another day for your vehicle rental.',
        {
          unavailable_dates,
        }
      );
    }

    const days = DateUtils.getDaysFromInterval(
      input.start_date,
      input.end_date
    );

    let final_value = days * car.value_per_day;

    if (final_value == 0) {
      final_value = car.value_per_day;
    }

    const reservation = await ReservationSchema.create({
      ...input,
      final_value,
    });

    return reservation;
  }

  async findById(
    id: string,
    fields: string = ''
  ): Promise<OutputReservationDTO | null> {
    const reservation = await ReservationSchema.findById(id).select(fields);
    return reservation;
  }

  async index(
    userId: string,
    limit: number,
    offset: number,
    query: Partial<InputReservationDTO>,
    fields: string = ''
  ): Promise<{ reservations: OutputReservationDTO[]; documentsCount: number }> {
    const skipCount = offset ? (offset - 1) * limit : 0;

    const [reservations, documentsCount] = await Promise.all([
      ReservationSchema.find({ ...query, id_user: userId })
        .skip(skipCount)
        .limit(limit)
        .select(fields),
      ReservationSchema.countDocuments(),
    ]);

    return { reservations, documentsCount };
  }

  async update(
    id: string,
    input: Partial<InputReservationDTO>,
    fields: string = ''
  ): Promise<OutputReservationDTO | BaseError | null> {
    const reservation = await ReservationSchema.findOne({ _id: id });

    if (!reservation) {
      return new NotFoundError('Reservation not found');
    }

    if (input.id_car) {
      const car = await CarSchema.findOne({ _id: input.id_car });

      if (!car) {
        return new NotFoundError('Car not found!');
      }

      const dateConflictQuery = MongoUtils.generateDateConflictQuery(
        input.start_date || reservation.start_date,
        input.end_date || reservation.end_date
      );

      const carReservationsCollision = await ReservationSchema.findOne({
        id_car: input.id_car,
        $or: dateConflictQuery,
      });

      if (carReservationsCollision) {
        const alreadyTakenDates = await ReservationSchema.find({
          id_car: input.id_car,
          $or: dateConflictQuery,
        });

        const unavailable_dates = alreadyTakenDates.map((d) => {
          return { start_date: d.start_date, end_date: d.end_date };
        });

        return new DataConflictError(
          'The date you chose is unavailable! Please choose another day for your vehicle rental.',
          {
            unavailable_dates,
          }
        );
      }

      const days = DateUtils.getDaysFromInterval(
        input.start_date || reservation.start_date,
        input.end_date || reservation.end_date
      );

      let final_value = days * car.value_per_day;

      if (final_value == 0) {
        final_value = car.value_per_day;
      }
    }

    const updatedReservation = await ReservationSchema.findByIdAndUpdate(
      id,
      input
    ).select(fields);

    return updatedReservation;
  }

  async delete(id: string): Promise<OutputReservationDTO | null> {
    const deletedReservation = await ReservationSchema.findByIdAndRemove(id);
    return deletedReservation;
  }
}
