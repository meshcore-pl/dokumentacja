import { Router } from 'express';
import HttpError from '../utils/httpError.js';
import { getState } from '../utils/docs.js';

const router = Router();

const NO_NEIGHBOURS = { prev: null, next: null };

const renderPage = (req, res, slug) => {
	const { bySlug, navPages, neighbours } = getState();
	const page = bySlug.get(slug);
	if (!page || page.hidden) return HttpError(res, 404);

	const { prev, next } = neighbours.get(page.slug) || NO_NEIGHBOURS;

	res.vary('X-Docs-Ajax');
	if (req.get('X-Docs-Ajax')) {
		return res.json({
			slug: page.slug,
			title: page.title,
			description: page.description,
			html: page.html,
			toc: page.toc,
			updatedAt: page.updatedAt,
			prev,
			next,
		});
	}

	res.render('page.ejs', { navPages, page, prev, next });
};

router.get('/', (req, res) => renderPage(req, res, ''));

router.get('/api/search', (req, res) => res.json(getState().searchIndex));

router.get('/:slug', (req, res) => renderPage(req, res, req.params.slug));

export default router;
