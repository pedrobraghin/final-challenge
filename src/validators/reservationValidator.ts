import Joi from 'joi';
import joiDate from '@joi/date';

const joiExtended = Joi.extend(joiDate);

const currentDate = new Date();
const minDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate()
);

export const createReservationInputValidator = Joi.object({
  id_car: joiExtended.string().required(),
  start_date: joiExtended.date().format('MM-DD-YYYY').min(minDate).required(),
  end_date: joiExtended
    .date()
    .format('MM-DD-YYYY')
    .min(joiExtended.ref('start_date'))
    .required(),
});

export const updateReservationInputValidator = Joi.object({
  id_car: joiExtended.string().optional(),
  start_date: joiExtended
    .date()
    .format('DD-MM-YYYY')
    .min(Date.now())
    .optional(),
  end_date: joiExtended
    .date()
    .format('DD-MM-YYYY')
    .min(joiExtended.ref('start_date'))
    .optional(),
});
