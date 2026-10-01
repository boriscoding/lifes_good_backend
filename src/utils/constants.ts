export const ROLES = {
  VISITOR: 'visitor',
  CLIENT: 'client',
  RECEPTION: 'reception',
  MANAGER: 'manager',
  ADMIN: 'admin',
} as const;

export const PERMISSIONS = {
  READ_PROPERTIES: 'read:properties',
  CREATE_BOOKING: 'create:booking',
  MANAGE_BOOKINGS: 'manage:bookings',
  MANAGE_PAYMENTS: 'manage:payments',
  MANAGE_USERS: 'manage:users',
  VIEW_DASHBOARD: 'view:dashboard',
  MANAGE_PROMOTIONS: 'manage:promotions',
  MANAGE_CONTRACTS: 'manage:contracts',
} as const;

export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const CURRENCIES = {
  XAF: 'XAF',
  EUR: 'EUR',
  USD: 'USD',
} as const;