/**
 * Creates Winston loggers to provide error and event tracking and notifications
 * Winston documentation can be found at https://github.com/winstonjs/winston
 *
 * This code is code that I wrote for a different professional project of mine
 * All code in this file is written solely by me, but from another project
 */

import winston from 'winston';

// Format for Winston loggers: "timestamp: [level] message"
const logFormat = winston.format.printf(({ level, timestamp, message }) => `${timestamp}: [${level}] ${message}`);

// Create base transports
const consoleLogs = new winston.transports.Console({ level: process.env.NODE_ENV === 'development' ? 'debug' : 'info' });
const errorLogs = new winston.transports.File({
	filename: 'errors.log',
	level: 'error',
});
const serverLogs = new winston.transports.File({
	filename: 'server.log',
	level: 'info',
});


const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		logFormat,
	),
	transports: [consoleLogs, errorLogs, serverLogs],
});

export default logger;
