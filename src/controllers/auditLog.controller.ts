import { Request, Response, NextFunction } from 'express';
import { auditLogService } from '../services/auditLog.service';
import { ApiResponse } from '../types/controllers.types';

export const listAuditLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const logs = await auditLogService.list(req.query);
    const response: ApiResponse = { success: true, message: 'Journaux d\'audit', data: logs };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};