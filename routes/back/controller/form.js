const multer = require('koa-multer');
const Router = require("koa-router");
const router = new Router();
const form = require(global.appRoot + '/controller/back/index')['form'];
const storage = require(appRoot+'/common/configs/multer-config.js');

module.exports =  router.routes();

const upload = multer({storage:storage}).single('excelForm');
router.use('/importForm',upload,form.importForm);
