const Router = require("koa-router");
const router = new Router();
const auth = require(global.appRoot + '/controller/front/index')['auth'];
module.exports =  router.routes();

router.post('/login',auth.login);