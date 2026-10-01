import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from './index';
import path from 'path';

// Masque les donnees sensibles dans les logs
const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'cookie', 'pin', 'apiKey'];

const sanitizeMeta = winston.format((info) => {
  const meta = info;
  const str = JSON.stringify(meta);
  let sanitized = str;

  sensitiveKeys.forEach((key) => {
    const regex = new RegExp(`"${key}":\\s*"[^"]*"`, 'gi');
    sanitized = sanitized.replace(regex, `"${key}":"***MASQUE***"`);
  });

  return JSON.parse(sanitized);
});

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  sanitizeMeta(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `[${timestamp}] ${level}: ${message} ${metaStr}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: env.NODE_ENV === 'production' ? logFormat : consoleFormat,
    level: env.LOG_LEVEL,
  }),
];

// Fichiers de logs en production uniquement
if (env.NODE_ENV === 'production') {
  transports.push(
    new DailyRotateFile({
      filename: path.join(env.LOG_DIR, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'info',
      format: logFormat,
    }),
    new DailyRotateFile({
      filename: path.join(env.LOG_DIR, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
      format: logFormat,
    })
  );
}

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  defaultMeta: { service: 'liifeisgood-api' },
  transports,
  // Ne quitte pas le processus sur une erreur de log
  exitOnError: false,
});