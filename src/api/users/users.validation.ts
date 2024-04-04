import Joi from 'joi';

export const createUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

export const loginUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });
