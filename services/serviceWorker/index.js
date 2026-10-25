const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { getState } = require('../../utils/docs.js');

const PUBLIC_DIR = path.join(__dirname, '../../public');
const TEMPLATE_PATH = path.join(__dirname, 'worker.js');
const PRECACHE_DIRS = ['css', 'js', 'logo'];
const EXTRA_FILES = ['favicon.ico', 'icons.svg', 'manifest.webmanifest'];
const EXCLUDED_RE = /\.(map|md|txt)$|(^|\/)LICENSE[^/]*$|\.LICENSE$/;

const ENDPOINTS = { serviceWorker: '/service-worker.js', search: '/api/search' };
const EXTERNAL_PRECACHE = [
	'https://cdn.sefinek.net/js/progressbar.js',
	'https://cdn.sefinek.net/js/console.js',
	'https://cdn.sefinek.net/css/code-viewer.css',
	'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap',
];

const isProd = process.env.NODE_ENV === 'production';

const walk = async dir => {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const nested = await Promise.all(entries.map(entry => {
		const fullPath = path.join(dir, entry.name);
		return entry.isDirectory() ? walk(fullPath) : [fullPath];
	}));
	return nested.flat();
};

const collectAssets = async () => {
	const files = [
		...(await Promise.all(PRECACHE_DIRS.map(dir => walk(path.join(PUBLIC_DIR, dir))))).flat(),
		...EXTRA_FILES.map(file => path.join(PUBLIC_DIR, file)),
	].filter(file => !EXCLUDED_RE.test(file.replaceAll('\\', '/')));

	const assets = await Promise.all(files.map(async file => {
		const { size, mtimeMs } = await fs.stat(file);
		const urlPath = '/' + path.relative(PUBLIC_DIR, file).replaceAll('\\', '/');
		return { urlPath: encodeURI(urlPath), signature: `${urlPath}:${size}:${mtimeMs}` };
	}));

	assets.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
	return assets;
};

const collectPages = () => {
	const { pages } = getState();
	const hash = crypto.createHash('sha1');
	for (const page of pages) hash.update(`${page.slug}\n${page.title}\n${page.html}\n`);

	return { paths: pages.map(page => page.slug ? `/${page.slug}` : '/'), hash: hash.digest('hex') };
};

const build = async () => {
	const [template, assets] = await Promise.all([fs.readFile(TEMPLATE_PATH, 'utf8'), collectAssets()]);
	const pages = collectPages();
	const version = crypto.createHash('sha1')
		.update(template)
		.update(pages.hash)
		.update(EXTERNAL_PRECACHE.join('\n'))
		.update(assets.map(a => a.signature).join('\n'))
		.digest('hex')
		.slice(0, 12);

	return template
		.replace('__VERSION__', version)
		.replace('/* __ENDPOINTS__ */', JSON.stringify(ENDPOINTS).slice(1, -1))
		.replace('/* __PAGE_PATHS__ */', JSON.stringify(pages.paths).slice(1, -1))
		.replace('/* __EXTERNAL_PRECACHE__ */', JSON.stringify(EXTERNAL_PRECACHE).slice(1, -1))
		.replace('/* __PRECACHE__ */', JSON.stringify(assets.map(a => a.urlPath)).slice(1, -1));
};

let cached;

const getScript = () => {
	if (!isProd) return build();
	return cached ??= build().catch(err => {
		cached = null;
		throw err;
	});
};

module.exports = { getScript, ENDPOINTS };
