import { Request, Response, NextFunction } from 'express';
import {
  fetchUbProfile,
} from '../scrapers/ead.ub.scraper';
import { CustomError } from '../errors/error_types/CustomError';

/**
 * POST /ub/profile
 * Body: { login: string, password: string }
 */
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { login, password } = req.body;
  if (!login || !password) {
    return next(new CustomError('Missing credentials', 'login and password are required', 400));
  }

  try {
    const profile = await fetchUbProfile(login, password);
    return res.json({ success: true, data: profile });
  } catch (err) {
    return next(err);
  }
}