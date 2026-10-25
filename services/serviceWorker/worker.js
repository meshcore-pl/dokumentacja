const VERSION = '__VERSION__';
const PRECACHE = new Set([/* __PRECACHE__ */]);

const STATIC_CACHE = `static-${VERSION}`;
const PAGES_CACHE = 'pages';
const API_CACHE = 'api';
const EXTERNAL_CACHE = 'external';
const KEEP_CACHES = [STATIC_CACHE, PAGES_CACHE, API_CACHE, EXTERNAL_CACHE];

const PAGE_PATHS = new Set([/* __PAGE_PATHS__ */]);
const ENDPOINTS = {/* __ENDPOINTS__ */};
const EXTERNAL_PRECACHE = [/* __EXTERNAL_PRECACHE__ */];
const NETWORK_TIMEOUT_MS = 5000;
const MAX_PAGES = 80;
const MAX_API = 20;
const MAX_EXTERNAL = 150;
const AJAX_HEADER = 'X-Docs-Ajax';
const EXTERNAL_DESTINATIONS = new Set(['style', 'script', 'font', 'image']);
const PASSTHROUGH_PATHS = new Set([ENDPOINTS.serviceWorker, '/robots.txt', '/sitemap.xml']);

const isCacheable = response => response.status === 200 || response.type === 'opaque';

const trimCache = async (cache, maxEntries) => {
	const keys = await cache.keys();
	await Promise.all(keys.slice(0, Math.max(0, keys.length - maxEntries)).map(key => cache.delete(key)));
};

const store = async (cacheName, request, response, maxEntries) => {
	const cache = await caches.open(cacheName);
	await cache.put(request, response);
	if (maxEntries) await trimCache(cache, maxEntries);
};

const fetchWithTimeout = (request, timeoutMs) => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
};

const networkFirst = async (event, request, cacheName, maxEntries, key = request) => {
	try {
		const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
		if (isCacheable(response)) {
			event.waitUntil(store(cacheName, key, response.clone(), maxEntries));
			return response;
		}

		return await caches.match(key, { cacheName, ignoreVary: true }) ?? response;
	} catch (err) {
		const cached = await caches.match(key, { cacheName, ignoreVary: true });
		if (cached) return cached;
		throw err;
	}
};

const pageKey = url => new Request(url.origin + url.pathname);

const ajaxKey = url => new Request(`${url.origin}${url.pathname}?docs-ajax=1`);

// A redirected response cannot be served for a navigation request, so it is stored as a plain copy
const unredirect = async response => response.redirected
	? new Response(await response.blob(), { status: response.status, statusText: response.statusText, headers: response.headers })
	: response;

const storePage = async (url, response) => {
	if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return;

	const plain = await unredirect(response);
	await store(PAGES_CACHE, pageKey(url), plain.clone(), MAX_PAGES);
	if (response.redirected) await store(PAGES_CACHE, pageKey(new URL(response.url)), plain.clone(), MAX_PAGES);
};

const cachedPage = async url => await caches.match(pageKey(url), { cacheName: PAGES_CACHE, ignoreVary: true })
	?? caches.match(new Request(`${url.origin}/`), { cacheName: PAGES_CACHE, ignoreVary: true });

// Promise.race instead of AbortSignal: re-creating a navigate request with init changes its mode and redirect handling.
const handleNavigation = async (event, request, url) => {
	const network = (async () => {
		const response = await event.preloadResponse ?? await fetch(request);
		event.waitUntil(storePage(url, response.clone()));
		return response;
	})();
	event.waitUntil(network.catch(() => null));

	let timer;
	const timeout = new Promise(resolve => {
		timer = setTimeout(resolve, NETWORK_TIMEOUT_MS);
	});

	try {
		const response = await Promise.race([network, timeout]);
		if (response && response.status < 500) return response;
		return await cachedPage(url) ?? response ?? await network;
	} catch {
		return await cachedPage(url) ?? new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
	} finally {
		clearTimeout(timer);
	}
};

const precacheAll = async (cacheName, requests) => {
	const cache = await caches.open(cacheName);
	await Promise.all(requests.map(async ([key, input, init]) => {
		try {
			const response = await fetch(input, init);
			if (response.ok) await cache.put(key, await unredirect(response));
		} catch (err) {
			console.warn('Could not precache', input, err);
		}
	}));
};

self.addEventListener('install', event => {
	event.waitUntil((async () => {
		const staticCache = await caches.open(STATIC_CACHE);
		await staticCache.addAll([...PRECACHE].map(path => new Request(path, { cache: 'reload' })));

		const pageUrls = [...PAGE_PATHS].map(path => new URL(path, self.location.origin));
		await Promise.all([
			precacheAll(PAGES_CACHE, pageUrls.flatMap(url => [
				[pageKey(url), url.pathname, { cache: 'reload' }],
				[ajaxKey(url), url.pathname, { cache: 'reload', headers: { [AJAX_HEADER]: '1' } }],
			])),
			precacheAll(API_CACHE, [[ENDPOINTS.search, ENDPOINTS.search, { cache: 'reload' }]]),
			precacheAll(EXTERNAL_CACHE, EXTERNAL_PRECACHE.map(url => [url, url])),
		]);

		await self.skipWaiting();
	})());
});

self.addEventListener('activate', event => {
	event.waitUntil((async () => {
		for (const name of await caches.keys()) {
			if (!KEEP_CACHES.includes(name)) await caches.delete(name);
		}
		await self.registration.navigationPreload?.enable();
		await self.clients.claim();
	})());
});

self.addEventListener('fetch', event => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	const respond = handler => event.respondWith(handler().catch(() => Response.error()));

	if (url.origin !== self.location.origin) {
		if (url.protocol === 'https:' && EXTERNAL_DESTINATIONS.has(request.destination)) {
			respond(() => networkFirst(event, request, EXTERNAL_CACHE, MAX_EXTERNAL));
		}
		return;
	}

	if (PASSTHROUGH_PATHS.has(url.pathname)) return;

	if (PRECACHE.has(url.pathname)) respond(() => networkFirst(event, request, STATIC_CACHE));
	else if (url.pathname === ENDPOINTS.search) respond(() => networkFirst(event, request, API_CACHE, MAX_API));
	else if (request.headers.has(AJAX_HEADER)) respond(() => networkFirst(event, request, PAGES_CACHE, MAX_PAGES, ajaxKey(url)));
	else if (request.mode === 'navigate' || PAGE_PATHS.has(url.pathname)) respond(() => handleNavigation(event, request, url));
});
