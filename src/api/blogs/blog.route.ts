import { BlogController } from "./blog.controller";
import express from "express";
import { validateBody } from "../../modules/middleware";
import {
  createBlogSchema,
  updateBlogSchema,
} from "./blog.validation";


const blogRouter = express.Router();
const blog = express.Router();

blogRouter.post("/post", validateBody(createBlogSchema), BlogController.createBlog);
blog.get("/", BlogController.findAllBlogs);
blogRouter.get("/post/:id", BlogController.findBlogById);
blogRouter.get("/author", BlogController.findBlogByAuthorId);
blogRouter.put("/post/:id", validateBody(updateBlogSchema), BlogController.updateBlogById);
blogRouter.delete("/post/:id", BlogController.deleteBlogById);

export { blogRouter, blog };