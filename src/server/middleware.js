export const requiresLogin = (req, res, next) => {
	if (!req.session.account) return res.redirect('/');
	return next();
};


export const requiresLogout = (req, res, next) => {
	if (req.session.account) return res.redirect('/home');
	return next();
};


export const requireSecure = (req, res, next) => {
	// Bypass security in dev mode
	if (process.env.NODE_ENV === 'development') return next();

	// If on HTTP, redirect to HTTPS
	if (req.headers['x-forwarded-proto'] !== 'https') return res.redirect(`https://${req.hostname}${req.url}`);

	// Do nothing if on HTTPS in prod
	return next();
};
