const multer = require('koa-multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (ctx, file, cb) {
        const saveUrl = '/upload/www/1';
        const tempUrl = path.join(global.appRoot, saveUrl);
        cb(null, tempUrl);
    },
    filename: function (ctx, file, cb) {
        cb(null, file.originalname);
    }
});
module.exports = storage;