import { Request, Response, NextFunction } from 'express';

/**
 * Middleware pour intercepter les routes non définies (404)
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(404).json({
    status: 'fail',
    message: `Route non trouvée : ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Middleware global de gestion des erreurs
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || err.status || 500;

  // Erreur de validation Zod
  if (err.name === 'ZodError') {
    return res.status(statusCode === 500 ? 400 : statusCode).json({
      status: 'fail',
      message: 'Erreur de validation',
      errors: err.errors, // Détail des champs invalides
    });
  }

  // Formatage global des autres erreurs
  return res.status(statusCode).json({
    status: 'fail',
    message: err.message || 'Une erreur est survenue',
    errors: err.errors || null,
  });
};