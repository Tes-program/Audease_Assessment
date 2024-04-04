import { BlogModels } from "./blog.model";
import { IBlogs } from "../../utils/interfaces/blogs.interface";
import { NotFoundError } from "../../shared/error";
import { UserModels } from "../users/users.model";

export class BlogService {
  public static async createBlog(userId : string, blog: IBlogs): Promise<Partial<IBlogs>> {
    const user = await UserModels.findUserById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const blogs = await BlogModels.createBlog(blog, userId);
    return blogs;
  }

  public static async findBlogById(id: string): Promise<IBlogs> {
    const blog = await BlogModels.findBlogById(id);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }
    return blog;
  }

  public static async findBlogByAuthorId(author_id: string): Promise<IBlogs> {
    const blog = await BlogModels.findBlogByAuthorId(author_id);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }
    return blog;
  }

  public static async findAllBlogs(): Promise<IBlogs[]> {
    const blogs = await BlogModels.findAllBlogs();
    return blogs;
  }

  public static async updateBlogById(
    id: string,
    blog: IBlogs
  ): Promise<IBlogs> {
    const blogs = await BlogModels.updateBlogById(id, blog);
    return blogs;
  }

    public static async deleteBlogById(id: string): Promise<void> {
        await BlogModels.deleteBlogById(id);
    }
}
