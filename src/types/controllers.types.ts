import { Request, Response, NextFunction } from 'express';

export type ControllerFn = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  errors?: Record<string, string[]>;
}