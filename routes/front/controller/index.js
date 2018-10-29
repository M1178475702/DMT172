/**
 * @name front controller router
 */
const Router = require("koa-router");
const router = new Router();
const path= require('path');
const serverHelper = require(global.appRoot + '/common/helpers/serverHelper');
const basename = path.basename(module.filename);

module.exports = router.routes();

serverHelper.assemble({},__dirname,basename,(frontControlRouter)=> {
    router.use('/homePage',frontControlRouter['homePage']);

    router.use('/auth',frontControlRouter['auth']);
});
