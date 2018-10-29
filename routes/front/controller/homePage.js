const Router = require("koa-router");
const router = new Router();
const homePage = require(global.appRoot + '/controller/front/index')['homePage'];
module.exports =  router.routes();

router.get('/getRollPic',homePage.getRollPic);


