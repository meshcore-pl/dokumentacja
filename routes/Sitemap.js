import { Router } from 'express';
import { createSitemap } from '../utils/sitemap.js';
import { getState } from '../utils/docs.js';

const router = Router();

router.get('/sitemap.xml', createSitemap(() => getState().navPages.map(({ slug, date }) => ({ loc: slug ? `/${slug}` : '/', lastmod: date }))));

export default router;
