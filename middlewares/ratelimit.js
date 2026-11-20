import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import RedisClient from '../global/services/redis.js';
import HttpError from '../utils/httpError.js';

const globalLimiter = rateLimit({
	windowMs: 40 * 1000,
	limit: 52,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	store: new RedisStore({ sendCommand: (...args) => RedisClient.sendCommand(args), prefix: 'mcpl-docs:ratelimit:global:' }),
	handler: (req, res) => HttpError(res, 429),
});

export default globalLimiter;
