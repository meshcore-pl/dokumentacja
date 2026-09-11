const { marked } = require('marked');

const DIACRITICS = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
const slugify = text => text.toLowerCase()
	.replace(/[ąćęłńóśźż]/g, c => DIACRITICS[c] || c)
	.replace(/[^\w\s-]/g, '')
	.replace(/[\s_]+/g, '-')
	.replace(/(^-|-$)/g, '');

const TOC_LABEL_RE = /\s*\{toc:\s*([^}]+)\}\s*$/;
const tocLabels = new WeakMap();

const headingIds = new WeakMap();
const assignHeadingIds = tokens => {
	const seen = new Map();
	for (const t of tokens) {
		if (t.type !== 'heading') continue;

		const tocMatch = TOC_LABEL_RE.exec(t.text);
		if (tocMatch) {
			tocLabels.set(t, tocMatch[1].trim());
			t.text = t.text.slice(0, tocMatch.index);
		}

		const base = slugify(t.text) || 'sekcja';
		const count = seen.get(base) || 0;
		seen.set(base, count + 1);
		headingIds.set(t, count === 0 ? base : `${base}-${count + 1}`);
	}
};
const getHeadingId = token => headingIds.get(token) || slugify(token.text);
const getTocLabel = token => tocLabels.get(token) || token.text;

const MD_LINK_RE = /^\.?\/?([\w-]+)\.md(#.*)?$/;
const OWN_ORIGIN_RE = /^https?:\/\/(www\.)?docs\.meshcorepolska\.org(\/|$)/i;
const DOFOLLOW_FAMILY_RE = /^https?:\/\/([a-z0-9-]+\.)*(meshcorepolska\.org|sefinek\.net|meshcoreprofiles\.com)(\/|$)/i;

// Buduje renderer marked, który potrafi zamienić wewnętrzne linki `./plik.md`
// na docelowe slugi stron tej dokumentacji (resolveSlug(stem) -> slug | undefined).
const createRenderer = resolveSlug => {
	const renderer = new marked.Renderer();

	renderer.heading = token => {
		const id = getHeadingId(token);
		return `<h${token.depth} id="${id}">${token.text}<a class="heading-anchor" href="#${id}" aria-label="Link do tej sekcji">#</a></h${token.depth}>\n`;
	};

	const baseLink = renderer.link.bind(renderer);
	renderer.link = token => {
		if (token.href.startsWith('#')) return baseLink({ ...token, href: `#${slugify(decodeURIComponent(token.href.slice(1)))}` });

		const match = MD_LINK_RE.exec(token.href);
		if (match) {
			const slug = resolveSlug(match[1]);
			if (slug !== undefined) {
				const anchor = match[2] ? `#${slugify(decodeURIComponent(match[2].slice(1)))}` : '';
				return baseLink({ ...token, href: `/${slug}${anchor}` });
			}
		}

		const html = baseLink(token);
		if (!(/^https?:\/\//i).test(token.href) || OWN_ORIGIN_RE.test(token.href)) return html;

		const rel = DOFOLLOW_FAMILY_RE.test(token.href) ? 'noopener dofollow' : 'noopener nofollow';
		return html.replace('>', ` target="_blank" rel="${rel}">`);
	};

	const baseTable = renderer.table.bind(renderer);
	renderer.table = token => `<div class="table-wrap">\n${baseTable(token)}</div>\n`;

	const baseCode = renderer.code.bind(renderer);
	renderer.code = token => `<div class="code-block"><button type="button" class="code-block__copy" aria-label="Kopiuj kod">Kopiuj</button>${baseCode(token)}</div>\n`;

	return renderer;
};

module.exports = { marked, slugify, assignHeadingIds, getHeadingId, getTocLabel, createRenderer };
