import Joi from 'joi';

export const createPublicationValidation = Joi.object({
  title: Joi.string().required().max(255),
  content: Joi.string().required(),
  excerpt: Joi.string().allow('').max(500),
  featuredImage: Joi.string().uri().allow(''),
  status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
  category: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
  authorId: Joi.string().uuid().required(),
});

export const updatePublicationValidation = Joi.object({
  title: Joi.string().max(255),
  content: Joi.string(),
  excerpt: Joi.string().allow('').max(500),
  featuredImage: Joi.string().uri().allow(''),
  status: Joi.string().valid('draft', 'published', 'archived'),
  category: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
});

export const publicationQueryValidation = Joi.object({
  status: Joi.string().valid('draft', 'published', 'archived'),
  category: Joi.string(),
  search: Joi.string(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});