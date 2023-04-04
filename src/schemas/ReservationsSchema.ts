import { Schema, model } from 'mongoose';

const schema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  id_car: {
    type: Schema.Types.ObjectId,
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
  },
});

export const ReservationSchema = model('Reservation', schema);
