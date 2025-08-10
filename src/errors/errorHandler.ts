import { Request, Response, NextFunction } from 'express';
import { CustomError } from './error_types/CustomError.js';
import { failure } from '../utils/response.js'; 
import { logger } from '../config/logger.js'; 
import { z } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof z.ZodError) {
    return res.status(400).json(failure('Validation Error', err.errors.map(issue => issue.message)));
  }
  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(failure(err.message, err.description));
  }
  
  logger.error({ error: err }, 'Internal Server Error');
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
}
