const messages = document.getElementById('sw-messages')?.dataset ?? {};
const OFFLINE_TOAST_MS = 6000;
const ONLINE_TOAST_MS = 3800;

const STORAGE_KEY = 'offline-notified';

const wasNotified = () => {
	try {
		return sessionStorage.getItem(STORAGE_KEY) === '1';
	} catch {
		return false;
	}
};

const setNotified = value => {
	try {
		if (value) sessionStorage.setItem(STORAGE_KEY, '1');
		else sessionStorage.removeItem(STORAGE_KEY);
	} catch {
		// brak dostępu do sessionStorage, komunikat może się powtórzyć po przeładowaniu strony
	}
};

const getBox = () => {
	let box = document.querySelector('.toasts');
	if (!box) {
		box = document.createElement('div');
		box.className = 'toasts';
		document.body.append(box);
	}
	return box;
};

const toast = (message, kind, icon, duration) => {
	const el = document.createElement('div');
	el.className = `toast toast--${kind}`;
	el.setAttribute('role', 'status');
	el.innerHTML = `<svg class="toast__icon" aria-hidden="true"><use href="/icons.svg#${icon}"></use></svg><span></span>`;
	el.lastElementChild.textContent = message;
	getBox().append(el);

	requestAnimationFrame(() => el.classList.add('show'));

	const remove = () => {
		el.classList.remove('show');
		setTimeout(() => el.remove(), 300);
	};
	const timer = setTimeout(remove, duration);
	el.addEventListener('click', () => {
		clearTimeout(timer);
		remove();
	});
};

const update = () => {
	document.documentElement.toggleAttribute('data-offline', !navigator.onLine);

	if (!navigator.onLine) {
		if (wasNotified()) return;
		setNotified(true);
		if (messages.offline) toast(messages.offline, 'warn', 'icon-wifi-off', OFFLINE_TOAST_MS);
		return;
	}

	if (wasNotified()) {
		setNotified(false);
		if (messages.online) toast(messages.online, 'ok', 'icon-check', ONLINE_TOAST_MS);
	}
};

window.addEventListener('online', update);
window.addEventListener('offline', update);
update();
