
import { auditLogRepository } from '../repositories/auditLog.repository';

export const auditLogService = {
  async list(options?: {
    page?: number | string;
    limit?: number | string;
  }) {
    return auditLogRepository.list(options);
  },

  async log(data: {
    userId?: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  }) {
    return auditLogRepository.create(data);
  },
};

