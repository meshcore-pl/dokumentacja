import './loadEnv.js';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import helmet from 'helmet';

// Middleware imports
import timeout from './middlewares/timeout.js';
import logger from './global/middlewares/morgan.js';
import limiter from './middlewares/ratelimit.js';
import HttpError from './utils/httpError.js';

// Routes
import ServiceWorkerRouter from './routes/ServiceWorker.js';
import SitemapRouter from './routes/Sitemap.js';
import IndexRouter from './routes/Index.js';

const { version } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const { DOMAIN, NODE_ENV, PORT, CDN_SEFINEK_URL } = process.env;
const isProd = NODE_ENV === 'production';
if (!CDN_SEFINEK_URL) throw new Error('Missing required environment variable: CDN_SEFINEK_URL');

// Create an Express app
const app = express();

// Configure the app
if (isProd) app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.locals.domain = DOMAIN;
app.locals.cdn = CDN_SEFINEK_URL;
app.locals.version = version;

// Use middlewares
app.use(helmet({
	crossOriginResourcePolicy: false,
	contentSecurityPolicy: {
		directives: {
			scriptSrc: ['\'self\'', CDN_SEFINEK_URL, 'https://static.cloudflareinsights.com'],
			styleSrc: ['\'self\'', CDN_SEFINEK_URL, 'https://fonts.googleapis.com'],
			fontSrc: ['\'self\'', 'https://fonts.gstatic.com'],
			imgSrc: ['\'self\'', 'data:', 'https:'],
			connectSrc: ['\'self\'', 'https://cloudflareinsights.com'],
			upgradeInsecureRequests: isProd ? [] : null,
		},
	},
}));
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(logger);
if (isProd) app.use(limiter);
app.use(timeout());


// Routes
app.use(ServiceWorkerRouter);
app.use(SitemapRouter);
app.use(IndexRouter);


// Error handling
app.use((req, res) => HttpError(res, 404));
app.use((err, req, res, next) => {
	if (res.headersSent) return next(err);
	const status = err.status >= 400 && err.status < 600 ? err.status : 500;
	HttpError(res, status, status >= 500 ? err : null);
});


// Start the server
app.listen(PORT, () => process.send ? process.send('ready') : console.log(`Server running at ${DOMAIN}:${PORT}`));
