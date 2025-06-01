import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      destination: 1,
      colorize: true,
      singleLine: true,
      translateTime: 'SYS:standard'
    }
  }
});
