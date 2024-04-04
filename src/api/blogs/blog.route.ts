import { BlogController } from "./blog.controller";
import express from "express";
import { validateBody } from "../../modules/middleware";
import {
  createBlogSchema,
  updateBlogSchema,
  deleteBlogParamSchema,
  getBlogParamSchema,
} from "./blog.validation";


const blogRouter = express.Router();

blogRouter.post("/post", validateBody(createBlogSchema), BlogController.createBlog);
blogRouter.get("/", BlogController.findAllBlogs);
blogRouter.get("/post/:id", validateBody(getBlogParamSchema), BlogController.findBlogById);
blogRouter.get("/author/:author_id", BlogController.findBlogByAuthorId);
blogRouter.put("/post/:id", validateBody(updateBlogSchema), BlogController.updateBlogById);
blogRouter.delete("/post/:id", validateBody(deleteBlogParamSchema), BlogController.deleteBlogById);

export { blogRouter };