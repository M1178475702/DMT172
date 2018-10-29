const path = require('path');
const fs = require('fs');
const xl = require('xlsx');
const Models = require(path.join(appRoot, '/models/index'));
const Sequelize = Models.sequelize;
const Constant = require(path.join(appRoot, '/common/configs/constant'));

const StudentNumber = 37;

module.exports = {
    getFormList : async (ctx,next)=>{
        try{
            const body = JSON.parse(JSON.stringify(Constant.API_RESULT_MODEL));

            let searchObj = {
                attributes:['formId','formName',[Sequelize.fn("DATE_FORMAT", Sequelize.col('begin_time'), '%Y/%c/%d %H:%i:%s'), 'beginTime'],
                    [Sequelize.fn("DATE_FORMAT", Sequelize.col('end_time'), '%Y/%c/%d %H:%i:%s'), 'endTime'],'formStatus'],
                raw:true,
                order:[['beginTime','DESC']]
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
    },

    getUserForm: async (ctx, next) => {
        try {
            const body = JSON.parse(JSON.stringify(Constant.API_RESULT_MODEL));
            let {formId} = ctx.request.query;
            let searchObj = {
                where: {
                    formId:formId
                },
                attributes:['formPath'],
                raw: true
            };
            let tempObj = await Models.stuForm.findOne(searchObj);
            let formPath = path.join(appRoot,tempObj.formPath);
            let workbook = xl.readFile(formPath);
            let sheetNames = workbook.SheetNames;
            let worksheet = workbook.Sheets[sheetNames[0]];
            const transcriptData = xl.utils.sheet_to_json(worksheet);
            let columnList = Object.keys(transcriptData[0]);
            if(columnList.length){
                body.columnList = columnList;
                body.prompt = "操作成功";
                body.retCode = Constant.API_SUCCEED_CODE;
                ctx.body = body;
            }
            else{
                body.prompt = "表单解析错误";
                body.retCode = Constant.API_SUCCEED_CODE;
                ctx.body = body;
            }
        }
        catch (e) {
            console.error(e)
            body.prompt = "服务器错误";
            body.error  = e.message;
            body.retCode = Constant.API_SERVER_WRONG_CODE;
            ctx.body = body;
        }
    }
};




