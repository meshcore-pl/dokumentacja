const router = require('express').Router();
const HttpError = require('../utils/httpError.js');
const docs = require('../utils/docs.js');

const renderPage = (req, res, page) => {
	const navPages = docs.navPages;
	const idx = navPages.findIndex(p => p.slug === page.slug);
	const prev = idx > 0 ? navPages[idx - 1] : null;
	const next = idx !== -1 && idx < navPages.length - 1 ? navPages[idx + 1] : null;

	if (req.get('X-Docs-Ajax')) {
		return res.json({
			slug: page.slug,
			title: page.title,
			description: page.description,
			html: page.html,
			toc: page.toc,
			updatedAt: page.updatedAt,
			prev: prev ? { slug: prev.slug, title: prev.title } : null,
			next: next ? { slug: next.slug, title: next.title } : null,
		});
	}

	res.render('page.ejs', { navPages, page, prev, next });
};

router.get('/', (req, res) => {
	const page = docs.getPage('');
	if (!page) return HttpError(res, 404);
	renderPage(req, res, page);
});

router.get('/api/search', (req, res) => {
	res.json(docs.navPages.map(p => ({ url: p.slug ? `/${p.slug}` : '/', title: p.title, headings: p.toc.map(h => ({ id: h.id, text: h.text })) })));
});

router.get('/:slug', (req, res) => {
	const page = docs.getPage(req.params.slug);
	if (!page || page.hidden) return HttpError(res, 404);
	renderPage(req, res, page);
});

module.exports = router;
