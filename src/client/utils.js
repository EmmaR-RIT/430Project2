// Handles sending an async post request with callbacks
export const sendPost = (url, data, onerr, next) => {
	fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((result) => {
			if (result.redirect) window.location = result.redirect;
			if (result.error) onerr(result.error);
			if (next) next(result);
		});
};
