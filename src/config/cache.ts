import NodeCache from 'node-cache';
import { TTL_CACHE } from './index.js'; 

export const cache = new NodeCache({ stdTTL: TTL_CACHE, checkperiod: TTL_CACHE * 0.2 });
