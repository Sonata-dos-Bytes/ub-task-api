import { Request, Response, NextFunction } from 'express';
import { CustomError } from './error_types/CustomError';
import { failure } from '@utils/response';
import { logger } from '@config/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(failure(err.message));
  }
  
  logger.error('Internal Server Error', { error: err });
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
}
