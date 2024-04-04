import Joi from "joi";

export const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export const deleteBlogParamSchema = Joi.object({
    id: Joi.string().required(),
});

export const getBlogParamSchema = Joi.object({
    id: Joi.string().required(),
});

