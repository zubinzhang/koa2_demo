/*
 * @Author: Zubin
 * @Date: 2016-12-30 11:18:47
 * @Last Modified by: Zubin
 * @Last Modified time: 2017-01-06 15:09:42
 * @Description: regist middlewares
 */

import Debug from 'debug';
import bodyparser from 'koa-bodyparser';
import config from '../config';
import convert from 'koa-convert';
import json from 'koa-json';
import koaStatic from 'koa-static';
import logger from 'koa-logger';
import path from 'path';
import redisStore from 'koa-redis';
import router from '../routers';
import session from 'koa-session-minimal';
import views from 'koa-views';

const log = new Debug('zubin:server.middlewares');

export default {
  regist(app) {
    app.use(convert(bodyparser()));
    app.use(convert(json()));
    app.use(convert(logger()));

    app.use(convert(koaStatic(config.path.public)));
    console.log(config.path.views);
    app.use(views(config.path.views, {
      extension: 'ejs',
    }));

    app.keys = [config.secretKeyBase];
    app.use(session({
      key: config.cookies.userCookieName,
      store: redisStore(config.redisConfig),
      cookie: {
        maxAge: config.cookies.maxAge,
      }
    }));

    // response router
    app.use(router.routes(), router.allowedMethods());

    // 404
    app.use(async (ctx) => {
      ctx.status = 404;
      await ctx.render('404');
    });

    // error logger
    app.on('error', async (err, ctx) => {
      ctx.status = 500;
      await ctx.render('500')
      log(`error：${err}`);
    });

  }
}
