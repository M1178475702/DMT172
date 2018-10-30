const path = require('path');
const fs = require('fs');
const xl = require('xlsx');
const Models = require(path.join(appRoot, '/models/index'));
const Sequelize = Models.sequelize;
const Constant = require(path.join(appRoot, '/common/configs/constant'));
const {setStartJob,setEndJob} = require(appRoot + '/common/helpers/form/index');

module.exports={
    importForm : async (ctx,next)=>{
        const body = JSON.parse(JSON.stringify(Constant.API_RESULT_MODEL));
        try{
            let file = ctx.req.file;
            if(file){
                let {formName,beginTime,endTime} = ctx.request.body;
                let formPath = "forms/example/" + formName + ".xls";
                let formResultPath = "forms/result/" + formName + ".xls";
                const formObj = {
                    formName: formName,
                    formPath: formPath,
                    formResultPath: formResultPath,
                    beginTime: beginTime,
                    endTime: endTime,
                    formStatus: 1
                };
                const result = await Models.stuForm.create(formObj);

                    const formId = result.get('formId');
                    let now = new Date();
                    //进行任务设置（此次为初始化）
                    if (beginTime > now) {
                       setStartJob(formId, beginTime, now);
                    }
                    setEndJob(formId, endTime, now);
                    body.prompt = "上传成功";
                    body.retCode = Constant.API_SUCCEED_CODE;
                    ctx.body = body;
            }
            else{
                body.prompt = "文件解析错误";
                body.retCode = Constant.API_DATA_WRONG_CODE;
                ctx.body = body;
            }
        }
        catch (e) {
            body.prompt = "服务器";
            body.error = e.message;
            body.retCode = Constant.API_SERVER_WRONG_CODE;
            ctx.body = body;
        }
    }
};