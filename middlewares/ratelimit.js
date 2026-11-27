import createRateLimit from '../global/middlewares/rateLimit.js';
import HttpError from '../utils/httpError.js';

export default createRateLimit({ windowMs: 40 * 1000, limit: 52, prefix: 'mcpl-docs:ratelimit:global:', handler: (req, res) => HttpError(res, 429) });
