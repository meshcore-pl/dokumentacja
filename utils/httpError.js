const MESSAGES = {
	404: 'Nie znaleziono strony. Wróć na stronę główną.',
	429: 'Zbyt wiele żądań. Spróbuj ponownie za chwilę.',
	500: 'Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie za chwilę.',
	503: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie za chwilę.',
};

module.exports = (res, status, err) => {
	if (err) console.error(err);

	res.status(status).render('error.ejs', {
		status,
		message: MESSAGES[status] || 'Wystąpił błąd.',
	});
};
