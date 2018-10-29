global.appRoot = __dirname;
global.port = '5555';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const serverHelper = require('./common/helpers/serverHelper');
const logger = require('./common/helpers/logger/index');
const staticServer = require('./common/helpers/staticServer/index');
const router = require('./router');
const session = require('koa-session');
const sessionConfig = require('./common/configs/sessionConfig');

const app = new Koa();

app.keys = ['dmt2017'];
app.use(session(sessionConfig,app));


//控制台日志中间件
app.use(logger('dev'));

//eTag中间件
app.use(conditional());
app.use(etag());

//请求体处理中间件
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('body parse error', 422);
    }
}));

//抛出错误处理中间件
app.use(serverHelper.errorHandler);

//静态文件处理中间件
app.use(staticServer());

//路由
app.use(router);

module.exports = app;