import joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';
import { Logger } from '../shared/logger';


dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});


const logger = new Logger();

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .valid('development', 'production', 'test')
    .required(),
  PORT: joi.number()
    .default(3000),
  DB_HOST: joi.string()
    .required(),
  DB_NAME: joi.string()
    .required(),
  DB_USER: joi.string()
    .required(),
  DB_PASSWORD: joi.string()
    .required(),
  JWT_SECRET: joi.string()
    .required(),
  JWT_EXPIRES_IN: joi.string()
    .required(),
}).unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if ( error ) {
    logger.error(`Config validation error: ${error.message}`);
    process.exit(1);
}

export const env = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  DB_HOST: envVars.DB_HOST,
  DB_NAME: envVars.DB_NAME,
  DB_USER: envVars.DB_USER,
  DB_PASSWORD: envVars.DB_PASSWORD,
  JWT_SECRET: envVars.JWT_SECRET,
  JWT_EXPIRES_IN: envVars.JWT_EXPIRES_IN
};