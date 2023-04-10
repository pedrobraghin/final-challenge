import { Schema, model } from 'mongoose';
import { OutputCarDTO } from '../interfaces/OutputCarDTO';

const accessorySchema = new Schema({
  description: {
    type: String,
  },
});

const carSchema = new Schema<OutputCarDTO>({
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
  number_of_passengers: {
    type: Number,
    required: true,
    min: 1,
  },
  accessories: {
    type: [accessorySchema],
  },
});

export const CarSchema = model('Car', carSchema);
