import { Router } from 'express';

import accountController from './controllers/account.js';
import mid from './middleware.js';


const router = new Router();


router.get('/login', mid.requireSecure, mid.requiresLogout, accountController.loginPage);
router.post('/login', mid.requireSecure, mid.requiresLogout, accountController.login);

router.post('/signup', mid.requireSecure, mid.requiresLogout, accountController.signup);

router.get('/logout', mid.requiresLogin, accountController.logout);

router.get('/', mid.requireSecure, mid.requiresLogout, accountController.loginPage);


export default router;
