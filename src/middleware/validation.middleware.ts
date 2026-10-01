import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { ObjectSchema } from 'joi';
import { ApiResponse } from '../types/controllers.types';

type ValidationSchema = ZodType | ObjectSchema;

export const validate = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Zod
      if ('safeParse' in schema) {
        // Détecte si le schéma Zod attend un wrapper { body: ... }
        const hasBodyWrapper =
          'shape' in schema &&
          typeof (schema as any).shape === 'object' &&
          'body' in (schema as any).shape;

        const targetData = hasBodyWrapper
          ? { body: req.body, query: req.query, params: req.params }
          : req.body;

        const result = schema.safeParse(targetData);

        if (!result.success) {
          const errors = result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          }));

          const response: ApiResponse = {
            success: false,
            message: 'Erreur de validation',
            data: { errors },
          };

          res.status(400).json(response);
          return;
        }

        // Extrait le sous-objet body si le schéma utilisait un wrapper
        req.body = hasBodyWrapper && result.data ? (result.data as any).body : result.data;
        next();
        return;
      }

      // Joi
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));

        const response: ApiResponse = {
          success: false,
          message: 'Erreur de validation',
          data: { errors },
        };

        res.status(400).json(response);
        return;
      }

      req.body = value;
      next();
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Erreur de validation',
      };

      res.status(500).json(response);
    }
  };
};

export const validateQuery = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Zod
      if ('safeParse' in schema) {
        const result = schema.safeParse(req.query);

        if (!result.success) {
          const errors = result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          }));

          const response: ApiResponse = {
            success: false,
            message: 'Erreur de validation des paramètres',
            data: { errors },
          };

          res.status(400).json(response);
          return;
        }

        next();
        return;
      }

      // Joi
      const { error } = schema.validate(req.query, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));

        const response: ApiResponse = {
          success: false,
          message: 'Erreur de validation des paramètres',
          data: { errors },
        };

        res.status(400).json(response);
        return;
      }

      next();
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: 'Erreur de validation',
      };

      res.status(500).json(response);
    }
  };
};