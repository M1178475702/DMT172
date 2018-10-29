const Router = require("koa-router");
const router = new Router();
const form = require(global.appRoot + '/controller/front/index')['form'];
module.exports =  router.routes();

router.get('/getFormList',form.getFormList);

router.get('/getUserForm',form.getUserForm);