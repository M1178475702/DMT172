const Router = require("koa-router");
const router = new Router();
const documentRouter = require('./document/index');
const controlRouter = require('./controller/index');

router.use('/api',controlRouter);
router.use(documentRouter);   //匹配'/'，是真的匹配'/'，而不是匹配任意url  且无正则效果

module.exports = router.routes();