const fs = require('node:fs');
const path = require('node:path');
const parseFrontmatter = require('frontmatter-md');
const { marked, assignHeadingIds, getHeadingId, createRenderer } = require('./markdown.js');

const DOCS_DIR = path.join(__dirname, '../docs');
const stemToSlug = stem => stem.replace(/_/g, '-');

let pages, bySlug;

const build = () => {
	const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
	const slugOf = new Map(files.map(f => {
		const stem = f.slice(0, -3);
		return [stem, stem === 'index' ? '' : stemToSlug(stem)];
	}));

	const renderer = createRenderer(stem => slugOf.get(stem));

	const list = files.map(file => {
		const stem = file.slice(0, -3);
		const raw = fs.readFileSync(path.join(DOCS_DIR, file), 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const tokens = marked.lexer(content);
		assignHeadingIds(tokens);

		const toc = tokens
			.filter(t => t.type === 'heading' && t.depth <= 3)
			.map(t => ({ id: getHeadingId(t), text: t.text, level: t.depth }));

		return {
			slug: slugOf.get(stem),
			title: data.title || stem,
			description: data.description || '',
			order: typeof data.order === 'number' ? data.order : 999,
			updatedAt: data.updatedAt || null,
			hidden: !!data.hidden,
			toc,
			html: marked.parser(tokens, { renderer }),
		};
	}).sort((a, b) => a.order - b.order);

	pages = list;
	bySlug = new Map(list.map(p => [p.slug, p]));
};

const isDev = process.env.NODE_ENV !== 'production';
const ensureFresh = () => { if (isDev) build(); };

build();

module.exports = {
	get pages() { ensureFresh(); return pages; },
	get navPages() { ensureFresh(); return pages.filter(p => !p.hidden); },
	getPage: slug => { ensureFresh(); return bySlug.get(slug); },
};
