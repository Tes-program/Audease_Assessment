/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from "winston";

const customLevels = {
    levels: {
      trace: 5,
      debug: 4,
      info: 3,
      warn: 2,
      error: 1,
      fatal: 0,
    },
    colors: {
      trace: 'white',
      debug: 'green',
      info: 'green',
      warn: 'yellow',
      error: 'red',
      fatal: 'red',
    },
   };

const formatter = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...args } = info;
        return `${timestamp} [${level}]: ${message} ${
            Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
        }`;
    }),
)

const isDevelopment = () => {
    return process.env.NODE_ENV === "development";
}


export class Logger {
    private logger: winston.Logger;

    constructor() {
        const prodTransport = new winston.transports.File({
            filename: 'error.log',
            level: 'error',
          });
          const transport = new winston.transports.Console({
            format: formatter,
          });
          this.logger = winston.createLogger({
            level: isDevelopment() ? 'trace' : 'error',
            levels: customLevels.levels,
            transports: [isDevelopment() ? transport : prodTransport],
          });
          winston.addColors(customLevels.colors);
        }
        
        trace(msg: any, meta?: any) {
          this.logger.log('trace', msg, meta);
        }
        
        debug(msg: any, meta?: any) {
          this.logger.debug(msg, meta);
        }
        
        info(msg: any, meta?: any) {
          this.logger.info(msg, meta);
        }
        
        warn(msg: any, meta?: any) {
          this.logger.warn(msg, meta);
        }
        
        error(msg: any, meta?: any) {
          this.logger.error(msg, meta);
        }
        
        fatal(msg: any, meta?: any) {
          this.logger.log('fatal', msg, meta);
        }
    }