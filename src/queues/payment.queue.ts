import { createQueue } from './connection';

export const paymentQueue = createQueue('payment');