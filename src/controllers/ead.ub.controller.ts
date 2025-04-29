import { Request, Response, NextFunction } from 'express';
import {
  fetchUbProfile,
} from '../scrapers/ead.ub.scraper';
import { success, failure } from '@utils/response';
import { CustomError } from '@errors/error_types/CustomError';
import { z } from 'zod';
import { profileSchema } from '@schemas/ead.ub.schema';

/**
 * POST /ub/profile
 * Body: { login: string, password: string }
 */
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { login, password } = profileSchema.parse(req.body);
    const profile = await fetchUbProfile(login, password);
    return res.json(success('Profile fetched successfully', profile));
  } catch (err) {
    return next(err);
  }
}