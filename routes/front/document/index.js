/**
 * @name front document router
 */
const Router = require("koa-router");
const router = new Router();

module.exports = router.routes();

router.get(['/', '/index'], async (ctx, next) => {
    await ctx.render('homePage', {
        layout: null,
        title: '首页'
    })
});
router.get('/list', async (ctx, next) => {
    await ctx.render('list', {
        layout: null,
        title: '表单列表'
    })
});
router.get('/details', async (ctx, next) => {
    await ctx.render('details', {
        layout: null,
        title: '表单详情'
    })
});
