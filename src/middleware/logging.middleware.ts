import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { v4 as uuidv4 } from 'uuid';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = uuidv4();
  (req as any).requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Requete HTTP', {
      requestId,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
};