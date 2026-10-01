
import {
  Contract,
  ContractStatus,
  ContractType,
} from '../../generated/prisma/client';

export interface IContractRepository {
  findById(id: string): Promise<Contract | null>;

  create(data: {
    propertyId: string;
    tenantId: string;
    type: ContractType;
    startDate: Date;
    endDate: Date;
    monthlyRent: number;
    depositAmount: number;
    terms: string;
    clauses?: string | null;
    status?: ContractStatus;
    signedAt?: Date | null;
    pdfUrl?: string | null;
  }): Promise<Contract>;

  update(
    id: string,
    data: {
      propertyId?: string;
      tenantId?: string;
      type?: ContractType;
      startDate?: Date;
      endDate?: Date;
      monthlyRent?: number;
      depositAmount?: number;
      terms?: string;
      clauses?: string | null;
      status?: ContractStatus;
      signedAt?: Date | null;
      pdfUrl?: string | null;
    },
  ): Promise<Contract | null>;

  list(options?: {
    propertyId?: string;
    tenantId?: string;
    type?: ContractType;
    status?: ContractStatus;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{
    data: Contract[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}

