/* eslint-disable @typescript-eslint/no-unused-vars */
import { UsersService } from "./users.service";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
    user?: { userId: string };
  }


export class UsersController {
    public static async createUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await UsersService.createUser(username as string, password as string);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async loginUser(req: Request, res: Response) {
        try {
            const user = await UsersService.loginUser(req.body.username, req.body.password);
            res.status(200).json(user);
        } catch (error : any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async verifyUser(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.user?.userId
            const user = await UsersService.verifyUser(userId as string);
            res.status(200).json(user);
        } catch (error : any) {
            res.status(400).json({ error: error.message });
        }
    }
}