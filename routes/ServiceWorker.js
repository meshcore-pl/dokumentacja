const router = require('express').Router();
const { getScript, ENDPOINTS } = require('../services/serviceWorker/index.js');

router.get(ENDPOINTS.serviceWorker, async (req, res, next) => {
	try {
		const script = await getScript();
		res.set({
			'Content-Type': 'text/javascript; charset=utf-8',
			'Cache-Control': 'no-cache',
			'Content-Security-Policy': 'default-src \'none\'; connect-src \'self\' https:',
		});
		res.send(script);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
