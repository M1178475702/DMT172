/**
 * @name back controller router
 */
const path= require('path');
const Router = require("koa-router");
const router = new Router();
const serverHelper = require(path.join(global.appRoot , '/common/helpers/serverHelper'));

const basename = path.basename(module.filename);
const backControlRouter  = {};
module.exports = router.routes();

serverHelper.assemble(backControlRouter,__dirname,basename,function (backControlRouter) {

});