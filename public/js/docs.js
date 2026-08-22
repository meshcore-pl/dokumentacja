import { highlightCodeBlocks } from 'https://cdn.sefinek.net/js/codeBlocks.js';

const highlightCode = () => highlightCodeBlocks(document.getElementById('docs-content'));

const sidebar = document.getElementById('docs-sidebar');
const toggle = document.getElementById('sidebar-toggle');
const backdrop = document.getElementById('sidebar-backdrop');

const closeSidebar = () => {
	document.body.classList.remove('sidebar-open');
	toggle?.setAttribute('aria-expanded', 'false');
};

toggle?.addEventListener('click', () => {
	const isOpen = document.body.classList.toggle('sidebar-open');
	toggle.setAttribute('aria-expanded', String(isOpen));
	if (isOpen) resetSearch();
});
backdrop?.addEventListener('click', closeSidebar);
sidebar?.addEventListener('click', e => { if (e.target.closest('a')) closeSidebar(); });

document.addEventListener('click', async e => {
	const btn = e.target.closest('.code-block__copy');
	if (!btn) return;

	const code = btn.parentElement.querySelector('code');
	try {
		await navigator.clipboard.writeText(code.textContent);
		btn.textContent = 'Skopiowano!';
		btn.classList.add('is-copied');
		setTimeout(() => {
			btn.textContent = 'Kopiuj';
			btn.classList.remove('is-copied');
		}, 1600);
	} catch { /* clipboard niedostępny */ }
});

let tocObserver = null;
const initToc = () => {
	tocObserver?.disconnect();

	const tocLinks = [...document.querySelectorAll('.docs-toc__list a')];
	if (!tocLinks.length) return;

	const headings = tocLinks
		.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))))
		.filter(Boolean);

	const setActive = id => {
		tocLinks.forEach(link => link.classList.toggle('active', link.hash === `#${id}`));
	};

	tocObserver = new IntersectionObserver(entries => {
		const visible = entries.filter(e => e.isIntersecting);
		if (visible.length) setActive(visible[0].target.id);
	}, { rootMargin: '-80px 0px -70% 0px' });

	headings.forEach(h => tocObserver.observe(h));
};

const searchWrap = document.getElementById('topbar__search');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('topbar__search-results');
const searchStatus = document.getElementById('topbar__search-status');
const searchToggle = document.getElementById('topbar__search-toggle');

const closeSearchResults = () => {
	if (!searchResults) return;
	searchResults.hidden = true;
	searchInput?.setAttribute('aria-expanded', 'false');
	searchInput?.removeAttribute('aria-activedescendant');
};

const resetSearch = () => {
	if (!searchInput) return;
	searchInput.value = '';
	searchWrap?.classList.remove('has-value', 'is-open');
	searchToggle?.setAttribute('aria-expanded', 'false');
	searchResults?.replaceChildren();
	closeSearchResults();
	if (searchStatus) searchStatus.textContent = '';
};

searchToggle?.addEventListener('click', () => {
	const isOpen = searchWrap?.classList.toggle('is-open');
	searchToggle.setAttribute('aria-expanded', String(!!isOpen));
	if (isOpen) {
		closeSidebar();
		searchInput?.focus();
	} else {
		resetSearch();
	}
});

if (searchWrap && searchInput && searchResults) {
	const MAX_RESULTS = 8;
	let searchIndex = null;
	let indexPromise = null;
	let activeIndex = -1;

	const loadIndex = () => {
		if (!indexPromise) {
			indexPromise = fetch('/api/search')
				.then(res => (res.ok ? res.json() : []))
				.catch(() => []);
		}
		return indexPromise;
	};

	const runSearch = query => {
		const q = query.trim().toLowerCase();
		if (!q || !searchIndex) return [];

		const results = [];
		for (const page of searchIndex) {
			if (results.length >= MAX_RESULTS) break;

			if (page.title.toLowerCase().includes(q)) results.push({ url: page.url, title: page.title, heading: null });

			for (const heading of page.headings) {
				if (results.length >= MAX_RESULTS) break;
				if (heading.text.toLowerCase().includes(q)) results.push({ url: `${page.url}#${heading.id}`, title: page.title, heading: heading.text });
			}
		}

		return results.slice(0, MAX_RESULTS);
	};

	const setActive = i => {
		const els = [...searchResults.querySelectorAll('.topbar__search-result')];
		if (!els.length) {
			activeIndex = -1;
			searchInput.removeAttribute('aria-activedescendant');
			return;
		}
		activeIndex = (i + els.length) % els.length;
		els.forEach((el, idx) => el.classList.toggle('topbar__search-result--active', idx === activeIndex));
		els[activeIndex].scrollIntoView({ block: 'nearest' });
		searchInput.setAttribute('aria-activedescendant', els[activeIndex].id);
	};

	searchInput.addEventListener('focus', () => {
		loadIndex().then(data => { searchIndex = data; });
	});

	searchInput.addEventListener('input', () => {
		searchResults.replaceChildren();
		activeIndex = -1;

		const query = searchInput.value.trim();
		searchWrap.classList.toggle('has-value', query.length > 0);
		if (!query) {
			closeSearchResults();
			if (searchStatus) searchStatus.textContent = '';
			return;
		}

		const items = runSearch(query);
		if (!items.length) {
			const empty = document.createElement('p');
			empty.id = 'topbar__search__empty';
			empty.textContent = 'Brak wyników.';
			searchResults.append(empty);
			searchResults.hidden = false;
			searchInput.setAttribute('aria-expanded', 'true');
			if (searchStatus) searchStatus.textContent = 'Brak wyników.';
			return;
		}

		items.forEach((item, i) => {
			const a = document.createElement('a');
			a.href = item.url;
			a.id = `topbar__search-result-${i}`;
			a.className = 'topbar__search-result';
			a.setAttribute('role', 'option');

			const title = document.createElement('span');
			title.className = 'topbar__search-result-title';
			title.textContent = item.heading || item.title;
			a.append(title);

			if (item.heading) {
				const meta = document.createElement('span');
				meta.className = 'topbar__search-result-meta';
				meta.textContent = item.title;
				a.append(meta);
			}

			searchResults.append(a);
		});
		searchResults.hidden = false;
		searchInput.setAttribute('aria-expanded', 'true');
		if (searchStatus) searchStatus.textContent = `Znaleziono wyników: ${items.length}.`;
		setActive(0);
	});

	searchInput.addEventListener('keydown', e => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!searchResults.hidden) setActive(activeIndex + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!searchResults.hidden) setActive(activeIndex - 1);
		} else if (e.key === 'Escape') {
			resetSearch();
			searchInput.blur();
		} else if (e.key === 'Enter') {
			const els = [...searchResults.querySelectorAll('.topbar__search-result')];
			const target = els[activeIndex] || els[0];
			if (target) {
				e.preventDefault();
				target.click();
			}
		}
	});

	searchWrap.addEventListener('focusout', e => {
		if (!searchWrap.contains(e.relatedTarget)) closeSearchResults();
	});

	document.addEventListener('click', e => {
		if (!e.target.closest('#topbar__search')) closeSearchResults();
	});
}

document.addEventListener('keydown', e => {
	if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
	const target = e.target;
	if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName))) return;
	e.preventDefault();
	searchInput?.focus();
});

const pageCache = new Map();

const fetchPage = async path => {
	if (pageCache.has(path)) return pageCache.get(path);

	const res = await fetch(path, { headers: { 'X-Docs-Ajax': '1' } });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);

	const data = await res.json();
	pageCache.set(path, data);
	return data;
};

const setMetaTag = (selector, attr, value) => {
	const el = document.querySelector(selector);
	if (el) el.setAttribute(attr, value);
};

const applyMeta = (data, path) => {
	const title = `${data.title} | MeshCore Docs`;
	const description = data.description || `${data.title} - dokumentacja MeshCore.`;
	const canonicalUrl = location.origin + path;

	document.title = title;
	setMetaTag('meta[name="description"]', 'content', description);
	setMetaTag('meta[property="og:title"]', 'content', title);
	setMetaTag('meta[property="og:description"]', 'content', description);
	setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
	setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
};

const setActiveNav = slug => {
	const href = slug ? `/${slug}` : '/';
	document.querySelectorAll('#docs-nav a').forEach(a => {
		const isActive = a.getAttribute('href') === href;
		a.classList.toggle('active', isActive);
		if (isActive) a.setAttribute('aria-current', 'page');
		else a.removeAttribute('aria-current');
	});
};

const buildPaginationLink = (item, dir) => {
	const a = document.createElement('a');
	a.href = item.slug ? `/${item.slug}` : '/';
	a.className = `docs-pagination__link docs-pagination__link--${dir}`;

	const span = document.createElement('span');
	span.textContent = dir === 'prev' ? '← Poprzednia' : 'Następna →';
	const strong = document.createElement('strong');
	strong.textContent = item.title;

	a.append(span, strong);
	return a;
};

const setPagination = (prev, next) => {
	const nav = document.getElementById('docs-pagination');
	if (!nav) return;
	nav.replaceChildren(
		prev ? buildPaginationLink(prev, 'prev') : document.createElement('span'),
		next ? buildPaginationLink(next, 'next') : document.createElement('span')
	);
};

const setDocsMeta = updatedAt => {
	const footer = document.getElementById('docs-footer');
	let meta = document.getElementById('docs-meta');

	if (!updatedAt) {
		meta?.remove();
		return;
	}

	if (!meta) {
		meta = document.createElement('p');
		meta.id = 'docs-meta';
		footer?.append(meta);
	}
	meta.textContent = `Ostatnia aktualizacja: ${updatedAt}`;
};

const buildTocItem = item => {
	const a = document.createElement('a');
	a.href = `#${item.id}`;
	if (item.level === 1) a.className = 'docs-toc__link--h1';
	else if (item.level === 3) a.className = 'docs-toc__link--h3';
	a.textContent = item.text;

	const li = document.createElement('li');
	li.append(a);
	return li;
};

const buildTocTitle = () => {
	const title = document.createElement('p');
	title.className = 'docs-toc__title';
	title.textContent = 'Na tej stronie';
	return title;
};

const setToc = toc => {
	const layout = document.getElementById('docs-layout');
	layout?.classList.toggle('docs-layout--no-toc', toc.length <= 1);

	if (toc.length <= 1) {
		document.getElementById('docs-toc')?.remove();
		document.getElementById('docs-sidebar__toc')?.remove();
		return;
	}

	let desktopToc = document.getElementById('docs-toc');
	if (!desktopToc) {
		desktopToc = document.createElement('nav');
		desktopToc.id = 'docs-toc';
		desktopToc.setAttribute('aria-label', 'Na tej stronie');

		const inner = document.createElement('div');
		inner.id = 'docs-toc__inner';
		const list = document.createElement('ul');
		list.className = 'docs-toc__list';
		inner.append(buildTocTitle(), list);
		desktopToc.append(inner);
		layout?.append(desktopToc);
	}
	desktopToc.querySelector('.docs-toc__list').replaceChildren(...toc.map(buildTocItem));

	let sidebarToc = document.getElementById('docs-sidebar__toc');
	if (!sidebarToc) {
		sidebarToc = document.createElement('div');
		sidebarToc.id = 'docs-sidebar__toc';
		const list = document.createElement('ul');
		list.className = 'docs-toc__list';
		sidebarToc.append(buildTocTitle(), list);
		document.getElementById('docs-nav')?.after(sidebarToc);
	}
	sidebarToc.querySelector('.docs-toc__list').replaceChildren(...toc.map(buildTocItem));
};

const applyScroll = hash => {
	if (hash) {
		const el = document.getElementById(decodeURIComponent(hash.slice(1)));
		if (el) {
			el.scrollIntoView();
			return;
		}
	}
	document.getElementById('docs-content')?.scrollTo({ top: 0 });
	window.scrollTo({ top: 0 });
};

const applyPage = (data, path, hash) => {
	document.querySelector('#docs-content .prose').innerHTML = data.html;
	applyMeta(data, path);
	setActiveNav(data.slug);
	setPagination(data.prev, data.next);
	setDocsMeta(data.updatedAt);
	closeSidebar();
	resetSearch();

	try {
		setToc(data.toc);
		initToc();
		highlightCode();
	} catch (err) {
		console.error('Nie udało się przetworzyć spisu treści/podświetlenia kodu:', err);
	}

	applyScroll(hash);
	document.getElementById('docs-content')?.focus({ preventScroll: true });
};

const navigate = async (url, push) => {
	const hashIndex = url.indexOf('#');
	const path = hashIndex === -1 ? url : url.slice(0, hashIndex);
	const hash = hashIndex === -1 ? '' : url.slice(hashIndex);

	try {
		const data = await fetchPage(path);
		applyPage(data, path, hash);
		if (push) history.pushState(null, '', url);
	} catch {
		location.href = url;
	}
};

const isNavigableLink = a => {
	if (!a || a.target || a.hasAttribute('download') || a.origin !== location.origin) return false;
	if ((/^\/(api|css|js|logo)\//).test(a.pathname) || a.pathname === '/favicon.ico' || a.pathname === '/manifest.json') return false;
	return true;
};

document.addEventListener('click', e => {
	if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

	const a = e.target.closest('a');
	if (!isNavigableLink(a)) return;

	const samePath = a.pathname === location.pathname;
	if (samePath && a.hash) return;
	if (samePath) {
		e.preventDefault();
		return;
	}

	e.preventDefault();
	navigate(a.pathname + a.hash, true);
});

window.addEventListener('popstate', () => {
	navigate(location.pathname + location.hash, false);
});

initToc();
highlightCode();
