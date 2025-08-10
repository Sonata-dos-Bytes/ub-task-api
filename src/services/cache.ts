import { cache } from '../config/cache.js';
export function getCached<T>(key: string): T | undefined {
  return cache.get<T>(key);
}
