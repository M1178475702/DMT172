const Router = require("koa-router");
const router = new Router();
const documentRouter = require('./document/index');
const controlRouter = require('./controller/index');
const serverHelper = require(appRoot + '/common/helpers/serverHelper');
const loggerConfig = require(appRoot + '/common/configs/logger-config').backLoggerConfig;
const logger = require(appRoot + '/common/helpers/logger/index');
router.use(serverHelper.loginAuth);

router.use('/api',logger('common',loggerConfig),controlRouter);

router.use(documentRouter);   //匹配'/'，是真的匹配'/'，而不是匹配任意url  且无正则效果

module.exports = router.routes();