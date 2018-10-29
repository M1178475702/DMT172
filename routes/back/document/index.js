/**
 * @name back document router
 */
const Router = require("koa-router");
const router = new Router();
module.exports = router.routes();

router.get('/',function (req,res) {
    res.render('back/index',{
        layout:null,
        title:'管理员首页'
    })
});