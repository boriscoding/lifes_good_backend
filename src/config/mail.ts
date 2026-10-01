import { env } from './index';

export const mailConfig = {
host: env.SMTP_HOST,
port: env.SMTP_PORT,
secure: env.SMTP_SECURE,

auth: {
user: env.SMTP_USER,
pass: env.SMTP_PASS,
},

from: {
name: env.SMTP_FROM_NAME,
address: env.SMTP_FROM_EMAIL,
},

pool: true,
maxConnections: 5,
maxMessages: 100,
rateDelta: 1000,
rateLimit: 5,
} satisfies {
host: string;
port: number;
secure: boolean;

auth: {
user: string;
pass: string;
};

from: {
name: string;
address: string;
};

pool: boolean;
maxConnections: number;
maxMessages: number;
rateDelta: number;
rateLimit: number;
};
