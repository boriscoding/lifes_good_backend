
import {
  User,
  Role,
} from '../../generated/prisma/client';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  create(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    roleId: string;
    isActive?: boolean;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    lastLoginAt?: Date | null;
  }): Promise<User>;

  update(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      password?: string;
      roleId?: string;
      isActive?: boolean;
      emailVerified?: boolean;
      phoneVerified?: boolean;
      lastLoginAt?: Date | null;
    },
  ): Promise<User | null>;

  list(options?: {
    roleId?: string;
    isActive?: boolean;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: User[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}
