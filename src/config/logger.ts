import pino from 'pino';
import { NODE_ENV } from './index.js';

const isProduction = NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(isProduction 
    ? {
        // Configuração para produção (sem pino-pretty)
        formatters: {
          level: (label) => ({ level: label }),
          log: (object) => object
        }
      } 
    : {
        // Configuração para desenvolvimento (com pino-pretty)
        transport: {
          target: 'pino-pretty',
          options: {
            destination: 1,
            colorize: true,
            singleLine: true,
            translateTime: 'SYS:standard'
          }
        }
      }
  )
});
