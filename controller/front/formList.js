const path = require('path');
const Models = require(path.join(appRoot, '/models/index'));
const sequelize = Models.sequelize;
const Constant = require(path.join(appRoot, '/common/configs/constant'));

module.exports = {
    getFormList : async (ctx,next)=>{
        try{
            const body = JSON.parse(JSON.stringify(Constant.API_RESULT_MODEL));
            let searchObj = {
                attributes:['formId','formName','beginTime','endTime','formStatus'],
                raw:true
            };
            body.data.formList  = await Models.stuForm.findAll(searchObj);
            body.prompt = "操作成功";
            body.retCode = Constant.API_SUCCEED_CODE;
            ctx.body = body;
        }
        catch (e) {
            body.prompt = "服务器错误";
            body.error = e.message;
            body.retCode = Constant.API_SERVER_WRONG_CODE;
            ctx.body = body;
        }
    }
};