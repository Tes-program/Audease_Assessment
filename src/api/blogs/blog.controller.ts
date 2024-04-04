import { BlogService } from "./blog.service";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
    user?: { userId: string };
  }

export class BlogController {
    public static async createBlog(req: AuthenticatedRequest, res: Response) {
        const userId = req.user?.userId as string;
        try {
            const { title, content } = req.body;
            const blog = await BlogService.createBlog(userId, { title, content });
            res.status(201).json(blog);
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async findBlogById(req: Request, res: Response) {
        try {
            const blog = await BlogService.findBlogById(req.params.id);
            res.status(200).json(blog);
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async findBlogByAuthorId(req: Request, res: Response) {
        try {
            const blog = await BlogService.findBlogByAuthorId(req.params.author_id);
            res.status(200).json(blog);
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async findAllBlogs(req: Request, res: Response) {
        try {
            const blogs = await BlogService.findAllBlogs();
            res.status(200).json(blogs);
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async updateBlogById(req: AuthenticatedRequest, res: Response) {
        try {
            const blog = await BlogService.updateBlogById(req.params.id, req.body);
            res.status(200).json(blog);
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }

    public static async deleteBlogById(req: AuthenticatedRequest, res: Response) {
        try {
            await BlogService.deleteBlogById(req.params.id);
            res.status(204).json();
        } catch (error: any) {
            res.status(error.httpCode || 500).json({ error: error.message });
        }
    }
}