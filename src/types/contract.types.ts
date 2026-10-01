export type ContractStatus = 'draft' | 'sent' | 'signed' | 'active' | 'terminated' | 'expired';

export type ContractType = 'short_term' | 'long_term';

export interface ContractFilters {
  status?: ContractStatus;
  tenantId?: string;
  propertyId?: string;
  startDateFrom?: Date;
  startDateTo?: Date;
}