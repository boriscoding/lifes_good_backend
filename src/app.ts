import express, { Request, Response } from 'express';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors.middleware';
import { requestLogger } from './middleware/logging.middleware';
import { sanitizeBody } from './middleware/sanitize.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import routes from './routes';
import { apiLimiter } from './middleware/rateLimit.middleware';

const app = express();

// Appliquer le rate limiter sur toutes les routes API
app.use('/api', apiLimiter); 

// Configuration de Helmet pour autoriser le chargement d'images Cross-Origin
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(corsMiddleware);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(morgan('dev'));
app.use(requestLogger);

app.use(sanitizeBody);

// Sert les fichiers uploadés (images/documents des biens) en statique.
// En-têtes CORP explicites ajoutés pour autoriser le navigateur (ex: React sur :3000) à afficher l'image
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, '../uploads'))
);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ==========================================
app.use(routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;