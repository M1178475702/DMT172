const Router = require("koa-router");
const router = new Router();
const documentRouter = require('./document/index');
const controllerRouter = require('./controller/index');
const loggerConfig = require(appRoot + '/common/configs/logger-config');
const logger = require(appRoot + '/common/helpers/logger/index');

router.use('/api',logger('common',loggerConfig),controllerRouter);
router.use('/',documentRouter);

module.exports = router.routes();