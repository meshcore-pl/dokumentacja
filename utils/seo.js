import { createSeo, ORGANIZATIONS } from '../global/utils/seo.js';

const site = { name: 'MeshCore Docs', description: 'Nieoficjalna dokumentacja MeshCore po polsku.' };
const ORIGINAL_AUTHOR = { '@type': 'Organization', name: 'MeshCore', url: 'https://meshcore.io' };

export default (domain, { title, description, canonical, noindex, breadcrumbs, articleTitle, datePublished, dateModified, sourceUrl }) => createSeo({
	domain,
	organization: ORGANIZATIONS.pl,
	site,
	title,
	description,
	canonical,
	noindex,
	breadcrumbs,
	article: datePublished ? {
		title: articleTitle,
		datePublished,
		dateModified,
		sourceUrl,
		sourceType: 'TechArticle',
		author: sourceUrl ? ORIGINAL_AUTHOR : undefined,
	} : undefined,
});
