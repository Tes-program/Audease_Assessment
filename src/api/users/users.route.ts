import express from 'express';
import { UsersController } from './users.controller';
import { protectUser, validateBody } from '../../modules/middleware';
import { loginUserSchema, createUserSchema } from './users.validation';

const authRouter = express.Router();


authRouter.post('/register', validateBody(createUserSchema), UsersController.createUser);
authRouter.post('/login', validateBody(loginUserSchema), UsersController.loginUser);
authRouter.get('/verify', UsersController.verifyUser);
authRouter.delete('/delete/:id', protectUser, UsersController.deleteUser);

export { authRouter };
