import { Router } from 'express';
import HttpError from '../utils/httpError.js';
import { getScript, ENDPOINTS, OFFLINE_HEADER } from '../services/serviceWorker/index.js';

const router = Router();

router.get(ENDPOINTS.serviceWorker, async (req, res, next) => {
	try {
		const script = await getScript();
		res.set({
			'Content-Type': 'text/javascript; charset=utf-8',
			'Cache-Control': 'no-cache',
			'Content-Security-Policy': `default-src 'none'; connect-src 'self' ${req.app.locals.cdn} https:`,
		});
		res.send(script);
	} catch (err) {
		next(err);
	}
});

router.get(ENDPOINTS.offline, (req, res) => {
	res.set('Cache-Control', 'no-store');
	if (req.get(OFFLINE_HEADER) !== '1') return HttpError(res, 404);
	res.render('offline.ejs');
});

export default router;
