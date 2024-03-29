import joiDate from '@joi/date';
import Joi from 'joi';
import { Validators } from '../utils/Validators';

const joiExtended = Joi.extend(joiDate);
const minBirthDate = new Date();
const currentDate = new Date();
minBirthDate.setFullYear(currentDate.getFullYear() - 18);
minBirthDate.setDate(currentDate.getDate() - 1);

export const createUserSchema = joiExtended.object({
  name: joiExtended.string().required(),
  cpf: joiExtended
    .string()
    .custom((cpf: string, helpers: any) => {
      if (!Validators.validateCPF(cpf)) {
        return helpers.message('Invalid CPF!');
      }
      return cpf;
    })
    .required(),
  birth: joiExtended
    .date()
    .format('DD-MM-YYYY')
    .max(minBirthDate)
    .required()
    .messages({
      'date.max': 'You must be at least 18 years old!',
    }),
  email: joiExtended.string().email().required().messages({
    'string.email': 'Invalid email format!',
  }),
  password: joiExtended.string().min(6).required().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password must be at most {#limit} characters long',
  }),
  passwordConfirm: joiExtended
    .string()
    .equal(Joi.ref('password'))
    .messages({ 'any.only': 'Passwords do not match!' }),
  cep: joiExtended.string().min(8).max(8).required().messages({
    'string.min': 'Invalid CEP! CEP must contain {#limit} characters.',
    'string.max': 'Invalid CEP! CEP must contain {#limit} characters.',
  }),
  qualified: joiExtended.boolean().required().messages({
    'any.required': 'Qualified is required',
  }),
});

export const updateUserSchema = joiExtended.object({
  name: joiExtended.string().optional(),
  cpf: joiExtended
    .string()
    .custom((cpf: string, helpers: any) => {
      if (!Validators.validateCPF(cpf)) {
        return helpers.message('Invalid CPF!');
      }
      return cpf;
    })
    .optional(),
  birth: joiExtended
    .date()
    .format('DD-MM-YYYY')
    .max(minBirthDate)
    .optional()
    .messages({
      'date.max': 'You must be at least 18 years old!',
    }),
  email: joiExtended.string().email().optional().messages({
    'string.email': 'Invalid email format!',
  }),
  password: joiExtended.string().min(6).optional().messages({
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password must be at most {#limit} characters long',
  }),
  passwordConfirm: joiExtended
    .string()
    .equal(Joi.ref('password'))
    .messages({ 'any.only': 'Passwords do not match!' }),
  cep: joiExtended.string().min(8).max(8).optional().messages({
    'string.min': 'Invalid CEP! CEP must contain {#limit} characters.',
    'string.max': 'Invalid CEP! CEP must contain {#limit} characters.',
  }),
  qualified: joiExtended.boolean().optional().messages({
    'any.required': 'Qualified is required',
  }),
});
