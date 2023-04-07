import Joi from 'joi';

const accessoryValidator = Joi.object({
  description: Joi.string().required(),
});

export const createCarInputValidator = Joi.object({
  model: Joi.string().required(),
  color: Joi.string().required(),
  year: Joi.number().min(1950).max(new Date().getFullYear()).required(),
  value_per_day: Joi.number().min(0).required(),
  accessories: Joi.array<{ description: string }>()
    .items(accessoryValidator)
    .min(1)
    .unique('description')
    .required(),
  number_of_passengers: Joi.number().min(1).required(),
});

export const updateCarInputValidator = Joi.object({
  model: Joi.string().optional(),
  color: Joi.string().optional(),
  year: Joi.number().min(1950).max(new Date().getFullYear()).optional(),
  value_per_day: Joi.number().min(0).optional(),
  accessories: Joi.array<{ description: string }>()
    .items(accessoryValidator)
    .min(1)
    .unique('description')
    .optional(),
  number_of_passengers: Joi.number().min(1).optional(),
});

export const carQueryValidator = Joi.object({
  model: Joi.string().optional(),
  color: Joi.string().optional(),
  year: Joi.number().min(1950).max(new Date().getFullYear()).optional(),
  value_per_day: Joi.number().min(0).optional(),
  'accessories.description': Joi.string().optional(),
  number_of_passengers: Joi.number().min(1).optional(),
});
