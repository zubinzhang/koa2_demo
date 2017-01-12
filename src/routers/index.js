/*
 * @Author: Zubin
 * @Date: 2016-12-30 13:59:58
 * @Last Modified by: Zubin
 * @Last Modified time: 2017-01-06 15:14:08
 * @Description: router
 */

import Router from 'koa-router';
import indexCtl from '../controllers/indexCtl';
import userServer from '../services/user';

const router = Router();

router.get('/', indexCtl.index);
router.post('/user/hello', userServer.sayHello);

export default router;
