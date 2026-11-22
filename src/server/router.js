// Node package imports
import { Router } from 'express';

// Project imports
import { requireSecure, requiresLogin, requiresLogout } from './middleware.js';

// Controller imports
import { login, loginPage, logout, signup } from './controllers/account.js';
import { homePage } from './controllers/app.js';


const router = new Router();

// Routes for managing session account
router.get('/login', requireSecure, requiresLogout, loginPage);
router.post('/login', requireSecure, requiresLogout, login);
router.post('/signup', requireSecure, requiresLogout, signup);
router.get('/logout', requiresLogin, logout);

// GET routes for the app
router.get('/home', requireSecure, requiresLogin, homePage);

// Redirects to home if logged in or login page if not
router.get('/', requireSecure, requiresLogout, loginPage);


export default router;
