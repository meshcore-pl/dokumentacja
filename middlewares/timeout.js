import HttpError from '../utils/httpError.js';

const TIMEOUT = 15000;
const LATE_METHODS = ['write', 'setHeaders', 'send', 'json', 'end'];

export default () => (req, res, next) => {
	req.socket.setTimeout(TIMEOUT);

	res.once('timeout', socket => {
		if (res.headersSent) return;
		HttpError(res, 503);
		for (const method of LATE_METHODS) res[method] = () => res;
		res.once('finish', () => socket.destroy());
	});

	next();
};
