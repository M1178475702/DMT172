const koaStatic = require('koa-static');
const path = require('path');

//定制静态文件服务中间件
module.exports = staticServer = () => {
    const fStaticServe = koaStatic(path.join(global.appRoot, '/client/front/assets'));
    const bStaticServe = koaStatic(path.join(global.appRoot, '/client/back/assets'));
    const pStaticServe = koaStatic(path.join(global.appRoot, '/client/public'));

    return async (ctx, next) => {
        const fbReg = /^\/(front|back)(\/(?:js|css|img).+)/;
        const pubReg = /^\/(public)(.+)/;
        if (!fbReg.test(ctx.path) && !pubReg.test(ctx.path))
            return next();
        let strArr = fbReg.test(ctx.path) ? fbReg.exec(ctx.path) : pubReg.exec(ctx.path);
        ctx.path = strArr[2];
        if (strArr[1] === 'front')
            await fStaticServe(ctx, next);
        else if (strArr[1] === 'back')
            await bStaticServe(ctx, next);
        else if (strArr[1] === 'public')
            await pStaticServe(ctx, next);
    }
};