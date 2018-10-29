const views = require('koa-views');
const path = require('path');
const frontRouter = require('./routes/front/index');   //TODO 前台路由index
const backRouter = require('./routes/back/index');     //TODO 后台路由index
const Router = require("koa-router");
const router = new Router();
const frontViews = views(path.join(__dirname,"/client/front/views"), { map: {html: 'handlebars' }});
const backViews = views(path.join(__dirname,"/client/back/views"), { map: {html: 'handlebars' }});


/**
 * 视图中间件
 */

router.use('/back',backViews);
router.use('/front',frontViews);


/**
 *
 */
router.use('/back',backRouter);
router.use('/front',frontRouter);

module.exports = router.routes();