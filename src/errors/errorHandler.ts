import { Request, Response, NextFunction } from 'express';
import { CustomError } from './error_types/CustomError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message, description: err.description });
  }
  
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
