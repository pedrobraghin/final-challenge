import { Schema, model } from 'mongoose';
import { OutputReservationDTO } from '../interfaces/OutputReservationDTO';

const schema = new Schema<OutputReservationDTO>({
  id_user: {
    type: String,
    required: true,
    ref: 'User',
  },
  id_car: {
    type: String,
    required: true,
    ref: 'Car',
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  final_value: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const ReservationSchema = model('Reservation', schema);
