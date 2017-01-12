/*
 * @Author: Zubin
 * @Date: 2017-12-26 14:13:54
 * @Last Modified by: Zubin
 * @Last Modified time: 2017-01-06 15:12:04
 * @Description:
 */
import config from '../config';

export default {
  async index(ctx) {
    await ctx.render('index', {
      title: config.server.title
    });
  }
}
