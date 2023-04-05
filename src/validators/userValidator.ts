import joiDate from '@joi/date';
import Joi from 'joi';

const joiExtended = Joi.extend(joiDate);
const minBirthDate = new Date();
const currentDate = new Date();
minBirthDate.setFullYear(currentDate.getFullYear() - 18);
minBirthDate.setDate(currentDate.getDate() - 1);

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const createUserSchema = joiExtended.object({
  name: joiExtended.string().required(),
  cpf: joiExtended.string().regex(cpfRegex).required().messages({
    'string.pattern.base': 'Invalid CPF!',
  }),
  birth: joiExtended
    .date()
    .format('DD-MM-YYYY')
    .max(minBirthDate)
    .required()
    .messages({
      'date.max': 'You must be at least 18 years old!',
    }),
  email: joiExtended.string().email().required().messages({
    'string.email': 'Invalid email!',
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
    'string.min': 'Invalid CEP!',
    'string.max': 'Invalid CEP!',
  }),
  qualified: joiExtended.string().valid('sim', 'não').required().messages({
    'any.only': 'Answer must be "sim" or "não"',
    'any.required': 'Answer is required',
  }),
});

export const updateUserSchema = joiExtended.object({
  name: joiExtended.string().required(),
  cpf: joiExtended.string().regex(cpfRegex).optional().messages({
    'string.pattern.base': 'Invalid CPF!',
  }),
  birth: joiExtended
    .date()
    .format('DD-MM-YYYY')
    .max(minBirthDate)
    .required()
    .messages({
      'date.max': 'You must be at least 18 years old!',
    }),
  email: joiExtended.string().email().optional().messages({
    'string.email': 'Invalid email!',
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
    'string.min': 'Invalid CEP!',
    'string.max': 'Invalid CEP!',
  }),
  qualified: joiExtended.string().valid('sim', 'não').optional().messages({
    'any.only': 'Answer must be "sim" or "não"',
    'any.required': 'Answer is required',
  }),
});
