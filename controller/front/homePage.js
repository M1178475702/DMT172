const path = require('path');
const Models = require(path.join(appRoot,'/models/index'));
const Constant = require(path.join(appRoot,'/common/configs/constant'));

module.exports = {
    getRollPic : async function (ctx,next) {
        const body = JSON.parse(JSON.stringify(Constant.API_RESULT_MODEL));

        body.prompt = '操作成功';
        body.retCode = Constant.API_SUCCEED_CODE;

        ctx.body = body;
    }
};