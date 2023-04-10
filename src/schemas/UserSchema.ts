import { Schema, model } from 'mongoose';
import { OutputUserDTO } from '../interfaces/OutputUserDTO';

const schema = new Schema<OutputUserDTO>({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
    select: false,
  },
  cep: {
    type: String,
    required: true,
  },
  qualified: {
    type: Boolean,
    required: true,
  },
  patio: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  uf: {
    type: String,
    required: true,
  },
});

export const UserSchema = model('User', schema);
