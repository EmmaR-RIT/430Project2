// Node package imports
import 'dotenv/config';
import { ExpressHandlebars } from 'express-handlebars';
import { RedisStore } from 'connect-redis';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import http from 'node:http';
import mongoose from 'mongoose';
import path from 'node:path';
import redis from 'redis';
import serveFavicon from 'serve-favicon';
import session from 'express-session';

// Project imports
import logger from './logger.js';
import router from './router.js';
import socketSetup from './io.js';


const publicPath = path.resolve(import.meta.dirname, '../../public');
const port = process.env.PORT || process.env.NODE_PORT;


// Set up MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI).catch((err) => {
	if (err) {
		logger.error('Failed to connect to database');
		logger.error(err);
		throw err;
	}
});


// Connect to Redis
const redisClient = redis.createClient({ url: process.env.REDISCLOUD_URL });
redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err}`));
redisClient.connect().then(() => {
	// Set up express
	const app = express();

	app.use(helmet);
	app.use(compression());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use(session({
		key: 'sessionid',
		store: new RedisStore({ client: redisClient }),
		secret: process.env.SESSION_KEY,
		resave: false,
		saveUninitialized: false,
	}));

	// Log all incoming requests when in dev mode
	if (process.env.NODE_ENV === 'development') {
		app.use((req, res, next) => {
			logger.debug(`${req.method} ${req.path}`);
			next();
		});
	}

	// Server static routes for static assets
	app.use(serveFavicon(path.resolve(publicPath, 'favicon.ico')));
	app.use('/img', express.static(path.resolve(publicPath, 'img')));
	app.use('/styles', express.static(path.resolve(publicPath, 'styles')));
	app.use('/scripts', express.static(path.resolve(publicPath, 'scripts')));

	app.engine('handlebars', ExpressHandlebars.engine({ defaultLayout: '' }));
	app.set('view engine', 'handlebars');
	app.set('views', path.resolve(import.meta.dirname, '../client/views'));

	app.use('/', router);


	// Set up the http server and socket
	const server = http.createServer(app);
	socketSetup(server);
	server.listen(port, (err) => {
		if (err) {
			logger.error('HTTP server failed to initialize');
			logger.error(err);
			throw err;
		}

		logger.debug(`Listening on port ${port}`);
	});
});
