if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' })
		.then(registration => document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible') registration.update().catch(() => undefined);
		}))
		.catch(err => console.error('Service worker registration failed:', err));
}
