import { Router } from 'express';
import { createSitemap } from '../global/utils/sitemap.js';
import { createRobots } from '../global/utils/robots.js';
import { getState } from '../utils/docs.js';

const router = Router();

router.get('/sitemap.xml', createSitemap(() => getState().navPages.map(({ slug, date }) => ({ loc: slug ? `/${slug}` : '/', lastmod: date }))));
router.get('/robots.txt', createRobots());

export default router;
