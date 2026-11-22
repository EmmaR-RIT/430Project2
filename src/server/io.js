import { Server } from 'socket.io';

import logger from './logger.js';


let ioServer;


const socketSetup = (httpServer) => {
	ioServer = new Server(httpServer);

	ioServer.on('connection', (socket) => { logger.debug(`User ${socket.id} connected`); });
};

export default socketSetup;
