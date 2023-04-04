import { Schema, model } from 'mongoose';

const acessorySchema = new Schema({
  description: {
    type: String,
  },
});

const carSchema = new Schema({
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1950,
  },
  value_per_day: {
    type: Number,
    min: 0,
    required: true,
  },
  number_os_passengers: {
    type: Number,
    required: true,
    min: 1,
  },
  acessories: {
    type: [acessorySchema],
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
});

export const CarSchema = model('Car', carSchema);
