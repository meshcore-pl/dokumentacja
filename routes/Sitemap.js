const router = require('express').Router();
const { getState } = require('../utils/docs.js');

const isProd = process.env.NODE_ENV === 'production';

const escapeXml = str => str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&apos;' })[c]);

const buildSitemap = domain => {
	const urls = getState().navPages.map(page => {
		const lastmod = page.date ? `<lastmod>${page.date.toISOString()}</lastmod>` : '';
		return `<url><loc>${escapeXml(domain + (page.slug ? `/${page.slug}` : '/'))}</loc>${lastmod}</url>`;
	});

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
};

let cached;
const getSitemap = domain => {
	if (!isProd) return buildSitemap(domain);
	return cached ??= buildSitemap(domain);
};

router.get('/sitemap.xml', (req, res) => {
	res.set({
		'Content-Type': 'application/xml; charset=utf-8',
		'Cache-Control': 'public, max-age=3600',
		'Content-Security-Policy': 'default-src \'none\'; style-src \'unsafe-inline\'; script-src \'unsafe-inline\'; img-src data:; connect-src \'self\'',
	});
	res.send(getSitemap(req.app.locals.domain));
});

module.exports = router;
