import { UserModels } from "./users.model";
import { IUsers } from "../../utils/interfaces/users.interface";
import { generateAuthTokens } from "../../modules/auth";
import { NotFoundError, UnauthorizedError } from "../../shared/error";
import { TokenPayload } from "../../utils/interfaces/token.interface";
import bcrypt from "bcrypt";


export class UsersService {
    public static async createUser(username: string, password: string): Promise<TokenPayload>  {
        const existingUser = await UserModels.findUserByUsername(username);
        if (existingUser) {
            throw new UnauthorizedError("Username already exists");
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        const users = await UserModels.createUser({ username, password: encryptedPassword } as IUsers);
        const token = generateAuthTokens(users.id);
        return token;
    }

    public static async loginUser(username: string, password: string): Promise<TokenPayload> {
        const user = await UserModels.findUserByUsername(username);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new UnauthorizedError("Invalid password");
        }
        const token = generateAuthTokens(user.id);
        return token;
    }

    public static async deleteUser(user: string): Promise<void> {
        const userId = await UserModels.findUserById(user as string);
        if (!userId) {
            throw new NotFoundError("User not found");
        }
        await UserModels.deleteUser(user as string);
    }

    public static async verifyUser(user: string): Promise<IUsers> {
        const userId = await UserModels.findUserById(user as string);
        if (!userId) {
            throw new NotFoundError("User not found");
        }
        return userId;
    }
}
