import { IBlogs } from "../../utils/interfaces/blogs.interface";
import { db } from "../../database/index";


export class BlogModels {
    static tableName = 'blog_posts';

    public static db = () => db<IBlogs>(BlogModels.tableName);

    public static async createBlog(blog: Partial<IBlogs>, author_id: string): Promise<IBlogs> {
        const [id] = await this.db().insert(blog).insert({author_id: author_id}).returning('*');
        return id;
    }

    public static async findBlogById(id: string): Promise<IBlogs | undefined> {
        return this.db().where({ id }).first();
    }

    public static async findBlogByAuthorId(author_id: string): Promise<IBlogs | undefined> {
        return this.db().where({ author_id }).first();
    }

    public static async findAllBlogs(): Promise<IBlogs[]> {
        return this.db().select('*');
    }

    public static async updateBlogById(id: string, blog: IBlogs): Promise<IBlogs> {
        const [blogs] = await this.db().where({ id }).update(blog).returning('*');
        return blogs;
    }

    public static async deleteBlogById(id: string): Promise<void> {
        await this.db().where({ id }).delete();
    }
}