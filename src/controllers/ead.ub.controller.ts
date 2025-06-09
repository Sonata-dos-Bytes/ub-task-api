import { Request, Response, NextFunction } from 'express';
import {
  fetchUbProfile,
  fetchUbTasks,
} from '../scrapers/ead.ub.scraper';
import { success, failure } from '@utils/response';
import { CustomError } from '@errors/error_types/CustomError';
import { z } from 'zod';
import { profileSchema } from '@schemas/ead.ub.schema';
import { cache } from '@config/cache';
import { logger } from '@config/logger';

/**
 * POST ub/ead-ub/profile
 * Body: { login: string, password: string }
 */
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { login, password } = profileSchema.parse(req.body);
    logger.info(`Fetching profile for user: ${login}`);

    const profile = await fetchUbProfile(login, password);
    return res.json(success('Profile fetched successfully', profile));
  } catch (err) {
    return next(err);
  }
}

/**
 * POST ub/ead-ub/tasks
 * Body: { login: string, password: string }
 */

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { login, password } = profileSchema.parse(req.body);
    logger.info(`Fetching tasks for user: ${login}`);

    const cacheKey = `tasks:${login}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json(success('Tasks fetched from cache', cached));
    }

    const tasks = await fetchUbTasks(login, password);
    cache.set(cacheKey, tasks);
    return res.json(success('Tasks fetched successfully', tasks));
  } catch (err) {
    return next(err);
  }
}