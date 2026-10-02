const path = require('node:path');
process.loadEnvFile(path.join(__dirname, '.env'));
const express = require('express');
const helmet = require('helmet');
const { version } = require('./package.json');
const { DOMAIN, NODE_ENV, PORT } = process.env;
const isProd = NODE_ENV === 'production';

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const logger = require('./middlewares/morgan.js');
const HttpError = require('./utils/httpError.js');

// Create an Express app
const app = express();

// Configure the app
if (isProd) app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.domain = DOMAIN;
app.locals.version = version;

// Use middlewares
app.use(helmet({
	crossOriginResourcePolicy: false,
	contentSecurityPolicy: {
		directives: {
			scriptSrc: ['\'self\'', 'https://cdn.sefinek.net', 'https://static.cloudflareinsights.com'],
			styleSrc: ['\'self\'', 'https://cdn.sefinek.net', 'https://fonts.googleapis.com'],
			fontSrc: ['\'self\'', 'https://fonts.gstatic.com'],
			imgSrc: ['\'self\'', 'data:', 'https:'],
			connectSrc: ['\'self\'', 'https://cloudflareinsights.com'],
			upgradeInsecureRequests: isProd ? [] : null,
		},
	},
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
if (isProd) app.use(require('./middlewares/ratelimit.js'));
app.use(timeout());


// Routes
const IndexRouter = require('./routes/Index.js');
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
