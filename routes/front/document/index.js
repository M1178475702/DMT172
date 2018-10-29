/**
 * @name front document router
 */
const Router = require("koa-router");
const router = new Router();

module.exports = router.routes();

router.get(['/','/index'],async (ctx,next)=> {
    await ctx.render('homePage',{
        layout:null,
        title:'首页'
    })
});
