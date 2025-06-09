import dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const TTL_CACHE   = Number(process.env.TTL_CACHE) || 600;
