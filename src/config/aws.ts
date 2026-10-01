import { env } from './index';

export const awsConfig = {
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
  },
  s3: {
    bucket: env.AWS_S3_BUCKET,
    endpoint: env.AWS_S3_ENDPOINT, // Pour MinIO ou autres S3-compatibles
    forcePathStyle: !!env.AWS_S3_ENDPOINT, // true si endpoint personnalise
  },
};