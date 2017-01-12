/*
 * @Author: Zubin
 * @Date: 2016-12-30 10:54:13
 * @Last Modified by: Zubin
 * @Last Modified time: 2017-01-06 15:06:46
 * @Description:
 */

import Koa from 'koa';
import config from './config';
import http from 'http';
import middlewares from './middlewares';

const app = new Koa();

// regist middlewares
middlewares.regist(app);

// create server
const server = http.createServer(app.callback());

server.listen(config.server.port);
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${config.server.port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${config.server.port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  console.log('Listening on port: %d', config.server.port);
});
export default server;
