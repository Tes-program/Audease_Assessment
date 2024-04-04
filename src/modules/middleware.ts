import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';
import { Logger } from '../shared/logger';
import { UnauthorizedError, NotFoundError } from "../shared/error";
import { UserModels } from '../api/users/users.model';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const logger = new Logger();

interface AuthenticatedRequest extends Request {
    user?: { userId: string };
    }


export const validationErrorHandler = (error: ValidationError, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    logger.error(`Validation error: ${error.message}`);
    res.status(400).send('Bad request');
  } else {
    next();
  }
};

export const protectUser = (req: AuthenticatedRequest, res: Response, next: any) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer")) {
        res.status(401).json({ error: "Unauthorized, No token provided" });
        throw new UnauthorizedError("Unauthorized, No token provided");
    }
    const token = bearer.split(" ")[1];
    try {
        const secret = env.JWT_SECRET;
        const payload = jwt.verify(token, secret);
        const user = UserModels.findUserById(payload.sub as string);
        if (!user) {
            res.status(401).json({ error: "Unauthorized, User not found" });
            throw new UnauthorizedError("Unauthorized, User not found");
        }
        req.user = { userId: payload.sub as string };
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized, Invalid token" });
        throw new UnauthorizedError("Unauthorized, Invalid token");
    }
    }

    export function validateBody(schema: Joi.Schema): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
          try {
            const { error } = schema.validate(req.body);
      
            if (error) {
              res.json({ validationError: error.details[0].message });
              throw new NotFoundError(error.details[0].message);
            }
      
            req.body = schema.validate(req.body).value; // Assign validated body back to req.body
            next();
          } catch (e) {
            next(e); // Pass unexpected errors to the next error handler
          }
        };
      }
