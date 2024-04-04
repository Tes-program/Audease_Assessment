import { IUsers } from "../../utils/interfaces/users.interface";
import { db } from "../../database/index";


export class UserModels {
    static tableName = 'users';

    public static db = () => db<IUsers>(UserModels.tableName);

    public static async findUserByUsername(username: string): Promise<IUsers | undefined> {
        return this.db().where({ username }).first();
    }

    public static async createUser(user: IUsers): Promise<IUsers> {
        return this.db().insert(user).returning('id');
    }

    public static async findUserById(id: string): Promise<IUsers | undefined> {
        return (await this.db().where({ id }).limit(1))[0];
    }

    public static async deleteUser(id: string): Promise<void> {
        return this.db().where({ id }).del();
    }
}
