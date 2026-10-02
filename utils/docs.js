const fs = require('node:fs');
const path = require('node:path');
const parseFrontmatter = require('frontmatter-md');
const { marked, assignHeadingIds, getHeadingId, getTocLabel, createRenderer } = require('./markdown.js');

const DOCS_DIR = path.join(__dirname, '../docs');
const stemToSlug = stem => stem.replace(/_/g, '-');

let state;

const build = () => {
	const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
	const slugOf = new Map(files.map(f => {
		const stem = f.slice(0, -3);
		return [stem, stem === 'index' ? '' : stemToSlug(stem)];
	}));

	const renderer = createRenderer(stem => slugOf.get(stem));

	const pages = files.map(file => {
		const stem = file.slice(0, -3);
		const raw = fs.readFileSync(path.join(DOCS_DIR, file), 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const tokens = marked.lexer(content);
		assignHeadingIds(tokens);

		const toc = tokens
			.filter(t => t.type === 'heading' && t.depth <= 3)
			.map(t => ({ id: getHeadingId(t), text: getTocLabel(t), level: t.depth }));

		return {
			slug: slugOf.get(stem),
			title: data.title || stem,
			navTitle: data.navTitle || data.title || stem,
			description: data.description || '',
			order: typeof data.order === 'number' ? data.order : 999,
			updatedAt: data.updatedAt || null,
			hidden: !!data.hidden,
			toc,
			html: marked.parser(tokens, { renderer }),
		};
	}).sort((a, b) => a.order - b.order);

	const navPages = pages.filter(p => !p.hidden);
	const toLink = p => (p ? { slug: p.slug, title: p.title } : null);
	const neighbours = new Map(navPages.map((p, i) => [p.slug, { prev: toLink(navPages[i - 1]), next: toLink(navPages[i + 1]) }]));

	state = {
		pages,
		navPages,
		bySlug: new Map(pages.map(p => [p.slug, p])),
		neighbours,
		searchIndex: navPages.map(p => ({ url: p.slug ? `/${p.slug}` : '/', title: p.title, headings: p.toc.map(h => ({ id: h.id, text: h.text })) })),
	};
};

build();

const getState = () => {
	if (process.env.NODE_ENV !== 'production') build();
	return state;
};

module.exports = { getState };
