import { cache } from '../config/cache';

export function getCached<T>(key: string): T | undefined {
  return cache.get<T>(key);
}
