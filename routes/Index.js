import { Router } from 'express';
import HttpError from '../utils/httpError.js';
import { getState } from '../utils/docs.js';
import buildSeo from '../utils/seo.js';

const router = Router();

const NO_NEIGHBOURS = { prev: null, next: null };

const renderPage = (req, res, slug) => {
	const { bySlug, navPages, neighbours } = getState();
	const page = bySlug.get(slug);
	if (!page || page.hidden) return HttpError(res, 404);

	const { prev, next } = neighbours.get(page.slug) || NO_NEIGHBOURS;

	const meta = {
		title: page.seoTitle || `${page.title} | MeshCore Docs`,
		description: page.description || `${page.title} - dokumentacja MeshCore.`,
		canonical: `/${page.slug}`,
		breadcrumbs: page.slug ? [{ name: 'Dokumentacja MeshCore', url: '/' }, { name: page.title, url: `/${page.slug}` }] : undefined,
		articleTitle: page.title,
		datePublished: page.createdAt?.toISOString(),
		dateModified: page.date?.toISOString(),
		sourceUrl: page.sourceUrl,
	};

	res.vary('X-Docs-Ajax');
	if (req.get('X-Docs-Ajax')) {
		return res.json({
			slug: page.slug,
			title: page.title,
			pageTitle: meta.title,
			description: meta.description,
			datePublished: meta.datePublished,
			dateModified: meta.dateModified,
			schema: buildSeo(req.app.locals.domain, meta).jsonLd,
			html: page.html,
			toc: page.toc,
			updatedAt: page.updatedAt,
			prev,
			next,
		});
	}

	res.render('page.ejs', { navPages, page, prev, next, meta });
};

router.get('/', (req, res) => renderPage(req, res, ''));

router.get('/api/search', (req, res) => res.json(getState().searchIndex));

router.get('/:slug', (req, res) => renderPage(req, res, req.params.slug));

export default router;
