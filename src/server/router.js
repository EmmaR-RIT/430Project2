// Node package imports
import { Router } from 'express';

// Project imports
import { requireSecure, requiresLogin, requiresLogout } from './middleware.js';

// Controller imports
import * as accountController from './controllers/account.js';
import * as appController from './controllers/app.js';


const router = new Router();

// Routes for managing session account
router.get('/login', requireSecure, requiresLogout, accountController.loginPage);
router.post('/login', requireSecure, requiresLogout, accountController.login);
router.post('/signup', requireSecure, requiresLogout, accountController.signup);
router.get('/logout', requiresLogin, accountController.logout);

// GET routes for the app
router.get('/home', requireSecure, requiresLogin, appController.homePage);
router.get('/games', requireSecure, requiresLogin, appController.gamesPage);
router.get('/submit', requireSecure, requiresLogin, appController.submitPage);
router.get('/forums', requireSecure, requiresLogin, appController.forumsPage);
router.get('/account', requireSecure, requiresLogin, appController.accountPage);

// Redirects to home if logged in or login page if not
router.get('/', requireSecure, requiresLogout, accountController.loginPage);


export default router;
