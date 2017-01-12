/*
 * @Author: Zubin
 * @Date: 2016-12-30 11:13:46
 * @Last Modified by: Zubin
 * @Last Modified time: 2017-01-06 18:14:52
 * @Description: 系统配置
 */

import path from 'path';

export default {
  server: {
    title: 'koa demo',
    host: '127.0.0.1',
    port: parseInt(process.env.PORT || 10086, 10),
  },

  redisConfig: {
    port: 4399,
    host: '127.0.0.1',
    pass: 'test001',
    db: 3,
  },

  cookies: {
    secretKeyBase: '4k9FH1Bn9e2koykfoBRPGvH3ncieMFLtnqthJmRFDNZrGSWBBR8VxjHIMgrFTwLDDI67fdFbUml3GpxFqQN5HZ6dTVED5lWhbwX7VYwxl6bl8NcxSVpcTQ6NM2otJcgI',
    userCookieName: 'ze1jBzTB9pTLYUff',
    maxAge: 1000 * 60 * 60 * 12, // 12h
  },

  path: {
    public: path.join(__dirname, '../public'),
    views: path.join(__dirname, '../views'),
  },
};
